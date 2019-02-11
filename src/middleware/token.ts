import * as jwt from 'jsonwebtoken';
export const verify = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log("GETTED TOKEN:" + token);
        jwt.verify(token, 'SUPADUPASECRET');
        next();
    } catch (err) {
        res.send({ success: false, err });
    }
}