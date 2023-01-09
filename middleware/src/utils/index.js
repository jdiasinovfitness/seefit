"use strict";
exports.__esModule = true;
exports.parseParam =
	exports.applyRoutes =
	exports.applyMiddleware =
	exports.error =
		void 0;
var Err = require("./httpErrors");
exports.error = Err;
exports.applyMiddleware = function (middlewareWrappers, router) {
	for (
		var _i = 0, middlewareWrappers_1 = middlewareWrappers;
		_i < middlewareWrappers_1.length;
		_i++
	) {
		var wrapper = middlewareWrappers_1[_i];
		wrapper(router);
	}
};
exports.applyRoutes = function (routes, router) {
	for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
		var route = routes_1[_i];
		var method = route.method,
			path = route.path,
			handler = route.handler;
		switch (method) {
			case "GET":
				router.get(path, handler);
				break;
			case "POST":
				router.post(path, handler);
				break;
			case "PUT":
				router.put(path, handler);
				break;
			case "DELETE":
				router["delete"](path, handler);
				break;
			case "PATCH":
				router.patch(path, handler);
				break;
		}
	}
};
exports.parseParam = {
	date: function (req, name) {
		var value = req.query[name];
		try {
			var val = new Date(value);
			if (!isNaN(val.getTime())) {
				return val;
			} else {
				throw "";
			}
		} catch (_a) {
			throw new Err.RequestError("Invalid parameter " + name + ": " + value);
		}
	},
	number: function (req, name) {
		var value = req.query[name];
		try {
			var val = parseInt(value, 10);
			if (!isNaN(val)) {
				return val;
			} else {
				throw "";
			}
		} catch (_a) {
			throw new Err.RequestError("Invalid parameter " + name + ": " + value);
		}
	},
	string: function (req, name) {
		var value = req.query[name];
		if (value != null) {
			return value;
		}
		throw new Err.RequestError("Invalid parameter " + name + ": " + value);
	},
};
