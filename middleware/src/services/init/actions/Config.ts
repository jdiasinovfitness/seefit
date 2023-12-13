import UserProvider from '../../provider/User';
import { NextFunction, Request, Response } from 'express';
import LocationProvider from '../../provider/Location';
import NormalizeHelper, { NormalizedData } from '../../../helpers/Normalize';
import Authentication from '../../provider/Authentication';

interface ResponseResult {
	origin: string;
	apps: { appCode: string; permissions: Array<string> }[];
	locations: { locationName: string; locationId: string }[];
}

export default async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	console.info('GET /config');

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

		const organizedData: NormalizedData = {
			origins: NormalizeHelper.normalizeOrigins(userOrigins),
			permissions: NormalizeHelper.normalizePermissions(userPerms),
			locations: NormalizeHelper.normalizeLocations(detailedLocations),
		};

		let newResponse: ResponseResult[] = [];

		for (const origin of organizedData.origins) {
			let apps: ResponseResult['apps'] = [];

			const matchedPerms = organizedData.permissions.find(
				permission => permission.origin === origin.id
			);

			const matchedLocations = organizedData.locations.filter(
				location => location.origin === origin.id
			);

			matchedPerms?.apps.forEach(app => {
				if (!app.permissions.appCode) return;

				apps.push({
					permissions: app.permissions.codes,
					appCode: app.permissions.appCode,
				});
			});

			const locations = matchedLocations.map(location => ({
				locationId: location.locationId,
				locationName: location.locationName,
			}));

			const newResponseObj: ResponseResult = {
				apps,
				origin: origin.id,
				locations,
			};

			newResponse.push(newResponseObj);
		}

		res.status(200).send(newResponse);
	} catch (err) {
		console.error(err);
		next(err);
	}
};
