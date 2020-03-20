const createSQLTemplateElementHandler = require('../utils/createSQLTemplateElementHandler');

/**
 * Template Element Handler for Function Case
 * @param {object} node - Element Node
 * @returns {object} Format object or undefined
 */
function templateElementHandler(node) {
	const text = node.value.raw;

	// Special words?
	const regexp = /((?<quote>['"]).+?\2|([\t\s]+))/gi;

	const fix = text.replace(regexp, (m, ...params) => {
		// Get the named capture groups last paramater
		const {quote} = params.pop();

		if (quote || m === ' ' || m.startsWith('\n')) {
			return m;
		}

		// Single white space
		return ' ';
	});

	if (fix !== text) {
		// Wrap between expressions

		return {
			message: 'Multiple spaces',
			fix,
		};
	}
}

/**
 * Export `function-case`.
 *
 * @param {object} context - Eslint Context object
 * @returns {object} Object rule
 */
module.exports = {
	meta: {
		type: 'layout',
		docs: {
			description: 'Enforce SQL spacing',
			category: 'Stylistic Issues',
		},
		fixable: true,
	},
	create: createSQLTemplateElementHandler({templateElementHandler}),
};
