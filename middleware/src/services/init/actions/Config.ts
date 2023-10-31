import UserProvider from '../../provider/User';
import { NextFunction, Request, Response } from 'express';

export default async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const authToken = req.headers['authorization'] as string;
	console.log('auth header: ', authToken);

	try {
		const testId = '5c51de7120cc4509e2e941e5';
		const origin = '5c51c934737aaa0016733c00';

		const userOrigins = await UserProvider.getUserOrigins(testId, authToken);
		const userPerms = await UserProvider.getUserPermissions(testId, authToken);
		const userLocations = await UserProvider.getUserLocations(
			authToken,
			testId,
			origin
		);

		const response = {
			origins: userOrigins,
			permissions: userPerms,
			locations: userLocations,
		};

		console.log(response);

		res.status(200).send(response);
	} catch (err) {
		console.log('THIS IS THE ERROR', err);
		next(err);
	}
};
