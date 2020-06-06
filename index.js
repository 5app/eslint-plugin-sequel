const requireIndex = require('requireindex');
const path = require('path');

// import all rules in /rules
module.exports = {
	rules: requireIndex(path.resolve(__dirname, 'rules')),
	configs: {
		recommended: {
			env: {
				es6: true,
			},
			parserOptions: {
				ecmaVersion: 2020,
			},
			plugins: ['sequel'],
			rules: {
				'sequel/no-unsafe-query': 'error',
			},
		},
	},
};
