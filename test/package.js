const index = require('../index.js');

describe('Package', () => {
	it('should have rules', () => {
		if (typeof index.rules !== 'object') {
			throw new Error('index.rules is not an object');
		}
		if (!Object.keys(index.rules).length) {
			throw new Error('index.rules is empty');
		}
	});
});
