import UserProvider from '../../provider/User';
import { NextFunction, Request, Response } from 'express';
import LocationProvider from '../../provider/Location';
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

	try {
		// const decodedToken = await Authentication.decodeToken(authToken);
		// const userId = decodedToken.payload['user-id'];

		const userId = '5c51de7120cc4509e2e941e5';

		const userOrigins = await UserProvider.getUserOrigins(userId, authToken);
		const userPerms = await UserProvider.getUserPermissions(userId, authToken);
		const userLocations = await UserProvider.getUserLocations(authToken, userId);

		const locations = [];
		for (const { location } of userLocations) {
			console.log('location', location);
			const locationDetails = LocationProvider.locationsDetails(
				authToken,
				location
			);
			locations.push(locationDetails);
		}

		const detailedLocations = await Promise.all(locations);

		const response = {
			origins: NormalizeHelper.normalizeOrigins(userOrigins),
			permissions: NormalizeHelper.normalizePermissions(userPerms),
			locations: NormalizeHelper.normalizeLocations(detailedLocations),
		};

		res.status(200).send(response);
	} catch (err) {
		console.log('THIS IS THE ERROR', err);
		next(err);
	}
};
