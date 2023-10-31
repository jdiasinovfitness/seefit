import UserProvider from '../../provider/User';
import { NextFunction, Request, Response } from 'express';
import Authentication from 'services/provider/Authentication';

type KeyValue = { [key: string]: any };

export default async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const authToken = req.headers['authorization'] as string;
	console.log('auth header: ', authToken);

	try {
		const decodedToken: KeyValue = Authentication.decodeToken(authToken);
		const userId = decodedToken['user-id'];

		console.log('userid & decoded token ', userId, decodedToken);

		const origin = '5c51c934737aaa0016733c00';

		const userOrigins = await UserProvider.getUserOrigins(userId, authToken);
		const userPerms = await UserProvider.getUserPermissions(userId, authToken);
		const userLocations = await UserProvider.getUserLocations(
			authToken,
			userId,
			origin
		);

		const response = {
			origins: userOrigins,
			permissions: userPerms,
			locations: userLocations,
		};

		res.status(200).send(response);
	} catch (err) {
		console.log('THIS IS THE ERROR', err);
		next(err);
	}
};
