const sqlParser = require('../utils/sqlParser.js');

/**
 * Check if a SQL query
 * @param {string} str - Check if string is a SQL query
 * @returns {boolean} whether string is a sql query or not
 */
function isSqlQuery(str) {
	return sqlParser(str);
}

/**
 * Validate node.
 * @param {object} node - Node
 * @param {object} context - Rule Context
 * @returns {void}
 */
function validate(node, context) {
	// Is this tagged template literal?
	const tagged =
		node &&
		node.type === 'TaggedTemplateExpression' &&
		node.tag.name &&
		node.tag.name.toLowerCase() === 'sql';

	// If tagged, get the child...
	if (tagged) {
		node = node.quasi;
	}

	// Ignore non-template literals..
	if (!node || node.type !== 'TemplateLiteral') {
		return;
	}

	// Is this a SQL statement?
	const literal = node.quasis.map(quasi => quasi.value.raw).join('x');

	if (!tagged && !isSqlQuery(literal)) {
		return;
	}

	// Loop through each of the TemplateElements
	node.quasis.forEach((node, index) => {
		const text = node.value.raw;

		if (!text || node.type !== 'TemplateElement') {
			return;
		}

		// Special words?
		const regexp = /\b(SELECT|AS|INSERT|INTO|UPDATE|DELETE|FROM|JOIN|LEFT|ON|WHERE|AND|OR|IS NULL|IS NOT NULL|GROUP BY|ORDER BY|\w+(?=\())\b/gi;

		// Propose the case of the function names
		const test = regexp.test(text);

		// No matches?
		if (!test) {
			return;
		}

		const words = new Set();
		let proposed = text.replace(regexp, m => {
			const replacement = m.toUpperCase();
			if (m !== replacement) {
				words.add(m);
			}
			return replacement;
		});

		// Make into Array
		const replacing = [...words];

		if (proposed !== text) {
			// Wrap between expressions
			proposed =
				(index ? '}' : '`') + proposed + (node.tail ? '`' : '${');

			context.report({
				node,
				message: 'Uppercase SQL function names "{{replacing}}"',
				data: {
					replacing,
				},
				fix: fixer => fixer.replaceText(node, proposed),
			});
		}
	});
}

/**
 * Export `function-case`.
 *
 * @param {object} context - Eslint Context object
 * @returns {object} Object rule
 */
module.exports = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Enforce SQL formatting of special words',
			category: 'Stylistic',
		},
		fixable: true,
	},
	create(context) {
		return {
			CallExpression(node) {
				node.arguments.forEach(argument => validate(argument, context));
			},
			VariableDeclaration(node) {
				node.declarations.forEach(declaration =>
					validate(declaration.init, context)
				);
			},
		};
	},
};
