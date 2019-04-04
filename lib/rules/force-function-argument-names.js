/**
 * @fileoverview Rule to enforce the parameter given to the json* API to be named "para"
 * @author Dieter Oberkofler
 */

"use strict";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function isValid(restricted, expression) {
	// if this is not a function call, we are done
	if (expression.type !== "CallExpression") {
		return true;
	}

	// if the name of the function does not match, we are done
	if (!restricted.hasOwnProperty(expression.callee.name)) {
		return true;
	}
	const option = restricted[expression.callee.name];

	return expression.arguments.every((argument, index) => {
		// Is this argument an "Identifier"
		if (argument.type !== 'Identifier') {
			return true;
		}

		// Has this parameter been specified in the options
		if (!option.hasOwnProperty(index)) {
			return true;
		}

		return option[index] === expression.arguments[index].name;
	});
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {

	meta: {
		type: "suggestion",
		docs: {
			description: "enforce json* api parameter naming convention",
			category: "Stylistic Issues",
			recommended: false,
			//url: "https://eslint.org/docs/rules/camelcase"
		},
		schema: {
			type: "array",
			items: {
				type: "object",
				properties: {
					name: {type: "string"},
					args: {
						type: "array",
						items: {
							type: "object",
							properties: {
								index: {type: "number"},
								name: {type: "string"}
							},
							required: ["index", "name"],
							additionalProperties: false
						}
					}
				},
				required: ["name", "args"],
				additionalProperties: false
			}
		},
		uniqueItems: true,
		minItems: 0
	},

	create(context) {

		// If no globals are restricted, we don't need to do anything
		if (context.options.length === 0) {
			return {};
		}

		// optimize the option for later processing
		const restricted = context.options.reduce((prev, option) => {
			if (option.args.length > 0) {
				prev[option.name] = option.args.reduce((prev, curr) => {
					prev[curr.index] = curr.name;
					return prev;
				}, {});
			}
			return prev;
		}, {}); 

		return {
			ExpressionStatement(node) {
				const expression = node.expression;

				if (!isValid(restricted, node.expression)) {
					context.report({
						node,
						message: 'The second argument in the function "' + expression.callee.name + '" must always be named "para"'
					});
				}
			}
		};
	}
};