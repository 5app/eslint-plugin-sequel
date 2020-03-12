const {RuleTester} = require('eslint');
const rule = require('../rules/function-case');

RuleTester.setDefaultConfig({
	parserOptions: {
		ecmaVersion: 2020,
	},
});

// Initiate RuleTester
const ruleTester = new RuleTester();

ruleTester.run('function-case', rule, {
	invalid: [
		{
			code: 'const sql = SQL`select ${column} from foobar`;',
			errors: [
				{
					message: 'Uppercase SQL function names "select"',
				},
				{
					message: 'Uppercase SQL function names "from"',
				},
			],
		},
		{
			code: 'const sql = `select * from foobar`;',
			errors: [
				{
					message: 'Uppercase SQL function names "select,from"',
				},
			],
		},
		{
			code: 'const sql = SQL`insert INTO foobar (${column}) values `',
			errors: [
				{
					message: 'Uppercase SQL function names "insert"',
				},
			],
		},
		{
			code: 'const sql = SQL`update foobar SET ${column}`',
			errors: [
				{
					message: 'Uppercase SQL function names "update"',
				},
			],
		},
		{
			code: 'const sql = SQL`Delete FROM foobar WHERE ${column}`',
			errors: [
				{
					message: 'Uppercase SQL function names "Delete"',
				},
			],
		},
	],
	valid: [
		'nothing like sql',
		'SELECT ${column} FROM foobar',
		'INSERT INTO foobar (${column}) VALUES ',
		'UPDATE foobar SET ${column}',
		'DELETE FROM foobar WHERE ${column}',
	].map(expression => `const column = "*"; foo.query(\`${expression}\`);`),
});
