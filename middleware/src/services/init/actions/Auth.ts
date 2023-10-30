import { NextFunction, Request, Response } from 'express';
import AuthProvider from '../../provider/Authentication';
import UserProvider from '../../provider/User';

interface ILoginResponse {
	accessToken: string;
	refreshToken: string;
	userId: string;
	language: string;
}

export default async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const authorization = req.headers['authorization'] as string;
		console.log('Authorization', authorization);
		const loginResponse = await AuthProvider.login(req, authorization);
		console.log(loginResponse.accessToken);
		const authToken = 'Bearer ' + loginResponse.accessToken;
		const userInfo = await UserProvider.userProfile(authToken);

		const user: ILoginResponse = {
			userId: loginResponse.user,
			accessToken: loginResponse.accessToken,
			refreshToken: loginResponse.refreshToken,
			language: userInfo.language || 'pt',
		};

		res.status(200).send(user);

		return;
	} catch (err) {
		next(err);
	}
};
