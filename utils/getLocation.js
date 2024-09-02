module.exports = function getLocation(node, index, matchStr) {
	const prefixLines = node.value.raw.slice(0, index).split('\n');
	const prefixLast = prefixLines.pop();
	const column =
		(prefixLines.length === 0 ? node.loc.start?.column + 1 : 0) +
		prefixLast.length;
	const line = node.loc.start?.line + prefixLines.length;

	return {
		node,
		loc: {
			start: {
				line,
				column,
			},
			end: {
				line,
				column: column + matchStr.length,
			},
		},
	};
};
