const createSQLTemplateElementHandler = require('../utils/createSQLTemplateElementHandler');

/**
 * Template Element Handler for Function Case
 * @param {object} node - Element Node
 * @returns {object} Returns a format object or undefined
 */
function templateElementHandler(node) {
	const text = node.value.raw;

	// Special words?
	const regexp = /((?<quote>['"]).+?\2|\b(SELECT|AS|INSERT|INTO|UPDATE|DELETE|FROM|JOIN|LEFT|ON|WHERE|AND|OR|IS NULL|IS NOT NULL|NOT IN|IN|GROUP BY|ORDER BY|ASC|DESC|BETWEEN|\w+(?=\())\b)/gi;

	// Propose the case of the function names
	const test = regexp.test(text);

	// No matches?
	if (!test) {
		return;
	}

	const words = new Set();
	const fix = text.replace(regexp, (m, ...params) => {
		// Get the named capture groups last paramater
		const {quote} = params.pop();

		if (quote) {
			return m;
		}
		const replacement = m.toUpperCase();
		if (m !== replacement) {
			words.add(m);
		}
		return replacement;
	});

	// Make into Array
	const replacing = [...words];

	if (fix !== text) {
		// Wrap between expressions

		return {
			message: 'Uppercase SQL function names "{{replacing}}"',
			data: {
				replacing,
			},
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
			description: 'Enforce SQL formatting of special words',
			category: 'Stylistic Issues',
		},
		fixable: 'whitespace',
	},
	create: createSQLTemplateElementHandler({templateElementHandler}),
};
