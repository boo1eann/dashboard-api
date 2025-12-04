import { Request, Response, NextFunction } from 'express';
import { IMiddleWare } from './middleware.interface';
import { JwtPayload, verify } from 'jsonwebtoken';

interface UserPayload extends JwtPayload {
	email: string;
}

function isUserPayload(payload: string | JwtPayload | undefined): payload is UserPayload {
	return (
		typeof payload === 'object' &&
		payload !== null &&
		'email' in payload &&
		typeof (payload as UserPayload).email === 'string'
	);
}

export class AuthMiddleware implements IMiddleWare {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (isUserPayload(payload)) {
					req.user = payload.email;
					next();
				} else {
					console.error('Payload was valid but did not contain an email property.');
					next();
				}
			});
		} else {
			next();
		}
	}
}
