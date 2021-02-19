/**
 * getOption
 * @param {object} context - Context
 * @param {object} context.options - Options
 * @param {string} propName - Property Input to get
 * @param {*} defaultValue - Default
 * @returns {*} Option Value
 */
function getOption({options}, propName, defaultValue) {
	const [option] = options;
	if (
		typeof option === 'object' &&
		Object.prototype.hasOwnProperty.call(option, propName)
	) {
		return option[propName];
	}
	return defaultValue;
}

module.exports = getOption;
