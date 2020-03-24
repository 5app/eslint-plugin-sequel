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
	if (!node) {
		return;
	}

	if (
		node.type === 'TaggedTemplateExpression' &&
		node.tag.name &&
		node.tag.name.toLowerCase() !== 'sql'
	) {
		node = node.quasi;
	}

	if (node.type === 'TemplateLiteral' && node.expressions.length) {
		const literal = node.quasis.map((quasi) => quasi.value.raw).join('x');

		if (isSqlQuery(literal)) {
			context.report(
				node,
				'Use the `sql` tagged template literal for raw queries'
			);
		}
	}
}

/**
 * Export `no-unsafe-query`.
 *
 * @param {object} context - Esline Context object
 * @returns {object} Object rule
 */
module.exports = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Prevent unformatted SQL Template literals',
			category: 'Possible security issue',
		},
	},
	create(context) {
		return {
			CallExpression(node) {
				node.arguments.forEach((argument) =>
					validate(argument, context)
				);
			},
			VariableDeclaration(node) {
				node.declarations.forEach((declaration) =>
					validate(declaration.init, context)
				);
			},
		};
	},
};
