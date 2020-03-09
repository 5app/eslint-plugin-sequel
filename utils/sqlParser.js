/**
 * Is string a SQL statement
 * @param {string} str - String to tests
 * @returns {boolean} true if the String is SQL'ish, otherwise false
 */
module.exports = str => {
	if (!str) {
		return {};
	}

	let bool = /^[\s\S]*SELECT[\s\S]+/i.test(str);
	if (bool) {
		return /^[\s\S]*FROM[\s\S]+/i.test(str);
	}

	if (!bool) {
		bool = /^[\s\S]*INSERT[\s\S]+((LOW_PRIORITY|DELAYED|HIGH_PRIORITY)[\s\S]+)?(IGNORE[\s\S]+)?INTO[\s\S]+/i.test(
			str
		);
		if (bool) {
			return /[\s\S]+VALUES?[\s\S]+/i.test(str);
		}
	}

	if (!bool) {
		bool = /^[\s\S]*UPDATE[\s\S]+/i.test(str);
		if (bool) {
			return /[\s\S]+SET[\s\S]+/i.test(str);
		}
	}

	if (!bool) {
		bool = /^[\s\S]*DELETE[\s\S]+FROM[\s\S]+/i.test(str);
	}

	return bool;
};
