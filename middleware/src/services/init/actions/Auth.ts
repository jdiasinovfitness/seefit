import { NextFunction, Request, Response } from 'express';
import AuthProvider from '../../provider/Authentication';
import UserProvider from '../../provider/User';

interface ILoginResponse {
	accessToken: string;
	refreshToken: string;
	userId: string;
	language: string;
}
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
	next: NextFunction
): Promise<void> => {
	try {
		const authorization = req.headers['authorization'] as string;
		const loginResponse = await AuthProvider.login(req, authorization);

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
