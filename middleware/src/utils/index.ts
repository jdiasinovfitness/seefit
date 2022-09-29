import { Router, Request, Response, NextFunction } from "express";
import * as Err from "./httpErrors";

export const error = Err;
type Wrapper = (router: Router) => void;

export const applyMiddleware = (
	middlewareWrappers: Wrapper[],
	router: Router,
): void => {
	for (const wrapper of middlewareWrappers) {
		wrapper(router);
	}
};

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type Handler = (
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<void> | void;

export type Route = {
	path: string;
	method: HTTPMethod;
	handler: Handler | Handler[];
};

export const applyRoutes = (routes: Route[], router: Router): void => {
	for (const route of routes) {
		const { method, path, handler } = route;

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
				router.delete(path, handler);
				break;
			case "PATCH":
				router.patch(path, handler);
				break;
		}
	}
};

export const parseParam = {
	date: (req: Request, name: string): Date => {
		const value = req.query[name] as string;
		try {
			const val = new Date(value);
			if (!isNaN(val.getTime())) {
				return val;
			} else {
				throw "";
			}
		} catch {
			throw new Err.RequestError(`Invalid parameter ${name}: ${value}`);
		}
	},
	number: (req: Request, name: string): number => {
		const value = req.query[name] as string;
		try {
			const val = parseInt(value, 10);
			if (!isNaN(val)) {
				return val;
			} else {
				throw "";
			}
		} catch {
			throw new Err.RequestError(`Invalid parameter ${name}: ${value}`);
		}
	},
	string: (req: Request, name: string): string => {
		const value = req.query[name] as string;
		if (value != null) {
			return value;
		}
		throw new Err.RequestError(`Invalid parameter ${name}: ${value}`);
	},
};
