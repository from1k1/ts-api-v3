import { upload } from './middleware/multer';
import * as token from './middleware/token';
import * as userController from './controllers/user';
import { Express, Request, Response } from 'express';
export const router = (app: Express, io: SocketIO.Server) => {
    /* GET ROUTES */
    app.get('/', upload.none(), userController.getSignin);
    app.get('/signup', upload.none(), userController.getSignup);
    app.get('/userlist', token.verify, userController.getUserlist);
    app.get('/verify', token.verify, userController.getVerify);
    app.get('/me', token.verify, userController.getInfo);
    /* GET ROUTES */

    /* POST ROUTES */
    app.post('/', upload.none(), userController.postSignin);
    app.post('/signup', upload.single('avatar'), userController.postSignup);
    /* POST ROUTES */

    /* SOCKET.IO HOOKS */
    io.use(token.verifyIO);
    /* SOCKET.IO HOOKS */
}