import axios from 'axios';
import { processAPIError } from 'utils/httpErrors';

export interface UserInteractionParams {
	inClub?: boolean;
	inGroupClass?: boolean;
	healthRisk?: boolean;
	callBlock?: boolean;
}

const getUserInteractions = async (
	auth: string,
	origin: string,
	params: UserInteractionParams
) => {
	try {
		const response = await axios.request({
			method: 'GET',
			url: `${process.env.API_GATEWAY}/customer`,
			headers: {
				authorization: auth,
				origin: origin,
			},
			params: {
				'api-version': '1',
				...params,
			},
			responseType: 'json',
		});

		return response.data;
	} catch (err) {
		console.log('ERROR IN INTERACTIONS', err);
		throw processAPIError(err);
	}
};

export default { getUserInteractions };
