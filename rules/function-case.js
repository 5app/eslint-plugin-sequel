const createSQLTemplateElementHandler = require('../utils/createSQLTemplateElementHandler');

/**
 * Template Element Handler for Function Case
 * @param {object} node - Element Node
 * @returns {object|undefined} Returns a format object or undefined
 */
function templateElementHandler(node) {
	const text = node.value.raw;

	// Special words?
	const regexp =
		/((?<quote>['"]).+?\2|(?<comment>\/\*.+?\*\/)|\b(SELECT|DISTINCT|AS|INSERT|INTO|VALUES|UPDATE|SET|DELETE|FROM|JOIN|LEFT|ON|WHERE|AND|OR|IS NULL|IS NOT NULL|NOT IN|IN|GROUP BY|ORDER BY|ASC|DESC|BETWEEN|EXISTS|\w+(?=\())\b)/gi;

	// Propose the case of the function names
	const test = regexp.test(text);

	// No matches?
	if (!test) {
		return;
	}

	const words = new Set();
	const fix = text.replace(regexp, (m, ...params) => {
		// Get the named capture groups last paramater
		const {quote, comment} = params.pop();

		if (quote || comment) {
			return m;
		}
		const replacement = m.toUpperCase();
		if (m !== replacement) {
			words.add(m);
		}
		return replacement;
	});

	// Make into Array
	const keynames = [...words];

	if (fix !== text) {
		// Wrap between expressions

		return {
			messageId: 'shouldBeUpperCase',
			data: {
				keynames,
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
		messages: {
			shouldBeUpperCase: 'Uppercase SQL function names "{{keynames}}"',
		},
		fixable: 'whitespace',
	},
	create: createSQLTemplateElementHandler({templateElementHandler}),
};
