//TODO: ADD TYPES HERE

import { Location } from 'services/provider/Location';
import { UserOrigin } from 'services/provider/User';

const normalizeOrigins = (origins: UserOrigin[]) => {
	return origins.map(({ code, id }) => ({
		code,
		id,
	}));
};

const normalizePermissions = (permissions: any[]) => {
	return permissions.map(permission => {
		return {
			origin: permission.origin,
			apps: permission.apps.map((app: any) => ({
				appCode: app?.appCode,
				permissions: app?.permissions,
			})),
		};
	});
};

const normalizeLocations = (locations: Location[]) => {
	return locations.map(({ id, description, origin }) => ({
		locationId: id,
		locationName: description,
		origin,
	}));
};

export default {
	normalizeOrigins,
	normalizePermissions,
	normalizeLocations,
};
