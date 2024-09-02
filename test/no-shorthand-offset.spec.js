const {RuleTester} = require('eslint');
const rule = require('../rules/no-shorthand-offset');

RuleTester.setDefaultConfig({
	parserOptions: {
		ecmaVersion: 2020,
	},
});

function exceed(data) {
	return {
		messageId: 'nonStandardSQL',
		...data,
	};
}

// Initiate RuleTester
const ruleTester = new RuleTester();

ruleTester.run('no-shorthand-offset', rule, {
	invalid: [
		{
			code: 'const sql = `select ${column} from foobar LIMIT ?, ?`;',
			errors: [
				exceed({
					line: 1,
					column: 49,
					endLine: 1,
					endColumn: 51,
				}),
			],
		},
		{
			code: 'const sql = `select ${column} from foobar \n LIMIT 100\n\n, 100`;',
			errors: [
				exceed({
					line: 2,
					column: 8,
					endLine: 2,
					endColumn: 14,
				}),
			],
		},
		{
			code: 'const sql = `select ${column} from foobar LIMIT ${offset}, ${limit}`;',
			errors: [
				exceed({
					line: 1,
					column: 58,
					endLine: 1,
					endColumn: 59,
				}),
			],
		},
		{
			code: 'const sql = SQL`select ${column} from foobar \nLIMIT -- comment\n   ${offset}\n\n\n, ${limit}`;',
			errors: [
				exceed({
					line: 6,
					column: 1,
					endLine: 6,
					endColumn: 2,
				}),
			],
		},
	],
	valid: [
		'nothing like sql',
		'SELECT * FROM x LIMIT ${limit} OFFSET ${offset}',
		'SELECT * FROM x LIMIT 1 OFFSET 2',
	].map(expression => `const column = "*"; foo.query(\`${expression}\`);`),
});
