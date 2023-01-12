const {RuleTester} = require('eslint');
const rule = require('../rules/spacing');

RuleTester.setDefaultConfig({
	parserOptions: {
		ecmaVersion: 2020,
	},
});

const multiError = {
	messageId: 'multipleSpaces',
};

// Initiate RuleTester
const ruleTester = new RuleTester();

ruleTester.run('spacing', rule, {
	invalid: [
		{
			code: 'const sql = SQL`select ${column}    from foobar`;',
			output: 'const sql = SQL`select ${column} from foobar`;',
			errors: [multiError],
		},
		{
			// Tabs instead of spaces...
			code: 'const sql = SQL`select   ${column} from  foobar`;',
			output: 'const sql = SQL`select ${column} from foobar`;',
			errors: [multiError, multiError],
		},
		{
			// Tabs instead of spaces...
			code: `const sql = SQL\`  
            select   \${column}      
            from     foobar     
            \`;`,
			output: `const sql = SQL\`
            select \${column}
            from foobar
            \`;`,
			errors: [multiError, multiError],
		},
	],
	valid: [
		'nothing like       sql',
		'could not delete from sql',
		'SELECT MAX(${column}) FROM foobar WHERE a IN ("in")',
		`SELECT
            MAX(\${column})
        FROM
            foobar`,
		'SELECT ${column} FROM foobar',
		'INSERT INTO foobar (${column}) VALUES ',
		'UPDATE foobar SET ${column}',
		'DELETE FROM foobar WHERE ${column}',
	].map(expression => `const column = "*"; foo.query(\`${expression}\`);`),
});
