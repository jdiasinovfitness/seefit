import axios from 'axios';
import { processAPIError } from '../../utils/httpErrors';

interface SearchUserResponse {
	id: string;
	name: string;
	email: string;
	internal_code: string;
	status: string;
	lastSessionAt?: string;
	online?: boolean;
	hr?: string;
	created_by: string;
	created_at: string;
}
interface UserLocation {
	location: string;
}

interface UserRole {
	role: string;
}

const searchUser = async (
	auth: string,
	origin: string
): Promise<SearchUserResponse[]> => {
	try {
		const response = await axios.request({
			method: 'GET',
			url: `${process.env.API_GATEWAY}/user`,
			headers: {
				Authorization: auth,
			},
			responseType: 'json',
			params: {
				origin: origin,
			},
		});

		return response.data as Array<SearchUserResponse>;
	} catch (err) {
		throw processAPIError(err);
	}
};

const getUserLocations = async (
	auth: string,
	user_id: string,
	origin: string
): Promise<UserLocation[]> => {
	try {
		const response = await axios.request({
			method: 'GET',
			url: `${process.env.API_GATEWAY}/user/${user_id}/locations`,
			headers: {
				Authorization: auth,
			},
			responseType: 'json',
			params: {
				origin: origin,
			},
		});
		return response.data as Array<UserLocation>;
	} catch (err) {
		throw processAPIError(err);
	}
};

const getUserRoles = async (
	log_id: string,
	auth: string,
	user_id: string,
	origin: string
): Promise<UserRole[]> => {
	try {
		const response = await axios.request({
			method: 'GET',
			url: `${process.env.API_GATEWAY}/user/${user_id}/roles`,
			headers: {
				Authorization: auth,
			},
			responseType: 'json',
			params: {
				origin: origin,
			},
		});

		return response.data as Array<UserRole>;
	} catch (err) {
		throw processAPIError(err);
	}
};

const inactiveUser = async (
	auth: string,
	user_id: string
): Promise<unknown> => {
	const response = await axios.request({
		method: 'POST',
		url: `${process.env.API_GATEWAY}/user/${user_id}/inactive`,
		headers: {
			Authorization: auth,
		},
		responseType: 'json',
	});

	return response.data;
};

const unblockUser = async (auth: string, user_id: string): Promise<unknown> => {
	const response = await axios.request({
		method: 'POST',
		url: `${process.env.API_GATEWAY}/user/${user_id}/unblock`,
		headers: {
			Authorization: auth,
		},
		responseType: 'json',
	});

	return response.data;
};

const startActivationUser = async (
	auth: string,
	user_id: string
): Promise<unknown> => {
	const response = await axios.request({
		method: 'POST',
		url: `${process.env.API_GATEWAY}/user/${user_id}/start_activation`,
		headers: {
			Authorization: auth,
		},
		responseType: 'json',
	});

	return response.data;
};

const searchUserById = async (
	auth: string,
	id: string
): Promise<SearchUserResponse> => {
	try {
		const response = await axios.request({
			method: 'GET',
			url: `${process.env.API_GATEWAY}/user`,
			headers: {
				Authorization: auth,
			},
			responseType: 'json',
			params: {
				id: id,
			},
		});

		return response.data[0] as SearchUserResponse;
	} catch (err) {
		throw processAPIError(err);
	}
};

const unlockUser = async (auth: string, user_id: string): Promise<unknown> => {
	const response = await axios.request({
		method: 'POST',
		url: `${process.env.API_GATEWAY}/user/${user_id}/unlock`,
		headers: {
			Authorization: auth,
		},
		responseType: 'json',
	});

	return response.data;
};

export interface UserProfileBasic {
	name: string;
	email: string;
	language: string;
}
const userProfile = async (auth: string): Promise<UserProfileBasic> => {
	try {
		const response = await axios.request({
			method: 'GET',
			url: `${process.env.API_GATEWAY}/user/my_profile`,
			headers: {
				Authorization: auth,
			},
			responseType: 'json',
		});

		return response.data;
	} catch (err) {
		console.log(err);
		throw processAPIError(err);
	}
};

export default {
	searchUser,
	getUserLocations,
	getUserRoles,
	inactiveUser,
	unblockUser,
	startActivationUser,
	searchUserById,
	unlockUser,
	userProfile,
};
