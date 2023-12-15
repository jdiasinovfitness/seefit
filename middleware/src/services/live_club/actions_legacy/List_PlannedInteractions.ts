import { NextFunction, Request, Response } from 'express';
import LiveClubProvider, {
	QueryInteractions,
} from '../../provider/temp_legacy_providers/Live_Club';

export interface I18N {
	lang: string;
	text: string;
}
interface InteractionBasicInfo {
	id: string;
	status: string;
	date: string;
	name: Array<I18N>;
	callBlock: boolean;
}
export interface AdditionalInformation {
	icons: Array<string>;
}
interface ResponseCustomers {
	id: string;
	code: string;
	photo: string;
	name: string;
	dob: string; //birthday date
	frequency: string;
	risk: string;
	interaction: InteractionBasicInfo;
	additionalInfo?: AdditionalInformation;
	healthRisk: boolean; //To be analyzed
}

function frequency(freq: number) {
	let freqReturn = 'SLP';
	switch (freq) {
		case 1:
			freqReturn = 'AU';
			break;
		case 2:
			freqReturn = 'LRU';
			break;
		case 3:
			freqReturn = 'MRU';
			break;
		case 4:
			freqReturn = 'HRU';
			break;
		case 5:
			freqReturn = 'SLP';
			break;
		default:
			freqReturn = 'SLP';
			break;
	}
	return freqReturn.toString();
}
export default async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		console.log('GET /liveclub/interactions/planned');
		const authorization = req.headers['authorization'] as string;
		const in_club = req.query['in_club'] as boolean | undefined;
		const loc = req.query['location_code'] as string | undefined;
		const page = req.query['page'] as number | undefined;
		const size = req.query['size'] as number | undefined;

		let endDate = new Date();
		endDate.setHours(0, 0, 0, 0);
		endDate.setDate(endDate.getDate() + 1);

		let startDate = new Date();
		startDate.setHours(0, 0, 0, 0);

		// add a day

		let query: QueryInteractions = {
			in_club: in_club,
			origin: 'solinca.solinca',
			main_location: loc,
			page: page,
			size: size,
			start_date: startDate.toISOString(),
			end_date: endDate.toISOString(),
		};
		const plannedInteractions = await LiveClubProvider.interactionsPlanned(
			query,
			authorization
		);

		let responseCustomers: Array<ResponseCustomers> = [];

		for (const c of plannedInteractions.customers) {
			responseCustomers.push({
				id: c.code,
				code: c.code,
				name: c.name,
				photo: c.photo,
				dob: c.dob,
				frequency: frequency(c.est_freq),
				risk: c.churn_level,
				interaction: {
					id: Math.random().toString(),
					status: c.scheduled_int_desc ? 'PLANNED' : 'COMPLETED',
					date: c.scheduled_int_date,
					name: [
						{
							lang: 'pt',
							text: c.scheduled_int_desc,
						},
						{
							lang: 'en',
							text: c.scheduled_int_desc,
						},
					],
					callBlock: false,
				},
				additionalInfo: { icons: [] },
				healthRisk: c.last_conclusion_af?.personal_history ? true : false,
			});
		}

		res.status(200).send(responseCustomers);
		return;
	} catch (err) {
		console.log(err);
		next(err);
	}
};
