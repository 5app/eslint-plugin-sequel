const {RuleTester} = require('eslint');
const rule = require('../rules/allowed-functions');

RuleTester.setDefaultConfig({
	parserOptions: {
		ecmaVersion: 2020,
	},
});

function errorUpper(funcName, prop) {
	return {
		messageId: 'isDisallowed',
		data: {
			funcName,
		},
		...prop,
	};
}

// Initiate RuleTester
const ruleTester = new RuleTester();

ruleTester.run('allowed-functions', rule, {
	valid: [
		{
			// Does not contain any disallowed functions
			code: 'const sql = SQL`SELECT ${column} FROM foobar`;',
			options: [{disallowed: ['GROUP_CONCAT']}],
		},
	],

	invalid: [
		{
			code: `const sql = SQL\`SELECT VERSION(),
				    anothercolumn,
                    GROUP_CONCAT(\${column})
                FROM foobar\`;
            `,
			options: [{disallowed: ['GROUP_CONCAT', 'VERSION']}],
			errors: [
				errorUpper('VERSION', {
					line: 1,
					column: 24,
					endLine: 1,
					endColumn: 31,
				}),
				errorUpper('GROUP_CONCAT', {
					line: 3,
					column: 21,
					endLine: 3,
					endColumn: 33,
				}),
			],
		},
	],
});
