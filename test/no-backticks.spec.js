const {RuleTester} = require('eslint');
const rule = require('../rules/no-backticks.js');

RuleTester.setDefaultConfig({
	parserOptions: {
		ecmaVersion: 2020,
	},
});

function errorUpper(prop) {
	return {
		messageId: 'isDisallowed',
		...prop,
	};
}

// Initiate RuleTester
const ruleTester = new RuleTester();

ruleTester.run('no-backticks', rule, {
	valid: [
		{
			// Does not contain any disallowed backticks
			code: 'const sql = SQL`SELECT ${column} FROM foobar`;',
		},
	],

	invalid: [
		{
			code: 'const sql = SQL`SELECT  \\`test\\` \n\t\t\t\\`rank\\` \n\t\tFROM foobar`;\n',
			errors: [
				errorUpper({
					line: 1,
					column: 25,
					endLine: 1,
					endColumn: 27,
				}),
				errorUpper({
					line: 1,
					column: 31,
					endLine: 1,
					endColumn: 33,
				}),
				errorUpper({
					line: 2,
					column: 4,
					endLine: 2,
					endColumn: 6,
				}),
				errorUpper({
					line: 2,
					column: 10,
					endLine: 2,
					endColumn: 12,
				}),
			],
		},
	],
});
