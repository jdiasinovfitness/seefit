import http from 'http';
import express from 'express';
import { applyMiddleware, applyRoutes } from './utils';
import activationMiddleware from './middleware/common';
import errorHandlers from './middleware/errorHandlers';
import routes from './services';

process.on('uncaughtException', e => {
	console.log({ message: 'uncaughtException', error: e });
	process.exit(1);
});

process.on('unhandledRejection', e => {
	console.log({ message: 'unhandledRejection', error: e });
	process.exit(1);
});

const router = express();
applyMiddleware(activationMiddleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

router.use((req, res, next) => {
	console.log(`Hitted route: ${req.url}`);
	next();
});

const { PORT = 80 } = process.env;
const server = http.createServer(router);

server.listen(PORT, () => {
	const address = server.address();
	const actualAddress =
		typeof address === 'string'
			? address
			: `http://${address?.address}:${address?.port}`;
	console.info({
		message: `Server is running on: ${actualAddress} at ${process.env.NODE_ENV}`,
	});
});
