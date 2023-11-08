import { Location } from '../services/provider/Location';
import {
	Permission,
	PermissionApp,
	UserOrigin,
} from '../services/provider/User';

export interface NormalizedData {
	origins: { code: string; id: string }[];
	permissions: {
		origin: string;
		apps: {
			permissions: {
				appCode: string;
				codes: string[];
			};
		}[];
	}[];
	locations: { locationName: string; locationId: string; origin: string }[];
}
const normalizeOrigins = (origins: UserOrigin[]) => {
	return origins.map(({ code, id }) => ({
		code,
		id,
	}));
};

const normalizePermissions = (permissions: Permission[]) => {
	return permissions.map(permission => {
		return {
			origin: permission.origin,
			apps: permission.apps.map((app: PermissionApp) => {
				console.log('APP CODE -> ', app?.appCode);
				return {
					permissions: {
						appCode: app?.appCode,
						codes: app?.permissions,
					},
				};
			}),
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
