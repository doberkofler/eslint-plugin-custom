/**
 * @fileoverview Rule to enforce the parameter given to the json* API to be named "para"
 * @author Dieter Oberkofler
 */

"use strict";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/*
 * Check if the node expression is one of the following:
 *	1) "CallExpression" - jsonGet('url', para)
 *	2) "CallExpression" of an "AwaitExpression" - await jsonGet('url', para)
 */
function isCallExpression(expression) {
	if (expression.type === "CallExpression") {
		return expression;
	}

	if (expression.type === "AwaitExpression" && expression.argument.type === "CallExpression") {
		return expression.argument;
	}

	return undefined;
}

/*
 * Check if the "CallExpression" has the correct arguments
 */
function hasValidArguments(expression, restricted) {
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
			uniqueItems: true,
			minItems: 1,
			items: {
				type: "object",
				required: ["name", "args"],
				additionalProperties: false,
				properties: {
					name: {type: "string"},
					args: {
						type: "array",
						uniqueItems: true,
						minItems: 1,
						items: {
							type: "object",
							required: ["index", "name"],
							additionalProperties: false,
							properties: {
								index: {type: "number"},
								name: {type: "string"}
							}
						}
					}
				}
			}
		}
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
				// check if this is a function call
				const expression = isCallExpression(node.expression);
				if (!expression) {
					return;
				}

				// if the name of the function does not match, we are done
				if (!restricted.hasOwnProperty(expression.callee.name)) {
					return;
				}

				// validate the arguments
				if (!hasValidArguments(expression, restricted)) {
					context.report({
						node,
						message: 'The second argument in the function "' + expression.callee.name + '" must always be named "para"'
					});
				}
			}
		};
	}
};