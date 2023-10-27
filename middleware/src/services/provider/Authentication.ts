import axios from 'axios';
import { Request } from 'express';
import { processAPIError } from '../../utils/httpErrors';

interface AuthInfo {
	accessToken: string;
	refreshToken: string;
	user: string;
}
const login = async (req: Request, token: string): Promise<AuthInfo> => {
	console.log('login was called', req.body, token);

	try {
		const response = await axios.request({
			method: 'POST',
			url: `${process.env.API_GATEWAY}/auth/login`,
			headers: {
				authorization: token,
			},
			params: {
				'api-version': '1',
			},
			responseType: 'json',
		});

		return response.data;
	} catch (err) {
		throw processAPIError(err);
	}
};

export default {
	login,
};
