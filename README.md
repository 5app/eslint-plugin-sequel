# `eslint-plugin-sequel`

ESLint rules for inline SQL within Template Literals.

[![Coverage Status](https://coveralls.io/repos/github/5app/eslint-plugin-sequel/badge.svg)](https://coveralls.io/github/5app/eslint-plugin-sequel)
[![CircleCI](https://circleci.com/gh/5app/eslint-plugin-sequel.svg?style=shield)](https://circleci.com/gh/5app/eslint-plugin-sequel)
[![NPM Version](https://img.shields.io/npm/v/eslint-plugin-sequel.svg)](https://www.npmjs.com/package/eslint-plugin-sequel)
[![Known Vulnerabilities](https://snyk.io/test/github/5app/eslint-plugin-sequel/badge.svg)](https://snyk.io/test/github/5app/eslint-plugin-sequel)

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
		"sequel/allowed-functions": [
			"error"
			{"disallow": ["GROUP_CONCAT"]}
		],
		"sequel/function-case": "error",
		"sequel/indent": ["error", "tab"],
		"sequel/max-placeholders": [
			"error",
			{"max": 3}
		],
		"sequel/no-eol-command": [
			"error",
			{"allowOnOwnLine": true}
		],
		"sequel/no-shorthand-all": [
			"error",
			{"allowQualified": true, "allowCountAll": true}
		],
		"sequel/no-unsafe-query": "error",
		"sequel/spacing": "error"
	}
}
```

## Rules

-   `sequel/allowed-functions`: List functions which are **not** allowed
    -   `disallow`: Array of disallowed SQL functions
-   `sequel/function-case`: Makes SQL function names uppercase, e.g. 'SELECT' **fixable**
-   `sequel/indent`: Enforces indentation **fixable**
    -   `'tab'|Number`: Defines the characters to use, where Number is given it uses spaces (default `2`).
-   `sequel/max-placeholders`: Placeholders, `?` character, can be hard to read if there are many in the same SQL string.
    -   `max`: Maximum number of placeholders allowed (default `3`)
-   `sequel/no-eol-command`: Avoid ending lines with a SQL command which is always followed by a value.
    -   `allowOnOwnLine`: Permits the command to appear if it is not preceeded by anything, allowing commands to be easily read.
-   `sequel/no-shorthand-all`: Avoid using the ambiguous shorthand all '\*'.
    -   `allowQualified` (Boolean, default: `false`): Permits qualified shorthand all e.g. `table.*` to get everything from a table.
    -   `allowCountAll` (Boolean, default: `false`): Permits within `COUNT()` e.g. `COUNT(*)`.
-   `sequel/no-unsafe-query`: Checks whether there are potentially any vulnerable SQL'ish template literals, fix by using SQL placeholders or using [SQL templating formatter](https://www.npmjs.com/search?q=sql%20template)
-   `sequel/spacing`: Multiple spaces and tabs should only be used for indentation **fixable**
