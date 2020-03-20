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
		"sequel/no-unsafe-query": 2,
		"sequel/spacing": 2
	}
}
```

## Supported Rules

-   `sequel/no-unsafe-query`: Checks whether there are potentially any vulnerable SQL'ish template literals, fix by using SQL placeholders or using [SQL templating formatter](https://www.npmjs.com/search?q=sql%20template)
-   `sequel/function-case`: Makes SQL function names uppercase, e.g. 'SELECT' **fixable**
-   `sequel/spacing`: Multiple spaces and tabs should only be used for indentation **fixable**
