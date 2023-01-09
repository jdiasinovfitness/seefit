"use strict";
exports.__esModule = true;
var ErrorHandler_1 = require("../utils/ErrorHandler");
var handle404Error = function (router) {
	router.use(function () {
		ErrorHandler_1.notFoundError();
	});
};
var handleClientError = function (router) {
	router.use(function (err, req, res, next) {
		ErrorHandler_1.clientError(err, res, next);
	});
};
var handleServerError = function (router) {
	router.use(function (err, req, res) {
		ErrorHandler_1.serverError(err, res);
	});
};
exports["default"] = [handle404Error, handleClientError, handleServerError];
