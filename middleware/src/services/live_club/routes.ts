import { apiVersionError } from '../../utils/ErrorHandler';
import { Route } from '../../utils';
import PlannedInteractions from './actions_legacy/List_PlannedInteractions';
import InClubCustomer from './actions_legacy/List_InStoreCustomers';
import HealthRisk from './actions_legacy/List_HealthRisk';

const routes: Route[] = [
	{
		path: '/liveclub/interactions/planned',
		method: 'GET',
		handler: [PlannedInteractions, apiVersionError],
	},
	{
		path: '/liveclub/healthrisk',
		method: 'GET',
		handler: [HealthRisk, apiVersionError],
	},
	{
		path: '/liveclub/inclub',
		method: 'GET',
		handler: [InClubCustomer, apiVersionError],
	},
];

export default routes;
