import { apiVersionError } from "utils/ErrorHandler";
import { Route } from "../../utils";
import Auth from "../init/actions/Auth";

const routes: Route[] = [
	{
		path: "/auth/login",
		method: "POST",
		handler: [Auth, apiVersionError],
	},
];

export default routes;
