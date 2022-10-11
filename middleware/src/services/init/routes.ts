import { Route } from "../../utils";

import Auth from "./actions/auth";

const routes: Route[] = [
	{
		path: "/auth/login",
		method: "POST",
		handler: [Auth],
	},
];

export default routes;
