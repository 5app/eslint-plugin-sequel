const {RuleTester} = require('eslint');
const rule = require('../rules/no-shorthand-all.js');

RuleTester.setDefaultConfig({
	parserOptions: {
		ecmaVersion: 2020,
	},
});

// Initiate RuleTester
const ruleTester = new RuleTester();

ruleTester.run('no-shorthand-all', rule, {
	invalid: [
		{
			sql: 'select * from foobar',
			errors: [
				{
					messageId: 'noShorthandAll',
				},
			],
		},
		{
			sql: 'select count(*) from foobar',
			options: [
				{
					allowCountAll: false,
				},
			],
			errors: [
				{
					messageId: 'noShorthandAll',
				},
			],
		},
		{
			sql: 'SELECT a.* FROM foobar a',
			options: [
				{
					allowQualified: false,
				},
			],
			errors: [
				{
					messageId: 'noShorthandAll',
				},
			],
		},
	].map(mapInlineSQL),
	valid: [
		'nothing like       sql',
		'could not delete from sql',
		`SELECT 
            /** This should be ignored * */
            MAX(\${column}) FROM foobar WHERE a IN ("in")
        
		`,
		'SELECT NUMBER(a * 2), a * 1 FROM foobar',
		{
			sql: 'SELECT COUNT(*) FROM foobar',
			options: [
				{
					allowCountAll: true,
				},
			],
		},
		{
			sql: 'SELECT count(a.*) FROM foobar a',
			options: [
				{
					allowCountAll: true,
				},
			],
		},
		{
			sql: 'SELECT count(DISTINCT a.*) FROM foobar',
			options: [
				{
					allowCountAll: true,
				},
			],
		},
		{
			sql: 'SELECT a.* FROM foobar a',
			options: [
				{
					allowQualified: true,
				},
			],
		},
	].map(mapInlineSQL),
});

function mapInlineSQL(expression) {
	if (typeof expression === 'string') {
		expression = {sql: expression};
	}

	const {sql, ...meta} = expression;

	if (sql) {
		meta.code = `const column = "*"; foo.query(\`${sql}\`);`;
	}

	return meta;
}
