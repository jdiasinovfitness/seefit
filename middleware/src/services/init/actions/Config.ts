import UserProvider from '../../provider/User';
import { NextFunction, Request, Response } from 'express';
import LocationProvider from '../../provider/Location';
import NormalizeHelper from '../../../helpers/Normalize';
import Authentication from '../../provider/Authentication';

export default async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const authToken = req.headers['authorization'] as string;

	try {
		const decodedToken = await Authentication.decodeToken(authToken);
		const userId = decodedToken.payload['user-id'];

		const userOrigins = await UserProvider.getUserOrigins(userId, authToken);
		const userPerms = await UserProvider.getUserPermissions(userId, authToken);
		const userLocations = await UserProvider.getUserLocations(authToken, userId);

		const locations = [];
		for (const { location } of userLocations) {
			try {
				const locationDetails = await LocationProvider.locationsDetails(
					authToken,
					location
				);

				locations.push(locationDetails);
			} catch (error) {
				continue;
			}
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
