const {RuleTester} = require('eslint');
const rule = require('../rules/indent');

RuleTester.setDefaultConfig({
	parserOptions: {
		ecmaVersion: 2020,
	},
});

// Initiate RuleTester
const ruleTester = new RuleTester();

ruleTester.run('indent', rule, {
	invalid: [
		{
			code:
				'const sql = SQL`SELECT \n\t ${column} from foobar\n   \tWHERE 1`;',
			options: ['tab'],
			output:
				'const sql = SQL`SELECT \n\t\t${column} from foobar\n\tWHERE 1`;',
			errors: [
				{
					messageId: 'wrongIndentation',
					data: {
						expected: 'tab',
						actual: 'mixed tabs and spaces',
					},
				},
				{
					messageId: 'wrongIndentation',
					data: {
						expected: 'tab',
						actual: 'mixed tabs and spaces',
					},
				},
			],
		},
		{
			code:
				'const sql = SQL`SELECT \n\t ${column} from foobar\n   \tWHERE 1`;',
			options: [2],
			output:
				'const sql = SQL`SELECT \n   ${column} from foobar\n    WHERE 1`;',
			errors: [
				{
					messageId: 'wrongIndentation',
					data: {
						expected: 'space',
						actual: 'mixed tabs and spaces',
					},
				},
				{
					messageId: 'wrongIndentation',
					data: {
						expected: 'space',
						actual: 'mixed tabs and spaces',
					},
				},
			],
		},
	],
	valid: [
		'nothing like sql',
		'could not delete from sql',
		'SELECT MAX(${column}) FROM foobar WHERE a IN ("in")',
		'SELECT MAX(${column}) FROM foobar',
		'SELECT ${column} FROM foobar',
		'SELECT /** select something from somewhere */ id FROM foobar',
		'INSERT INTO foobar (${column}) VALUES ',
		'UPDATE foobar SET ${column}',
		'DELETE FROM\n    foobar WHERE ${column}',
	].map((expression) => `const column = "*"; foo.query(\`${expression}\`);`),
});