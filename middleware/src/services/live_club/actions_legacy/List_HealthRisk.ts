import { NextFunction, Request, Response } from 'express';

export default async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		res.status(204).end();
		return;
	} catch (err) {
		console.log(err);
		next(err);
	}
};
