import { Route } from "../../utils";

import Auth from "./actions/Auth";

const routes: Route[] = [
	{
		path: "/auth/login",
		method: "POST",
		handler: [Auth],
	},
];

export default routes;
