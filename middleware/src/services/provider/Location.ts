import axios, { AxiosResponse } from 'axios';
import { processAPIError } from '../../utils/httpErrors';

export interface Location {
	id: string;
	desc: string;
	zones: { code: string; desc: string }[];
	origin: string;
	code: string;
	type: string;
	status: string;
	address: {
		country: string;
		city: string;
		postal_code: string;
		address: string;
	};
	correlation_id: string;
	description: string;
}

const locationsSummary = async (
	token: string,
	origin: string
): Promise<Location[]> => {
	try {
		const response: AxiosResponse<Location[]> = await axios.request({
			method: 'GET',
			url: `${process.env.API_GATEWAY}/location/summary`,
			headers: {
				authorization: token,
			},
			params: {
				'api-version': '1',
				origin,
			},
			responseType: 'json',
		});

		return response.data;
	} catch (err) {
		throw processAPIError(err);
	}
};

const locationsDetails = async (
	token: string,
	locationId: string
): Promise<Location> => {
	try {
		const response: AxiosResponse<Location> = await axios.request({
			method: 'GET',
			url: `${process.env.API_GATEWAY}/location/${locationId}`,
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
		console.log('ERROR ON LOCATIONS DETAILS');
		throw processAPIError(err);
	}
};

export default {
	locationsSummary,
	locationsDetails,
};
