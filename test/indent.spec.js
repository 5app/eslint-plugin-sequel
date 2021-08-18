const {RuleTester} = require('eslint');
const rule = require('../rules/indent');

RuleTester.setDefaultConfig({
	parserOptions: {
		ecmaVersion: 2020,
	},
});

function wrongIndentation(expected) {
	return {
		messageId: 'wrongIndentation',
		data: {
			expected,
			actual: 'mixed tabs and spaces',
		},
	};
}

// Initiate RuleTester
const ruleTester = new RuleTester();

ruleTester.run('indent', rule, {
	invalid: [
		// Spaces to tabs
		{
			code: 'const sql1 = SQL`SELECT \n\t ${column} from foobar\n   \tWHERE 1`;',
			options: ['tab'],
			output: 'const sql1 = SQL`SELECT \n\t\t${column} from foobar\n\tWHERE 1`;',
			errors: [wrongIndentation('tab'), wrongIndentation('tab')],
		},
		// Offset Indent
		{
			code: '\tconst sql2 = SQL`\nSELECT \n\t\t\n${column},\n\trelativeindent from foobar\nWHERE 1\n\t\t`;',
			options: ['tab'],
			output: '\tconst sql2 = SQL`\n\t\tSELECT \n\n\t\t${column},\n\t\t\trelativeindent from foobar\n\t\tWHERE 1\n\t`;',
			errors: [wrongIndentation('tab'), wrongIndentation('tab')],
		},

		// Tabs to spaces
		{
			code: 'const sql3 = SQL`SELECT \n\t ${column} from foobar\n   \tWHERE 1`;',
			options: [2],
			output: 'const sql3 = SQL`SELECT \n  ${column} from foobar\n  WHERE 1`;',
			errors: [wrongIndentation('space'), wrongIndentation('space')],
		},
		// Offset Indent
		{
			code: '  const sql4 = SQL`SELECT \n${column} from foobar\nWHERE 1\n    `;',
			options: [2],
			output: '  const sql4 = SQL`SELECT \n    ${column} from foobar\n    WHERE 1\n  `;',
			errors: [wrongIndentation('space'), wrongIndentation('space')],
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
