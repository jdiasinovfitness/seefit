import { I9rRequestData } from "../utils/i9rRequest";

declare module "express-serve-static-core" {
	interface Request {
		i9r: I9rRequestData;
	}
}
