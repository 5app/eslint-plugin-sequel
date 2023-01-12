const sqlParser = require('./sqlParser.js');
const isTagged = require('./isTagged.js');

/**
 * Check if a SQL query
 * @param {string} str - Check if string is a SQL query
 * @returns {boolean} whether string is a sql query or not
 */
function isSqlQuery(str) {
	return sqlParser(str);
}

function createSQLTemplateElementHandler({templateElementHandler}) {
	return context => {
		/**
		 * Validate node.
		 * @param {object} node - Node
		 * @returns {void}
		 */
		function validate(node) {
			const {parent} = node;

			// Is this tagged template literal?
			const tagged = isTagged(parent);

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

				const meta = templateElementHandler(node, context);

				if (meta) {
					const {fix, ...report} = meta;

					if (fix) {
						const proposed =
							(index ? '}' : '`') +
							fix +
							(node.tail ? '`' : '${');
						report.fix = fixer => fixer.replaceText(node, proposed);
					}

					context.report({
						node,
						...report,
					});
				}
			});
		}

		return {
			TemplateLiteral: validate,
		};
	};
}

module.exports = createSQLTemplateElementHandler;
