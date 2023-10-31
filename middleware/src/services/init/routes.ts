import { apiVersionError } from '../../utils/ErrorHandler';
import { Route } from '../../utils';
import Auth from './actions/Auth';
import Config from './actions/Config';

const routes: Route[] = [
	{
		path: '/auth/login',
		method: 'POST',
		handler: [Auth, apiVersionError],
	},
	{
		path: '/config',
		method: 'GET',
		handler: [Config, apiVersionError],
	},
];

export default routes;
