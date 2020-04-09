/**
 * Is Tagged Template Literal with SQL ish name...
 * @param {object} parent - TaggedTemplateExpression with potential name...
 * @returns {boolean} True if it's tagged with a function named like SQL
 */
module.exports = (parent) => {
	return (
		parent &&
		parent.type === 'TaggedTemplateExpression' &&
		parent.tag.name &&
		parent.tag.name.toLowerCase() === 'sql'
	);
};
