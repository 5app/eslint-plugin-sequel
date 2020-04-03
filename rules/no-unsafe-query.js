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
 * Export `no-unsafe-query`.
 *
 * @param {object} context - Esline Context object
 * @returns {object} Object rule
 */
module.exports = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Prevent untagged SQL Template literals',
			category: 'Possible security issue',
		},
	},
	create(context) {
		/**
		 * Validate node.
		 * @param {object} node - Node
		 * @returns {void}
		 */
		function validate(node) {
			const {parent} = node;

			// Tagged with a 'SQL' like name?
			const tagged =
				parent &&
				parent.type === 'TaggedTemplateExpression' &&
				parent.tag.name &&
				parent.tag.name.toLowerCase() === 'sql';

			// If this has TemplateExpressions, e.g. `SELECT ${expression}...`
			if (!tagged && node.expressions.length) {
				const literal = node.quasis
					.map((quasi) => quasi.value.raw)
					.join('x');

				if (isSqlQuery(literal)) {
					context.report(
						node,
						'Use the `sql` tagged template literal for raw queries'
					);
				}
			}
		}

		return {
			TemplateLiteral: validate,
		};
	},
};
