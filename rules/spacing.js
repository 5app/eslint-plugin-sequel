const createSQLTemplateElementHandler = require('../utils/createSQLTemplateElementHandler');

/**
 * Template Element Handler for Function Case
 * @param {object} node - Element Node
 * @returns {object} Format object or undefined
 */
function templateElementHandler(node) {
	const text = node.value.raw;

	// CRLF
	/* istanbul ignore next */
	const newline = /\r\n/.test(text) ? '\r\n' : '\n';

	// Loop through the lines...
	const lines = text.split(newline);

	// Loop through lines
	const fix = lines
		.map((line, index) => {
			// Find spaces
			const regexp = /(?<quote>['"]).+?\1|\s+/gi;

			// For all but the last line...
			if (index < lines.length - 1) {
				// trim white space from the end.
				line = line.trimEnd();
			}

			return line.replace(regexp, (m, _, regIndex, original, groups) => {
				// Get the named capture groups last paramater
				const {quote} = groups;

				// Ignore quotes, ignore start of lines, unless it's the first line...
				if (quote || (index !== 0 && regIndex === 0)) {
					return m;
				}

				// Single white space
				return ' ';
			});
		})
		.join(newline);

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
		fixable: 'whitespace',
	},
	create: createSQLTemplateElementHandler({templateElementHandler}),
};
