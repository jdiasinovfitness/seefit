import UserProvider from '../../provider/User';
import { NextFunction, Request, Response } from 'express';
import LocationProvider from '../../provider/Location';
import NormalizeHelper from '../../../helpers/Normalize';
import Authentication from '../../provider/Authentication';

interface ResponseResult {
	origin: string;
	permissions: Array<string>;
	appCode: string;
	locations: { locationName: string; locationId: string }[];
}

export default async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const authToken = req.headers['authorization'] as string;

	try {
		const decodedToken = await Authentication.decodeToken(authToken);
		console.log(decodedToken);
		// const userId = decodedToken.payload['user-id'];
		const userId = '5c51de7120cc4509e2e941e5';

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

		const organizedData = {
			origins: NormalizeHelper.normalizeOrigins(userOrigins),
			permissions: NormalizeHelper.normalizePermissions(userPerms),
			locations: NormalizeHelper.normalizeLocations(detailedLocations),
		};

		let newResponse: ResponseResult[] = [];

		for (const origin of organizedData.origins) {
			const matchedPerms = organizedData.permissions.find(
				permission => permission.origin === origin.id
			);
			const matchedLocations = organizedData.locations.filter(
				location => location.origin === origin.id
			);

			const permissions = matchedPerms
				? matchedPerms.apps.map(app => app.permissions).flat()
				: [];

			const appCode = matchedPerms?.apps[1]?.appCode || undefined;

			const locations = matchedLocations.map(location => ({
				locationId: location.locationId,
				locationName: location.locationName,
			}));

			const newResponseObj: ResponseResult = {
				origin: origin.id,
				permissions: permissions,
				appCode: appCode ?? '',
				locations: locations,
			};

			newResponse.push(newResponseObj);
		}

		res.status(200).send(newResponse);
	} catch (err) {
		console.log('Error: ', err);
		next(err);
	}
};
