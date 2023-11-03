//TODO: ADD TYPES HERE

const normalizeOrigins = (origins: any[]) => {
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

export default {
	normalizeOrigins,
	normalizePermissions,
};
