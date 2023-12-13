import axios from 'axios';
import { Request } from 'express';
import { processAPIError } from '../../utils/httpErrors';
import jwt from 'jsonwebtoken';

export interface DecodedToken {
	payload: {
		'user-id': string;
		origins: string;
	};
	iat: number;
	exp: number;
	iss: string;
}
interface AuthInfo {
	accessToken: string;
	refreshToken: string;
	user: string;
}

export interface IRefreshResponse {
	access_token: string;
}
const login = async (token: string): Promise<AuthInfo> => {
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

const refreshLoginToken = async (token: string): Promise<IRefreshResponse> => {
	try {
		const response = await axios.request({
			method: 'POST',
			url: `${process.env.API_GATEWAY}/login/refresh`,
			headers: {
				authorization: token,
			},
			responseType: 'json',
		});
		return response.data;
	} catch (err) {
		throw processAPIError(err);
	}
};

const decodeToken = async (token: string): Promise<DecodedToken> => {
	if (token.startsWith('Bearer ')) token = token.slice(7);

	try {
		const decoded = jwt.decode(token);
		return decoded as DecodedToken;
	} catch (error) {
		throw new Error('Failed to decode token');
	}
};

export default {
	login,
	decodeToken,
	refreshLoginToken,
};
