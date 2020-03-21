const sqlParser = require('./sqlParser.js');

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
function validate(node, context, {templateElementHandler}) {
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

		const meta = templateElementHandler(node, context);

		if (meta) {
			const {fix, ...report} = meta;

			if (fix) {
				const proposed =
					(index ? '}' : '`') + fix + (node.tail ? '`' : '${');
				report.fix = fixer => fixer.replaceText(node, proposed);
			}

			context.report({
				node,
				...report,
			});
		}
	});
}

function createSQLTemplateElementHandler(handlers) {
	return context => {
		return {
			CallExpression(node) {
				node.arguments.forEach(argument =>
					validate(argument, context, handlers)
				);
			},
			VariableDeclaration(node) {
				node.declarations.forEach(declaration =>
					validate(declaration.init, context, handlers)
				);
			},
		};
	};
}

module.exports = createSQLTemplateElementHandler;
