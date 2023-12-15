import axios, { AxiosResponse } from 'axios';
import { processAPIError } from '../../../utils/httpErrors';

export interface QueryInteractions {
	origin: string;
	start_date?: string;
	end_date?: string;
	location_code: string | undefined;
	main_location: string;
	in_club: boolean;
	page: number;
	size: number;
}
const interactionsPlanned = async (
	query: QueryInteractions,
	token: string
): Promise<any[]> => {
	try {
		const response: AxiosResponse<QueryInteractions[]> = await axios.request({
			method: 'GET',
			url: `https://scfitness.api.inovretail.com/interaction/instore`,
			headers: {
				authorization: token,
			},
			params: query,
			responseType: 'json',
		});

		return response.data;
	} catch (err) {
		throw processAPIError(err);
	}
};

export default {
	interactionsPlanned,
};
