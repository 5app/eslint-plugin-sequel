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
		"sequel/no-unsafe-query": 2
	}
}
```

## Supported Rules

-   Fill in provided rules here
