import { NextFunction, Request, Response } from 'express';
import AuthProvider from '../../provider/Authentication';
import UserProvider from '../../provider/User';

interface ILoginResponse {
	accessToken: string;
	refreshToken: string;
	userId: string;
	language: string;
	name: string;
	pluginResult?: string;
}

export default async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		console.log('POST /auth/login');
		const authorization = req.headers['authorization'] as string;
		const loginResponse = await AuthProvider.login(authorization);
		const authToken = 'Bearer ' + loginResponse.accessToken;
		const userInfo = await UserProvider.userProfile(authToken);

		const user: ILoginResponse = {
			userId: loginResponse.user,
			accessToken: loginResponse.accessToken,
			refreshToken: loginResponse.refreshToken,
			language: userInfo.language || 'pt',
			name: userInfo.name,
			pluginResult: loginResponse.pluginResult,
		};
		res.status(200).send(user);

		return;
	} catch (err) {
		console.log(err);
		next(err);
	}
};
