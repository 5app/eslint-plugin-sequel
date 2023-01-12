const {RuleTester} = require('eslint');
const rule = require('../rules/max-placeholders');

RuleTester.setDefaultConfig({
	parserOptions: {
		ecmaVersion: 2020,
	},
});

function exceed(data) {
	return {
		messageId: 'exceed',
		data,
	};
}

// Initiate RuleTester
const ruleTester = new RuleTester();

ruleTester.run('max-placeholders', rule, {
	invalid: [
		{
			code: 'const sql = `select ${column} from foobar WHERE id = ?`;',
			options: [0],
			errors: [exceed({count: 1, max: 0})],
		},
		{
			code: 'const sql = SQL`select ${column} from foobar WHERE id = ? AND name = ?`;',
			options: [
				{
					max: 1,
				},
			],
			errors: [exceed({count: 2, max: 1})],
		},
	],
	valid: [
		'nothing like sql',
		'could not delete from sql',
		'SELECT * FROM ?',
		'SELECT * FROM ? AND ? AND ?',
		'SELECT MAX(${column}) FROM foobar WHERE a IN ("in")',
		'SELECT MAX(${column}) FROM foobar',
		'SELECT ${column} FROM foobar',
		'SELECT /** select something from somewhere */ id FROM foobar',
		'INSERT INTO foobar (${column}) VALUES ',
		'UPDATE foobar SET ${column}',
		'DELETE FROM foobar WHERE ${column}',
	].map(expression => `const column = "*"; foo.query(\`${expression}\`);`),
});
