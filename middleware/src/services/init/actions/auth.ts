import { NextFunction, Request, Response } from "express";

export default async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	console.log("Middleware");
	return Promise.resolve();
};
