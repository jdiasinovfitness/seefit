import axios from "axios";

export abstract class HTTPClientError extends Error {
	readonly statusCode!: number;
	readonly name!: string;

	constructor(message?: object) {
		if (message) {
			super(JSON.stringify(message));
		} else {
			super();
		}
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class RequestError extends HTTPClientError {
	readonly statusCode = 400;

	constructor(message: string) {
		super({
			type: "RequestError",
			error: { message },
		});
	}
}

export class UnauthorizedResourceError extends HTTPClientError {
	readonly statusCode = 401;

	constructor(resource: string, value: string) {
		super({
			type: "UnauthorizedResourceError",
			error: { resource, value },
		});
	}
}

export class UnauthorizedError extends HTTPClientError {
	readonly statusCode = 401;

	constructor() {
		super();
	}
}

export class ForbiddenError extends HTTPClientError {
	readonly statusCode = 403;

	constructor() {
		super();
	}
}

export class NotFoundError extends HTTPClientError {
	readonly statusCode = 404;

	constructor() {
		super();
	}
}

export class NotFoundResourceError extends HTTPClientError {
	readonly statusCode = 404;

	constructor(resource: string, value: string | undefined) {
		super({
			type: "NotFoundResourceError",
			error: { resource, value },
		});
	}
}

export class ConflictError extends HTTPClientError {
	readonly statusCode = 409;

	constructor(resource: string, value: string) {
		super({
			type: "ConflictError",
			error: { resource, value },
		});
	}
}

export class ServerError extends HTTPClientError {
	readonly statusCode = 500;

	constructor(message: string) {
		super({
			type: "ServerError",
			error: { message },
		});
	}
}

export const processAPIError = (
	err: unknown,
	data?: { resource: string; value: string },
) => {
	if (axios.isAxiosError(err) && err.response) {
		if (err.response.status == 401) {
			return new UnauthorizedError();
		} else if (err.response.status == 403) {
			return new ForbiddenError();
		} else if (err.response.status == 404) {
			if (data) {
				return new NotFoundResourceError(data.resource, data.value);
			} else {
				return new NotFoundError();
			}
		} else if (err.response.status == 409) {
			return new ConflictError(
				err.response.data?.error?.resource || "Undefined",
				err.response.data?.error?.value || "Undefined",
			);
		} else if (err.response.status == 400) {
			return new RequestError(err.response.data?.error?.message || "Undefined");
		} else {
			return new RequestError(err.response.data);
		}
	} else if (axios.isAxiosError(err) && err.request) {
		return new ServerError(err.request.url);
	} else {
		return new RequestError((err as Error).message);
	}
};
