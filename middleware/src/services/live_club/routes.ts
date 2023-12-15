import { apiVersionError } from '../../utils/ErrorHandler';
import { Route } from '../../utils';
import InClubCustomer from './actions_legacy/List_InStoreCustomers';
import HealthRisk from './actions_legacy/List_HealthRisk';
import List_AllCustomers from './actions_legacy/List_AllCustomers';

const routes: Route[] = [
	{
		path: '/liveclub/interactions/planned',
		method: 'GET',
		handler: [List_AllCustomers, apiVersionError],
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
