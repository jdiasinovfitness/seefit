import UserProvider from '../../provider/User';
import { NextFunction, Request, Response } from 'express';

import NormalizeHelper from '../../../helpers/Normalize';

export interface DecodedToken {
	payload: {
		'user-id': string;
		origins: string;
	};
	iat: number;
	exp: number;
	iss: string;
}

export default async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const authToken = req.headers['authorization'] as string;
	const origin = req.headers['origin'] as string;

	try {
		// const decodedToken = await Authentication.decodeToken(authToken);
		// const userId = decodedToken.payload['user-id'];

		const userId = '5c51de7120cc4509e2e941e5';
		const origin = '5e418b022ae91039d2da361f';

		const userOrigins = await UserProvider.getUserOrigins(userId, authToken);
		// for each origin get the perms and locations

		let locationPromises = [];
		for (const origin of userOrigins) {
			const userLocations = UserProvider.getUserLocations(
				authToken,
				userId,
				origin.id
			);

			locationPromises.push(userLocations);
		}

		const userLocations = await Promise.all(locationPromises);
		console.log('USER LOCATIONS ->', userLocations);

		const userPerms = await UserProvider.getUserPermissions(userId, authToken);
		const response = {
			origins: NormalizeHelper.normalizeOrigins(userOrigins),
			permissions: NormalizeHelper.normalizePermissions(userPerms),
			locations: userLocations,
		};

		res.status(200).send(response);
	} catch (err) {
		console.log('THIS IS THE ERROR', err);
		next(err);
	}
};
