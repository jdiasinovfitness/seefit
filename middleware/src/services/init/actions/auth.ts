import { NextFunction, Request, Response } from "express";
import AuthProvider from "../../provider/Auth";
import UserProvider from "../../provider/User";

interface UserInitialInfo {
	id: string;
	acessToken: string;
	refreshToken: string;
	name?: string;
	email: string;
}
export default async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const authorization = req.headers["authorization"] as string;
		const loginResponse = await AuthProvider.login(req, authorization);

		const authToken = "Bearer " + loginResponse.accessToken;

		const userInfo = await UserProvider.userProfile(authToken);

		const user: UserInitialInfo = {
			id: loginResponse.user,
			acessToken: loginResponse.accessToken,
			refreshToken: loginResponse.refreshToken,
			name: userInfo.name,
			email: userInfo.email,
		};
		res.status(200).send(user);

		return;
	} catch (err) {
		next(err);
	}
};
