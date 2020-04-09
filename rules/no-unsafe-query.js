const isSqlQuery = require('../utils/sqlParser.js');
const isTagged = require('../utils/isTagged.js');

module.exports = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Prevent untagged SQL Template literals',
			category: 'Possible security issue',
		},
	},

	/**
	 * Create `no-unsafe-query` rule
	 *
	 * @param {object} context - Eslint Context object
	 * @returns {object} Object rule
	 */
	create(context) {
		/**
		 * Validate node.
		 * @param {object} node - Node
		 * @returns {void}
		 */
		function validate(node) {
			const {parent} = node;

			// Tagged with a 'SQL' like name?
			const tagged = isTagged(parent);

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
