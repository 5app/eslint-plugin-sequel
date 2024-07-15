const createSQLTemplateElementHandler = require('../utils/createSQLTemplateElementHandler');

/**
 * Template Element Handler for Backticks
 * @param {object} node - Element Node
 * @returns {object|undefined} Returns a format object or undefined
 */
function templateElementHandler(node) {
	const text = node.value.raw;

	const backtick = '\\`';

	const test = text.matchAll(backtick);

	const incidents = [];

	for (const match of test) {
		// Get the text before the match, and split it into lines
		const prefixLines = text.slice(0, match.index).split('\n');
		// Extract the last line, everything in the column preceeding the backtick
		const prefixLast = prefixLines.pop();
		// Derive the column, if the prefix is empty i.e. no multi-line, include the start column of the node
		const column =
			(prefixLines.length === 0 ? node.loc.start?.column : -1) +
			prefixLast.length;
		// Count the lines: the text node, and then the lines within the text node before the backtick
		const line = node.loc.start?.line + prefixLines.length;

		const report = {
			messageId: 'isDisallowed',
			loc: {
				start: {
					line,
					column,
				},
				end: {
					line,
					column: column + backtick.length,
				},
			},
		};

		incidents.push(report);
	}

	return incidents;
}

/**
 * Export `no-backticks`.
 *
 * @param {object} context - Eslint Context object
 * @returns {object} Object rule
 */
module.exports = {
	meta: {
		type: 'suggestion',
		docs: {
			description:
				'Enforce allowed and disallowed backticks in SQL template literals',
			category: 'Stylistic Issues',
		},
		messages: {
			isDisallowed:
				'Backticks are disallowed as they are incompatible with SQL. Use double quotes instead, prefix identifier names or ammend names of fields stored in the database.',
		},
	},
	create: createSQLTemplateElementHandler({templateElementHandler}),
};
