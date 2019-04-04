'use strict'

const rule = require('../rules/force-function-argument-names')
const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester({
  parserOptions: {
	ecmaVersion: 6
  }
})

ruleTester.run('force-function-argument-names', rule, {
  valid: [
	'jsonGet("url");',
	'jsonGet("url", para);',
	'jsonPost("url");',
	'jsonPost("url", para);',
	'jsonGetSuccess("url");',
	'jsonGetSuccess("url", para);',
	'jsonPostSuccess("url");',
	'jsonPostSuccess("url", para);',
  ],

  invalid: [
	{
		code: 'jsonGet("url", data);',
		errors: [{ message: 'The second argument in the function "jsonGet" must always be named "para"' }]
	},
	{
		code: 'jsonPost("url", data);',
		errors: [{ message: 'The second argument in the function "jsonPost" must always be named "para"' }]
	},
	{
		code: 'jsonGetSuccess("url", data);',
		errors: [{ message: 'The second argument in the function "jsonGetSuccess" must always be named "para"' }]
	},
	{
		code: 'jsonPostSuccess("url", data);',
		errors: [{ message: 'The second argument in the function "jsonPostSuccess" must always be named "para"' }]
	},
	]
})
