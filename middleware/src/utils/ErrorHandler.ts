import { Response, NextFunction, Request } from 'express';
import { HTTPClientError, RequestError, NotFoundError } from './httpErrors';

export const notFoundError = (): void => {
	throw new NotFoundError();
};

export const clientError = (
	err: Error,
	res: Response,
	next: NextFunction
): void => {
	console.log(JSON.stringify(err));
	if (err instanceof HTTPClientError) {
		res.status(err.statusCode).send(err.message);
	} else {
		next(err);
	}
};

export const serverError = (err: Error, res: Response): void => {
	console.error(err);
	if (process.env.NODE_ENV === 'production') {
		res.status(500).end();
	} else {
		res.status(500).send(err.stack);
	}
};

export const apiVersionError = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	next(new RequestError(`Invalid parameter api-version: ${req.i9r.apiVersion}`));
};
