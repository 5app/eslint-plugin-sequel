const {RuleTester} = require('eslint');
const rule = require('../rules/no-unsafe-query');

RuleTester.setDefaultConfig({
	parserOptions: {
		ecmaVersion: 2020,
	},
});

// Initiate RuleTester
const ruleTester = new RuleTester();

ruleTester.run('no-unsafe-query', rule, {
	invalid: [
		'SELECT ${column} FROM foobar',
		'INSERT INTO foobar (${column}) VALUES ',
		'UPDATE foobar SET ${column}',
		'DELETE FROM foobar WHERE ${column}',
	].reduce(
		(arr, expression) => [
			...arr,
			{
				code: `const column = "*"; foo.query(\`${expression}\`);`,
				errors: [
					{
						message:
							'Use the `sql` tagged template literal for raw queries',
					},
				],
			},
			{
				code: `const column = "*"; const query = \`${expression}\`; foo.query(query);`,
				errors: [
					{
						message:
							'Use the `sql` tagged template literal for raw queries',
					},
				],
			},
			{
				code: `const column = "*"; foo.query(foobar\`${expression}\`);`,
				errors: [
					{
						message:
							'Use the `sql` tagged template literal for raw queries',
					},
				],
			},
			{
				code: `const column = "*"; const query = foobar\`${expression}\`; foo.query(query);`,
				errors: [
					{
						message:
							'Use the `sql` tagged template literal for raw queries',
					},
				],
			},
		],
		[]
	),
	valid: [
		'const column = "*"; foo.query(sql`SELECT ${column} FROM foobar`);',
		'const column = "*"; const query = SQL`SELECT ${column} FROM foobar`; foo.query(query);',
		'foo.query(`SELECT column FROM foobar`);',
		'let query;',
		'const query = `SELECT column FROM foobar`; foo.query(query);',
		'const foo = "bar"; baz.greet(`hello ${foo}`);',
		'const foo = "bar"; const baz = `hello ${foo}`; qux.greet(baz);',
		'foo.greet(`hello`);',
		'foo.greet(`Select `);',
		'foo.greet(``);',
		'const foo = `bar`; baz.greet(foo);',
	],
});
