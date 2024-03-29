const createSQLTemplateElementHandler = require('../utils/createSQLTemplateElementHandler');

/**
 * Template Element Handler for no-shorthand-all
 * @param {object} node - Element Node
 * @param {object} context - Context
 * @param {object} context.options - Options
 * @returns {object|undefined} Returns a format object or undefined
 */
function templateElementHandler(node, {options}) {
	// Raw value
	const text = node.value.raw;

	// Options
	const {allowCountAll, allowQualified} = options && (options[0] || {});

	// Special words?
	const regexp =
		/(?<quote>['"]).+?\1|(?<comment>\/\*.+?\*\/)|(?<count>COUNT\((DISTINCT\s)?\s*(\w+\.)?\*\s*\))|(?<qualified>\w+\.)?\*(?=\s*(\)|,|FROM))/gi;

	// Propose the case of the function names
	let match;

	while ((match = regexp.exec(text)) !== null) {
		const [str] = match;

		// Get groups...
		const {count, qualified} = match.groups;

		if (
			str === '*' ||
			(count && !allowCountAll) ||
			(qualified && !allowQualified)
		) {
			return {
				messageId: 'noShorthandAll',
			};
		}
	}
}

/**
 * Export `no-shorthand-all`.
 *
 * @param {object} context - Eslint Context object
 * @returns {object} Object rule
 */
module.exports = {
	meta: {
		type: 'suggestion',
		docs: {
			description: 'No shorthand (*) all character',
		},
		schema: [
			{
				type: 'object',
				properties: {
					allowCountAll: {
						type: 'boolean',
						default: false,
					},
					allowQualified: {
						type: 'boolean',
						default: false,
					},
				},
				additionalProperties: false,
			},
		],
		messages: {
			noShorthandAll: 'No shorthand (*) all character',
		},
	},
	create: createSQLTemplateElementHandler({templateElementHandler}),
};
