"use strict";
var __extends =
	(this && this.__extends) ||
	(function () {
		var extendStatics = function (d, b) {
			extendStatics =
				Object.setPrototypeOf ||
				({ __proto__: [] } instanceof Array &&
					function (d, b) {
						d.__proto__ = b;
					}) ||
				function (d, b) {
					for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
				};
			return extendStatics(d, b);
		};
		return function (d, b) {
			extendStatics(d, b);
			function __() {
				this.constructor = d;
			}
			d.prototype =
				b === null
					? Object.create(b)
					: ((__.prototype = b.prototype), new __());
		};
	})();
exports.__esModule = true;
exports.processAPIError =
	exports.ServerError =
	exports.ConflictError =
	exports.NotFoundError =
	exports.ForbiddenError =
	exports.UnauthorizedError =
	exports.UnauthorizedResourceError =
	exports.RequestError =
	exports.HTTPClientError =
		void 0;
var axios_1 = require("axios");
var HTTPClientError = /** @class */ (function (_super) {
	__extends(HTTPClientError, _super);
	function HTTPClientError(message) {
		var _this = this;
		if (message) {
			_this = _super.call(this, JSON.stringify(message)) || this;
		} else {
			_this = _super.call(this) || this;
		}
		_this.name = _this.constructor.name;
		Error.captureStackTrace(_this, _this.constructor);
		return _this;
	}
	return HTTPClientError;
})(Error);
exports.HTTPClientError = HTTPClientError;
var RequestError = /** @class */ (function (_super) {
	__extends(RequestError, _super);
	function RequestError(message) {
		var _this =
			_super.call(this, {
				type: "RequestError",
				error: { message: message },
			}) || this;
		_this.statusCode = 400;
		return _this;
	}
	return RequestError;
})(HTTPClientError);
exports.RequestError = RequestError;
var UnauthorizedResourceError = /** @class */ (function (_super) {
	__extends(UnauthorizedResourceError, _super);
	function UnauthorizedResourceError(resource, value) {
		var _this =
			_super.call(this, {
				type: "UnauthorizedResourceError",
				error: { resource: resource, value: value },
			}) || this;
		_this.statusCode = 401;
		return _this;
	}
	return UnauthorizedResourceError;
})(HTTPClientError);
exports.UnauthorizedResourceError = UnauthorizedResourceError;
var UnauthorizedError = /** @class */ (function (_super) {
	__extends(UnauthorizedError, _super);
	function UnauthorizedError() {
		var _this = _super.call(this) || this;
		_this.statusCode = 401;
		return _this;
	}
	return UnauthorizedError;
})(HTTPClientError);
exports.UnauthorizedError = UnauthorizedError;
var ForbiddenError = /** @class */ (function (_super) {
	__extends(ForbiddenError, _super);
	function ForbiddenError() {
		var _this = _super.call(this) || this;
		_this.statusCode = 403;
		return _this;
	}
	return ForbiddenError;
})(HTTPClientError);
exports.ForbiddenError = ForbiddenError;
var NotFoundError = /** @class */ (function (_super) {
	__extends(NotFoundError, _super);
	function NotFoundError() {
		var _this = _super.call(this) || this;
		_this.statusCode = 404;
		return _this;
	}
	return NotFoundError;
})(HTTPClientError);
exports.NotFoundError = NotFoundError;
var ConflictError = /** @class */ (function (_super) {
	__extends(ConflictError, _super);
	function ConflictError(resource, value) {
		var _this =
			_super.call(this, {
				type: "ConflictError",
				error: { resource: resource, value: value },
			}) || this;
		_this.statusCode = 409;
		return _this;
	}
	return ConflictError;
})(HTTPClientError);
exports.ConflictError = ConflictError;
var ServerError = /** @class */ (function (_super) {
	__extends(ServerError, _super);
	function ServerError(message) {
		var _this =
			_super.call(this, {
				type: "ServerError",
				error: { message: message },
			}) || this;
		_this.statusCode = 500;
		return _this;
	}
	return ServerError;
})(HTTPClientError);
exports.ServerError = ServerError;
exports.processAPIError = function (err) {
	var _a, _b, _c, _d, _e, _f;
	if (axios_1["default"].isAxiosError(err) && err.response) {
		if (err.response.status == 401) {
			return new UnauthorizedError();
		} else if (err.response.status == 403) {
			return new ForbiddenError();
		} else if (err.response.status == 404) {
			return new NotFoundError();
		} else if (err.response.status == 409) {
			return new ConflictError(
				((_b =
					(_a = err.response.data) === null || _a === void 0
						? void 0
						: _a.error) === null || _b === void 0
					? void 0
					: _b.resource) || "Undefined",
				((_d =
					(_c = err.response.data) === null || _c === void 0
						? void 0
						: _c.error) === null || _d === void 0
					? void 0
					: _d.value) || "Undefined",
			);
		} else if (err.response.status == 400) {
			return new RequestError(
				((_f =
					(_e = err.response.data) === null || _e === void 0
						? void 0
						: _e.error) === null || _f === void 0
					? void 0
					: _f.message) || "Undefined",
			);
		} else {
			return new RequestError(err.response.data);
		}
	} else if (axios_1["default"].isAxiosError(err) && err.request) {
		return new ServerError(err.request.url);
	} else {
		return new RequestError(err.message);
	}
};
