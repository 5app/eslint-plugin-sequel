/**
 * Is string a SQL statement
 * @param {string} str - String to tests
 * @returns {boolean} true if the String is SQL'ish, otherwise false
 */
module.exports = (str) => {
	/**
	 * Is this a SELECT?
	 */
	let bool = /^\s*SELECT\s+/i.test(str);
	if (bool) {
		return /\s+FROM\s+/i.test(str);
	}

	/**
	 * Is this a INSERT
	 */
	bool =
		/^\s*INSERT\s+((LOW_PRIORITY|DELAYED|HIGH_PRIORITY)\s+)?(IGNORE\s+)?(INTO\s+)?([\w$-]+)\s\(/i.test(
			str
		);
	if (bool) {
		return /\s+(VALUES?|SELECT)\s+/i.test(str);
	}

	/**
	 * Is this a UPDATE?
	 */
	bool = /^\s*UPDATE\s+/i.test(str);
	if (bool) {
		return /\s+SET\s+/i.test(str);
	}

	/**
	 * Is this a DELETE?
	 */
	bool = /^\s*DELETE\s+(\w\s)?FROM\s+/i.test(str);

	return bool;
};
