'use strict'

const rule = require('../../../lib/rules/force-function-argument-names')
const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester({
	parserOptions: {
		ecmaVersion: 6
	}
})

const defaultOptions = [
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

ruleTester.run('force-function-argument-names', rule, {
	valid: [
		{
			code: 'some("1");',
			options: defaultOptions,

		},
		{
			code: 'some("1", "2");',
			options: defaultOptions,

		},
		{
			code: 'some("1", "2", "3");',
			options: defaultOptions,

		},
		{
			code: 'object.jsonGet("url", data);',
			options: defaultOptions,

		},
		{
			code: 'jsonGet("url");',
			options: defaultOptions,

		},
		{
			code: 'jsonGet("url", {});',
			options: defaultOptions,

		},
		{
			code: 'jsonGet("url", para);',
			options: defaultOptions,

		},
		{
			code: 'jsonGetSuccess("url");',
			options: defaultOptions,

		},
		{
			code: 'jsonGetSuccess("url", para);',
			options: defaultOptions,

		},
		{
			code: 'jsonGetValidate("url");',
			options: defaultOptions,

		},
		{
			code: 'jsonGetValidate("url", para);',
			options: defaultOptions,

		},
		{
			code: 'jsonPost("url");',
			options: defaultOptions,

		},
		{
			code: 'jsonPost("url", para);',
			options: defaultOptions,

		},
		{
			code: 'jsonPostSuccess("url");',
			options: defaultOptions,

		},
		{
			code: 'jsonPostSuccess("url", para);',
			options: defaultOptions,

		},
		{
			code: 'jsonPostValidate("url");',
			options: defaultOptions,

		},
		{
			code: 'jsonPostValidate("url", para);',
			options: defaultOptions,

		},
		{
			code: 'jsonPostMessage("url");',
			options: defaultOptions,

		},
		{
			code: 'jsonPostMessage("url", para);',
			options: defaultOptions,

		},
	],

	invalid: [
		{
			code: 'jsonGet("url", data);',
			options: defaultOptions,
			errors: [{message: 'The second argument in the function "jsonGet" must always be named "para"'}]
		},
		{
			code: 'jsonGetSuccess("url", data);',
			options: defaultOptions,
			errors: [{message: 'The second argument in the function "jsonGetSuccess" must always be named "para"'}]
		},
		{
			code: 'jsonGetValidate("url", data);',
			options: defaultOptions,
			errors: [{message: 'The second argument in the function "jsonGetValidate" must always be named "para"'}]
		},
		{
			code: 'jsonPost("url", data);',
			options: defaultOptions,
			errors: [{message: 'The second argument in the function "jsonPost" must always be named "para"'}]
		},
		{
			code: 'jsonPostSuccess("url", data);',
			options: defaultOptions,
			errors: [{message: 'The second argument in the function "jsonPostSuccess" must always be named "para"'}]
		},
		{
			code: 'jsonPostValidate("url", data);',
			options: defaultOptions,
			errors: [{message: 'The second argument in the function "jsonPostValidate" must always be named "para"'}]
		},
		{
			code: 'jsonPostMessage("url", data);',
			options: defaultOptions,
			errors: [{message: 'The second argument in the function "jsonPostMessage" must always be named "para"'}]
		},
	]
})
