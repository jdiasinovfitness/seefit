"use strict";
var __assign =
	(this && this.__assign) ||
	function () {
		__assign =
			Object.assign ||
			function (t) {
				for (var s, i = 1, n = arguments.length; i < n; i++) {
					s = arguments[i];
					for (var p in s)
						if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
				}
				return t;
			};
		return __assign.apply(this, arguments);
	};
exports.__esModule = true;
var cors_1 = require("cors");
var express_1 = require("express");
var compression_1 = require("compression");
var utils_1 = require("../utils");
var i9r = function (req, res, next) {
	try {
		var apiVersion = utils_1.parseParam.number(req, "api-version");
		req.i9r = {
			apiVersion: apiVersion,
		};
		next();
	} catch (err) {
		next(err);
	}
};
var logRequest = function (req, res, next) {
	try {
		console.info(
			__assign({ method: req.method, url: req.originalUrl }, req.i9r),
		);
		next();
	} catch (err) {
		next(err);
	}
};
var handleCors = function (router) {
	router.use(cors_1["default"]({ credentials: true, origin: true }));
};
var handleBodyRequestParsing = function (router) {
	router.use(express_1["default"].json({ limit: "10mb" }));
	router.use(
		express_1["default"].urlencoded({ extended: true, limit: "10mb" }),
	);
};
var handleCompression = function (router) {
	router.use(compression_1["default"]());
};
var initialData = function (router) {
	router.use(i9r);
	router.use(logRequest);
};
exports["default"] = [
	handleCors,
	handleBodyRequestParsing,
	handleCompression,
	initialData,
];
