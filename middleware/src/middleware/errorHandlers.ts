import { Request, Response, NextFunction, Router } from 'express';
import { notFoundError, clientError, serverError } from '../utils/ErrorHandler';

const handle404Error = (router: Router): void => {
	router.use(() => {
		notFoundError();
	});
};

const handleClientError = (router: Router): void => {
	router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		clientError(err, res, next);
	});
};

const handleServerError = (router: Router): void => {
	router.use((err: Error, req: Request, res: Response) => {
		serverError(err, res);
	});
};

export default [handle404Error, handleClientError, handleServerError];
