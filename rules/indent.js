const isSqlQuery = require('../utils/sqlParser.js');
const isTagged = require('../utils/isTagged.js');

const SPACE = ' ';
const TAB = '\t';

/**
 * Indent
 * Set the indentation used in SQL
 */
module.exports = {
	meta: {
		type: 'layout',
		docs: {
			description: 'enforce consistant indentation',
			category: 'Stylistic Issues',
		},
		fixable: 'whitespace',
		schema: [
			{
				oneOf: [
					{
						enum: ['tab'],
					},
					{
						type: 'integer',
						minimum: 0,
					},
				],
			},
		],
		messages: {
			wrongIndentation:
				'Expected indentation of {{expected}} but found {{actual}}.',
		},
	},

	/**
	 * Create `indent` rule
	 *
	 * @param {object} context - Eslint Context object
	 * @returns {object} Object rule
	 */
	create(context) {
		// Get the maximum option...
		const [option] = context.options;

		const indentType = option === 'tab' ? 'tab' : 'space';
		const indentSize = typeof option === 'number' ? option : 4;

		// Set the indent, 1 tab or n spaces
		const indent = indentType === 'tab' ? TAB : SPACE.repeat(indentSize);

		const indentChar = indentType === 'tab' ? TAB : SPACE;

		let normalizeWhitespace;

		if (option === 'tab') {
			// Replace space before tabs
			normalizeWhitespace = m =>
				m.replace(/( {4})|( {1,3}\t)|( {1,3})/g, TAB);
		} else {
			// Regexp
			const spaceReg = new RegExp(
				`( {${indentSize}})|( {0,${indentSize - 1}})\t|( {1,3})`,
				'g'
			);
			// Replace tabs with spaces
			normalizeWhitespace = m => m.replace(spaceReg, indent);
		}

		/**
		 * Replace Indent
		 * @param {object} offset - Offset from which everything should start
		 * @param {object} originalOffset - Offset of the first non-whitespace entry from which everything should start
		 * @returns {Function} Replace function
		 */
		function replaceIndent(offset, originalOffset) {
			// Base indent, nothing can be less than this
			const indentOffset = offset + indent;

			return whitespace => {
				// Formatted whitespace prefix
				const prefix = normalizeWhitespace(whitespace);

				// What's the difference between the original offset
				const diffLength = prefix.length - originalOffset.length;

				if (diffLength > 0) {
					return indentOffset + indentChar.repeat(diffLength);
				}

				return indentOffset;
			};
		}

		/**
		 * Offset/Indent of a node
		 * @param {object} node - AST Node
		 * @returns {object} offset
		 */
		function getOffset(node) {
			/**
			 * Nodes start on a line. A SQL template literal will usually be preceeded by a variable declaration.
			 * e.g const sql = `SELECT ...`;
			 * Or perhaps passed as definition to a function param
			 * e.g. 'run(`SELECT ...`)'
			 * In any case get the offset of the start of the line, whereever that maybe...
			 */
			const line = context.getSourceCode().lines[node.loc.start.line - 1];

			// Get all the whitespace characters at the start
			const [offset] = line.match(/^\s*/);

			return normalizeWhitespace(offset);
		}

		/**
		 * Get original offset
		 * @param {object} node - AST Node
		 * @returns {string} Original Offset string
		 */
		function getOriginalOffset(node) {
			// Find the originalOffset, the lowest non-empty indent
			const originalOffsetLength = node.quasis.reduce(
				(originalOffsetLength, node) => {
					const text = node.value.raw;

					if (!text || node.type !== 'TemplateElement') {
						return originalOffsetLength;
					}

					return text.split('\n').reduce(
						// eslint-disable-next-line max-params
						(originalOffsetLength, line, lineIndex, arr) => {
							if (
								lineIndex === 0 ||
								((arr.length - 1 !== lineIndex || node.tail) &&
									/^\s*$/.test(line))
							) {
								return originalOffsetLength;
							}
							const lineIndent = line.match(/^\s*/)[0];
							const lineOffsetLength =
								normalizeWhitespace(lineIndent).length;

							if (originalOffsetLength === null) {
								return lineOffsetLength;
							}
							return Math.min(
								lineOffsetLength,
								originalOffsetLength
							);
						},
						originalOffsetLength
					);
				},
				null
			);

			return originalOffsetLength
				? indentChar.repeat(originalOffsetLength)
				: '';
		}

		/**
		 * Validate node.
		 * @param {object} node - Node
		 * @returns {void}
		 */
		function validate(node) {
			const {parent} = node;

			// Tagged with a 'SQL' like name?
			const tagged = isTagged(parent);

			// Join up the parts...
			const literal = node.quasis.map(quasi => quasi.value.raw).join('x');

			// Is this something other than a SQL expression?
			if (!tagged && !isSqlQuery(literal)) {
				return;
			}

			// Get the initial indent offset
			const offset = getOffset(node);
			const originalOffset = getOriginalOffset(node);

			const indentReplacer = replaceIndent(offset, originalOffset);

			// Loop through each of the TemplateElements
			node.quasis.forEach((node, index) => {
				const text = node.value.raw;

				if (!text || node.type !== 'TemplateElement') {
					return;
				}

				// Catch any inconsistant indentations
				const replaced = text
					.split('\n')
					.map((line, lineIndex, arr) => {
						if (/^\s*$/.test(line)) {
							if (node.tail && arr.length - 1 === lineIndex) {
								return offset;
							} else if (lineIndex < arr.length - 1) {
								return '';
							}
						}
						if (lineIndex === 0) {
							return line;
						} else {
							return line.replace(/^\s*/, indentReplacer);
						}
					})
					.join('\n');

				if (text !== replaced) {
					const proposed =
						(index ? '}' : '`') +
						replaced +
						(node.tail ? '`' : '${');

					const fix = fixer => fixer.replaceText(node, proposed);

					context.report({
						node,
						messageId: 'wrongIndentation',
						data: {
							expected: indentType,
							actual: 'mixed tabs and spaces',
						},
						fix,
					});
				}
			});
		}

		return {
			TemplateLiteral: validate,
		};
	},
};
