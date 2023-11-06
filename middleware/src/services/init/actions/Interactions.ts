import { NextFunction, Request, Response } from 'express';
import Interactions from '../../provider/Interactions';
import { processAPIError } from 'utils/httpErrors';

export default async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const { origin, ...params } = req.query;
	const authToken = req.headers['authorization'];

	if (!authToken) throw processAPIError('Auth token is missing');
	if (!origin) throw processAPIError('Origin is missing');

	try {
		const customers = await Interactions.getUserInteractions(
			authToken,
			origin as string,
			{
				...params,
			}
		);

		return customers;
	} catch (err) {
		next(err);
	}
};
