import { upload } from './middleware/multer';
import * as token from './middleware/token';
import * as userController from './controllers/user';
import * as jwt from 'jsonwebtoken';
import { Express, Request, Response } from 'express';
import { getManager, getConnection } from 'typeorm';
import { Session } from './entity/Session';
import { User } from './entity/User';
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
    io.on('connection', async (socket: SocketIO.Socket) => {
        console.log("Client Successfully Connected");
        const session = await getManager()
            .createQueryBuilder(Session, "session")
            .where("session.token = :token", { token: socket.handshake.query.token })
            .getOne();
        const user = await getConnection().getRepository(User).findByIds([session.user]);
        io.emit('chat', "Welcome, " + user[0].login);
        socket.on('chat', (message: string) => {
            io.emit('chat', message);
        })
    })
    /* SOCKET.IO HOOKS */
}