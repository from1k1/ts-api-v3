import * as jwt from 'jsonwebtoken';
import { Response, Request } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';
export const verify: RequestHandlerParams = (req: Request, res: Response, next: Function) => {
    try {
        const token = req.headers.authorization;
        console.log("Token verified");
        jwt.verify(token, 'SUPADUPASECRET');
        next();
    } catch (err) {
        res.send({ success: false, err });
    }
}
export function verifyIO(socket: any, next) {
    try {
        const token = socket.handshake.query.token;
        console.log(socket.handshake.query.token);
        jwt.verify(token, 'SUPADUPASECRET');
        console.log("Token for socket verified");
        return next();
    } catch (err) {
        console.log("Token for socket NOT verified");
        return next();
    }
}