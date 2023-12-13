import { apiVersionError } from '../../utils/ErrorHandler';
import { Route } from '../../utils';
import Auth from './actions/Auth';
import Config from './actions/Config';
import Refresh_Auth from './actions/Refresh_Auth';

const routes: Route[] = [
	{
		path: '/auth/login',
		method: 'POST',
		handler: [Auth, apiVersionError],
	},
	{
		path: '/auth/refresh',
		method: 'POST',
		handler: [Refresh_Auth, apiVersionError],
	},
	{
		path: '/config',
		method: 'GET',
		handler: [Config, apiVersionError],
	},
];

export default routes;
