import { apiVersionError } from '../../utils/ErrorHandler';
import { Route } from '../../utils';
import Auth from './actions/Auth';
import Interactions from './actions/Interactions';

const routes: Route[] = [
	{
		path: '/auth/login',
		method: 'POST',
		handler: [Auth, apiVersionError],
	},
	{
		path: '/customer-interactions',
		method: 'GET',
		handler: [Interactions, apiVersionError],
	},
];

export default routes;
