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
export const verifyIO = (socket: any, next) => {
    try {
        const token = socket.client.request;
        console.log(socket);
        jwt.verify(token, 'SUPADUPASECRET');
        next();
    } catch (err) {
        next();
    }
}