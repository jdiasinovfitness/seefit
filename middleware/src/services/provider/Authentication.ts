import axios from 'axios';
import { Request } from 'express';
import { processAPIError } from '../../utils/httpErrors';
import jwt from 'jsonwebtoken';

interface AuthInfo {
	accessToken: string;
	refreshToken: string;
	user: string;
}
const login = async (req: Request, token: string): Promise<AuthInfo> => {
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

const decodeToken = async (token: string) => {
	if (token.startsWith('Bearer ')) token = token.slice(7);

	try {
		const decoded = jwt.decode(token);
		return decoded;
	} catch (error) {
		throw new Error('Failed to decode token');
	}
};

export default {
	login,
	decodeToken,
};
