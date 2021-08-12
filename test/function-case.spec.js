const {RuleTester} = require('eslint');
const rule = require('../rules/function-case');

RuleTester.setDefaultConfig({
	parserOptions: {
		ecmaVersion: 2020,
	},
});

function errorUpper(keynames) {
	return {
		messageId: 'shouldBeUpperCase',
		data: {
			keynames,
		},
	};
}

// Initiate RuleTester
const ruleTester = new RuleTester();

ruleTester.run('function-case', rule, {
	invalid: [
		{
			code: 'const sql = SQL`select ${column} from foobar`;',
			output: 'const sql = SQL`SELECT ${column} FROM foobar`;',
			errors: [errorUpper('select'), errorUpper('from')],
		},
		{
			code: 'const sql = `select * from foobar`;',
			output: 'const sql = `SELECT * FROM foobar`;',
			errors: [errorUpper('select,from')],
		},
		{
			code: 'const sql = SQL`insert INTO foobar (${column}) values `',
			output: 'const sql = SQL`INSERT INTO foobar (${column}) VALUES `',
			errors: [errorUpper('insert'), errorUpper('values')],
		},
		{
			code: 'const sql = SQL`update foobar Set ${column}`',
			output: 'const sql = SQL`UPDATE foobar SET ${column}`',
			errors: [errorUpper('update,Set')],
		},
		{
			code: `const sql = SQL\`
				Delete FROM foobar WHERE \${column}
			\``,
			output: `const sql = SQL\`
				DELETE FROM foobar WHERE \${column}
			\``,
			errors: [errorUpper('Delete')],
		},
		{
			code: 'const sql = SQL`SELECT max(id) AS latest FROM foobar WHERE ${column} group by id`',
			output: 'const sql = SQL`SELECT MAX(id) AS latest FROM foobar WHERE ${column} GROUP BY id`',
			errors: [errorUpper('max'), errorUpper('group by')],
		},
		{
			code: 'const join = boolean || SQL`\njoin foobar f on (a.id = f.id)`',
			output: 'const join = boolean || SQL`\nJOIN foobar f ON (a.id = f.id)`',
			errors: [errorUpper('join,on')],
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
		'DELETE FROM foobar WHERE ${column}',
	].map((expression) => `const column = "*"; foo.query(\`${expression}\`);`),
});
