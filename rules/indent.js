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
						lineIndex ? line.replace(/^\s+/, replaceFunction) : line
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
