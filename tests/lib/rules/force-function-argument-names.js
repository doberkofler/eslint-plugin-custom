'use strict'

const rule = require('../../../lib/rules/force-function-argument-names')
const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester({
	parserOptions: {
		ecmaVersion: 2018
	}
})

const options = [
	{
		name: "jsonGet",
		args: [{index: 1, name: "para"}]
	},
	{
		name: "jsonGetSuccess",
		args: [{index: 1, name: "para"}]
	},
	{
		name: "jsonGetValidate",
		args: [{index: 1, name: "para"}]
	},
	{
		name: "jsonPost",
		args: [{index: 1, name: "para"}]
	},
	{
		name: "jsonPostSuccess",
		args: [{index: 1, name: "para"}]
	},
	{
		name: "jsonPostValidate",
		args: [{index: 1, name: "para"}]
	},
	{
		name: "jsonPostMessage",
		args: [{index: 1, name: "para"}]
	},
];

const validCode = [
	'jsonGet("url");',
	'jsonGet("url", {});',
	'jsonGet("url", para);',
	'jsonGetSuccess("url");',
	'jsonGetSuccess("url", para);',
	'jsonGetValidate("url");',
	'jsonGetValidate("url", para);',
	'jsonPost("url");',
	'jsonPost("url", para);',
	'jsonPostSuccess("url");',
	'jsonPostSuccess("url", para);',
	'jsonPostValidate("url");',
	'jsonPostValidate("url", para);',
	'jsonPostMessage("url");',
	'jsonPostMessage("url", para);',
	'some("1");',
	'some("1", "2");',
	'some("1", "2", "3");',
	'object.jsonGet("url", data);',
	'async function foo() {await jsonGet("url");}',
	'async function foo() {await jsonGet("url", {});}',
];

ruleTester.run('force-function-argument-names', rule, {
	valid: validCode.map(code => ({code, options})),
	invalid: [
		'jsonGet',
		'jsonGetSuccess',
		'jsonGetValidate',
		'jsonPost',
		'jsonPostSuccess',
		'jsonPostValidate',
		'jsonPostMessage',
	].reduce((prev, curr) => {
		prev.push({
			code: `${curr}("url", data);`,
			options,
			errors: [{message: `The second argument in the function "${curr}" must always be named "para"`}]
		});

		prev.push({
			code: `async function foo() {await ${curr}("url", data);}`,
			options,
			errors: [{message: `The second argument in the function "${curr}" must always be named "para"`}]
		});
	
		return prev;
	}, [])
})
