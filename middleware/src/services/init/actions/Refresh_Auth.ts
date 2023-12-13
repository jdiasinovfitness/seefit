import { NextFunction, Request, Response } from 'express';
import AuthProvider from '../../provider/Authentication';
import UserProvider from '../../provider/User';

export default async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const authorization = req.headers['authorization'] as string;

		res.status(200).send(user);

		return;
	} catch (err) {
		next(err);
	}
};
