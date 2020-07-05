# `eslint-plugin-sequel`

Eslint rules for inline SQL

## Installation

Install `eslint-plugin-sequel`:

```
$ npm install eslint-plugin-sequel --save-dev
```

## Usage

Add `sequel` to the plugins section of your `.eslintrc` configuration file.

```json
{
	"plugins": ["sequel"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
	"rules": {
		"sequel/function-case": 2,
		"sequel/max-placeholders": [2, {"max": 3}],
		"sequel/no-shorthand-all": [
			2,
			{"allowQualified": true, "allowCountAll": true}
		],
		"sequel/no-unsafe-query": 2,
		"sequel/spacing": 2
	}
}
```

## Supported Rules

-   `sequel/function-case`: Makes SQL function names uppercase, e.g. 'SELECT' **fixable**
-   `sequel/indent`: Enforces indentation **fixable**
    -   `'tab'|Number`: Defines the characters to use, where Number is given it uses spaces.
-   `sequel/max-placeholders`: Placeholders, `?` character, can be hard to read if there are many in the same SQL string.
    -   `max`: Maximum number of placeholders allowed (default `3`)
-   `sequel/no-shorthand-all`: Avoid using the ambiguous shorthand all '\*'.
    -   `allowQualified` (Boolean, default: `false`): Permits qualified shorthand all e.g. `table.*` to get everything from a table.
    -   `allowCountAll` (Boolean, default: `false`): Permits within `COUNT()` e.g. `COUNT(*)`.
-   `sequel/no-unsafe-query`: Checks whether there are potentially any vulnerable SQL'ish template literals, fix by using SQL placeholders or using [SQL templating formatter](https://www.npmjs.com/search?q=sql%20template)
-   `sequel/spacing`: Multiple spaces and tabs should only be used for indentation **fixable**
