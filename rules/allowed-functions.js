const createSQLTemplateElementHandler = require('../utils/createSQLTemplateElementHandler');
const getLocation = require('../utils/getLocation.js');

/**
 * Template Element Handler for Function Names allowed and disallowed
 * @param {object} node - Element Node
 * @param {object} context - Eslint Context object
 * @returns {object|undefined} Returns a format object or undefined
 */
function templateElementHandler(node, context) {
	const text = node.value.raw;

	const {disallowed} = context.options.at(0);

	// Special words?
	const regexp = new RegExp(
		`\\b(?<funcName>${disallowed.join('|')})\\(`,
		'gi'
	);

	const test = text.matchAll(regexp);

	const incidents = [];

	for (const match of test) {
		const {funcName} = match.groups;

		const report = {
			messageId: 'isDisallowed',
			data: {
				funcName,
			},
			...getLocation(node, match.index, funcName),
		};

		incidents.push(report);
	}

	return incidents;
}

/**
 * Export `function-case`.
 *
 * @param {object} context - Eslint Context object
 * @returns {object} Object rule
 */
module.exports = {
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Enforce allowed and disallowed functions',
			category: 'Stylistic Issues',
		},
		messages: {
			isDisallowed: 'Function is disallowed "{{funcName}}"',
		},
		schema: {
			minItems: 1,
			maxItems: 1,
			items: [
				{
					type: 'object',
					properties: {
						disallowed: {
							type: 'array',
							items: {type: 'string'},
							minItems: 1,
						},
					},
					additionalProperties: false,
				},
			],
		},
	},
	create: createSQLTemplateElementHandler({templateElementHandler}),
};
