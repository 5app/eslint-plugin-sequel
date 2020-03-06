module.exports = str => {
	if (!str) {
		return {};
	}

	return /^[\s\t]*SELECT/i.test(str);
};
