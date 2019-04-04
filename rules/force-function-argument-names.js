/**
 * @fileoverview Rule to enforce the parameter given to the json* API to be named "para"
 * @author Dieter Oberkofler
 */

"use strict";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const functionNames = ['jsonGet', 'jsonGetSuccess', 'jsonPost', 'jsonPostSuccess'];

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
		schema: [] // no options
	},
	create(context) {
		return {
			ExpressionStatement(node) {
				const expression = node.expression;

				/*
				 * Invoking a function named "jsonGet" with 2 arguments and the second argument does not have the name "para"
				 */
				if (expression.type === "CallExpression" && functionNames.indexOf(expression.callee.name) !== -1 && expression.arguments.length === 2 && expression.arguments[1].name !== 'para') {
					context.report({
						node,
						message: 'The second argument in the function "' + expression.callee.name + '" must always be named "para"'
					});
				}
			}
		};
	}
};