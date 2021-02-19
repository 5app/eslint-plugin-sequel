const {RuleTester} = require('eslint');
const rule = require('../rules/no-eol-command');

RuleTester.setDefaultConfig({
	parserOptions: {
		ecmaVersion: 2020,
	},
});

function eolErr(commands) {
	return {
		messageId: 'noEolCommand',
		data: {
			commands,
		},
	};
}

// Initiate RuleTester
const ruleTester = new RuleTester();

ruleTester.run('no-eol-command', rule, {
	invalid: [
		{
			code: 'const sql = SQL`SELECT\n\n\n ${column} FROM \n\n\n foobar`;',
			output: 'const sql = SQL`SELECT  ${column} FROM  foobar`;',
			errors: [eolErr('SELECT'), eolErr('FROM')],
		},
		{
			code: 'const sql = SQL`SELECT\n\n\n ${column} FROM \n\n\n foobar`;',
			options: [
				{
					allowOnOwnLine: true,
				},
			],
			output: 'const sql = SQL`SELECT\n\n\n ${column} FROM  foobar`;',
			errors: [eolErr('FROM')],
		},
	],
	valid: [
		{
			code:
				'const sql = SQL`SELECT\n\n\n ${column}\n FROM \n\n\n foobar`;',
			options: [
				{
					allowOnOwnLine: true,
				},
			],
		},
		...[
			'nothing like sql',
			'could not delete from sql',
			'SELECT MAX(${column}) FROM foobar WHERE a IN ("in")',
		].map(
			(expression) => `const column = "*"; foo.query(\`${expression}\`);`
		),
	],
});
