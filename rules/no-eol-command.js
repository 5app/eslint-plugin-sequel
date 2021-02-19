const createSQLTemplateElementHandler = require('../utils/createSQLTemplateElementHandler');
const getOption = require('../utils/getOption');

/**
 * Template Element Handler for no-eol-command
 * @param {object} node - Element Node
 * @param {object} context - Context
 * @returns {object} Returns a format object or undefined
 */
function templateElementHandler(node, context) {
	// Get the maximum option...
	const allowOnOwnLine = getOption(context, 'allowOnOwnLine', false);

	const text = node.value.raw;

	// Regexp
	// SQL Commands, these should not appear at the end of a line
	const regexp = /((?<ownline>\n)\s*)?\b(?<command>SELECT|DISTINCT|AS|INSERT|INTO|VALUES|UPDATE|SET|DELETE|FROM|JOIN|LEFT|ON|WHERE|AND|OR|NOT IN|IN|GROUP BY|ORDER BY|ASC|DESC|BETWEEN)(\s*\n)+/gi;

	// Propose the case of the function names
	const test = regexp.test(text);

	// No matches?
	if (!test) {
		return;
	}

	const commands = new Set();
	const fix = text.replace(regexp, (m, ...params) => {
		// Get the named capture groups last paramater
		const [index, , groups] = params.slice(-3);

		const {command, ownline} = groups;

		// This is ok....
		if ((ownline || index === 0) && allowOnOwnLine) {
			return m;
		}

		commands.add(command);

		return `${command} `;
	});

	if (fix !== text) {
		// Wrap between expressions

		return {
			messageId: 'noEolCommand',
			data: {
				commands: [...commands],
			},
			fix,
		};
	}
}

/**
 * Export `no-eol-commands`.
 *
 * @param {object} context - Eslint Context object
 * @returns {object} Object rule
 */
module.exports = {
	meta: {
		type: 'layout',
		docs: {
			description: 'Enforce no newlines after SQL Commands',
			category: 'Stylistic Issues',
		},
		fixable: 'whitespace',
		schema: [
			{
				type: 'object',
				properties: {
					allowOnOwnLine: {
						type: 'boolean',
						default: true,
					},
				},
				additionalProperties: false,
			},
		],
		messages: {
			noEolCommand:
				'The following SQL Commands should not appear at the end of line "{{commands}}"',
		},
	},
	create: createSQLTemplateElementHandler({templateElementHandler}),
};
