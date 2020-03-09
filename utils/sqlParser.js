/**
 * Is string a SQL statement
 * @param {string} str - String to tests
 * @returns {boolean} true if the String is SQL'ish, otherwise false
 */
module.exports = str => {
	if (!str) {
		return {};
	}

	return /^[\s\t]*SELECT/i.test(str);
};
