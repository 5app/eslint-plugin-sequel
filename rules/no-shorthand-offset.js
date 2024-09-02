const isSqlQuery = require('../utils/sqlParser.js');
const isTagged = require('../utils/isTagged.js');
const getLocation = require('../utils/getLocation.js');

/**
 * no-shorthand-offset
 * MySQL permits the non-standard `LIMIT offset, count` syntax, but it is not portable to other SQL databases.
 * So this rule will flag the potential use of `LIMIT offset, count` syntax.
 */
module.exports = {
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Disallow the use of `LIMIT offset, count` syntax',
			category: 'non-standard SQL',
		},
		messages: {
			nonStandardSQL:
				'Non-standard SQL syntax `LIMIT offset, count` is not portable',
		},
	},

	/**
	 * Create `no-shorthand-offset` rule
	 *
	 * @param {object} context - Eslint Context object
	 * @returns {object} Object rule
	 */
	create(context) {
		/**
		 * Validate node.
		 * @param {object} templateLiteralNode - Node
		 * @returns {void}
		 */
		function validate(templateLiteralNode) {
			const {parent} = templateLiteralNode;

			// Tagged with a 'SQL' like name?
			const tagged = isTagged(parent);

			// Join up the parts...
			const literal = templateLiteralNode.quasis
				.map(quasi => quasi.value.raw)
				.join('?');

			// Is this something other than a SQL expression?
			if (!tagged && !isSqlQuery(literal)) {
				return;
			}

			const incidents = [];

			// Loop through the TemplateElements
			templateLiteralNode.quasis.forEach((node, index) => {
				// Is there a `LIMIT offset,` clause?
				const hardcodedShortHandOffset = node.value.raw.match(
					/\b(?<prefix>limit(\s+(--.*\n)*)+)(?<body>(\d+|\?)\s*,)/i
				);

				if (hardcodedShortHandOffset) {
					const matchStr = hardcodedShortHandOffset.groups.body;
					const matchIndex =
						hardcodedShortHandOffset.index +
						hardcodedShortHandOffset.groups.prefix.length;

					incidents.push({
						messageId: 'nonStandardSQL',
						...getLocation(node, matchIndex, matchStr),
					});
					return;
				}

				// Is there a `LIMIT` clause?
				const endsInLimitClause = node.value.raw.match(
					/limit(\s+(--.*\n)*)+$/i
				);

				if (endsInLimitClause && !node.tail) {
					// Get the next node in sequence, does that start with a `,`?
					const nextNode = templateLiteralNode.quasis[index + 1];

					const nextStartsWithComma =
						nextNode.value.raw.match(/^(\s*),/i);

					// console.log({
					// 	nextNode,
					// 	endsInLimitClause,
					// 	nextStartsWithComma,
					// });

					if (nextStartsWithComma) {
						const strPattern = ',';

						// Report the error
						const matchIndex =
							nextNode.value.raw.indexOf(strPattern);

						incidents.push({
							messageId: 'nonStandardSQL',
							...getLocation(nextNode, matchIndex, strPattern),
						});
					}
				}
			});

			// console.log(incidents);

			incidents.forEach(incident => context.report(incident));
		}

		return {
			TemplateLiteral: validate,
		};
	},
};
