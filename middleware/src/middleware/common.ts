import { Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import express from 'express';
import compression from 'compression';
import { parseParam } from '../utils';

const i9r = (req: Request, res: Response, next: NextFunction): void => {
	try {
		const apiVersion = parseParam.number(req, 'api-version');
		req.i9r = {
			apiVersion,
		};
		next();
	} catch (err) {
		next(err);
	}
};

const logRequest = (req: Request, res: Response, next: NextFunction): void => {
	try {
		console.info({ method: req.method, url: req.originalUrl, ...req.i9r });
		next();
	} catch (err) {
		next(err);
	}
};

const handleCors = (router: Router): void => {
	router.use(cors({ credentials: true, origin: true }));
};

const handleBodyRequestParsing = (router: Router): void => {
	router.use(express.json({ limit: '10mb' }));
	router.use(express.urlencoded({ extended: true, limit: '10mb' }));
};

const handleCompression = (router: Router): void => {
	router.use(compression());
};

const initialData = (router: Router): void => {
	router.use(i9r);
	router.use(logRequest);
};

export default [
	handleCors,
	handleBodyRequestParsing,
	handleCompression,
	initialData,
];
