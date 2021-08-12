const isSqlQuery = require('../utils/sqlParser.js');
const isTagged = require('../utils/isTagged.js');

/**
 * Max Placeholders
 * The `?` characters are pretty evil
 * - They can make code hard to read and maintain when queries have alot of input variables.
 * - mysql.js regard the `?` character within comments and strings as a prepared statements which is confusing
 * See https://github.com/mysqljs/mysql#escaping-query-values
 * e.g. query(`SELECT CONCAT(question, '?') FROM questions WHERE question LIKE '?'`, ["why"]`)
 * would be considered as
 * `SELECT CONCAT(question, 'why') WHERE question LIKE '?'`
 */
module.exports = {
	meta: {
		type: 'suggestion',
		docs: {
			description:
				'enforces a maximum number of placeholder values in query',
			category: 'Possible confusion',
		},
		schema: [
			{
				oneOf: [
					{
						type: 'integer',
						minimum: 0,
					},
					{
						type: 'object',
						properties: {
							maximum: {
								type: 'integer',
								minimum: 0,
							},
							max: {
								type: 'integer',
								minimum: 0,
							},
						},
						additionalProperties: false,
					},
				],
			},
		],
		messages: {
			exceed: 'SQL statement has too many placeholders `?` appears ({{count}}). Maximum allowed is {{max}}.',
		},
	},

	/**
	 * Create `max-placeholders` rule
	 *
	 * @param {object} context - Eslint Context object
	 * @returns {object} Object rule
	 */
	create(context) {
		// Get the maximum option...
		const option = context.options[0];
		let max = 3;

		if (
			typeof option === 'object' &&
			(Object.prototype.hasOwnProperty.call(option, 'maximum') ||
				Object.prototype.hasOwnProperty.call(option, 'max'))
		) {
			max = option.maximum || option.max;
		}
		if (typeof option === 'number') {
			max = option;
		}

		/**
		 * Validate node.
		 * @param {object} node - Node
		 * @returns {void}
		 */
		function validate(node) {
			const {parent} = node;

			// Tagged with a 'SQL' like name?
			const tagged = isTagged(parent);

			// Join up the parts...
			const literal = node.quasis
				.map((quasi) => quasi.value.raw)
				.join('x');

			// Is this something other than a SQL expression?
			if (!tagged && !isSqlQuery(literal)) {
				return;
			}

			// Count the occurrences of `?` character...
			const match = literal.match(/\?/g);
			const count = match ? match.length : 0;

			if (count > max) {
				context.report({
					node,
					messageId: 'exceed',
					data: {
						count,
						max,
					},
				});
			}
		}

		return {
			TemplateLiteral: validate,
		};
	},
};
