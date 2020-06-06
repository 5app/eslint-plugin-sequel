const isSqlQuery = require('../utils/sqlParser.js');
const isTagged = require('../utils/isTagged.js');

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

		let indentType = 'space';
		let indentSize = 4;

		if (typeof option === 'number') {
			indentSize = option;
		}

		let replaceFunction;

		if (option === 'tab') {
			// We only want tabs
			indentType = 'tab';

			// Replace space before tabs
			replaceFunction = (m) =>
				m.replace(/( {4})|( {1,3}\t)|( {1,3})/g, '\t');
		} else {
			// Regexp
			const spaceReg = new RegExp(`( {0,${indentSize - 1}})\t`, 'g');

			// Replace tabs with spaces
			replaceFunction = (m) =>
				m.replace(spaceReg, ' '.repeat(indentSize));
		}

		/**
		 * Replace Indent
		 * @param {object} offset - Offset from which everything should start
		 * @returns {Function} Replace function
		 */
		function replaceIndent(offset) {
			const offsetType = offset[0] === '\t' ? 'tab' : 'space';

			const indent = offsetType === 'tab' ? '\t' : ' '.repeat(indentSize);

			const indentOffset = offset + indent;

			return (whitespace) => {
				// Formatted whitespace prefix
				const prefix = replaceFunction(whitespace);

				// For a matching indent type, where the offset default is greater
				if (
					offsetType === indentType &&
					prefix.length < indentOffset.length
				) {
					// Use the larger offset indent
					return indentOffset;
				}
				return prefix;
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

			return offset;
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
			const literal = node.quasis
				.map((quasi) => quasi.value.raw)
				.join('x');

			// Is this something other than a SQL expression?
			if (!tagged && !isSqlQuery(literal)) {
				return;
			}

			// Get the initial indent offset
			const offset = getOffset(node);

			// Loop through each of the TemplateElements
			node.quasis.forEach((node, index) => {
				const text = node.value.raw;

				if (!text || node.type !== 'TemplateElement') {
					return;
				}

				// Catch any inconsistant indentations
				const replaced = text
					.split('\n')
					.map((line, lineIndex) =>
						lineIndex
							? line.replace(/^\s*/, replaceIndent(offset))
							: line
					)
					.join('\n');

				if (text !== replaced) {
					const proposed =
						(index ? '}' : '`') +
						replaced +
						(node.tail ? '`' : '${');

					const fix = (fixer) => fixer.replaceText(node, proposed);

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
