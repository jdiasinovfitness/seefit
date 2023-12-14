import { NextFunction, Request, Response } from 'express';
import AuthProvider from '../../provider/Authentication';

export default async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		console.log('POST /auth/refresh');
		const authorization = req.headers['authorization'] as string;
		const refreshResponse = await AuthProvider.refreshLoginToken(authorization);
		res.status(200).send(refreshResponse);
		return;
	} catch (err) {
		console.log(err);
		next(err);
	}
};
