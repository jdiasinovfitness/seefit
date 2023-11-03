import axios from 'axios';
import { processAPIError } from 'utils/httpErrors';

const locationsSummary = async (token: string, origin: string) => {
	try {
		const response = await axios.request({
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

export default {
	locationsSummary,
};
