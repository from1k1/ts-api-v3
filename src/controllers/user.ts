import * as path from 'path';
import { getConnection, getRepository, getManager, createConnection } from 'typeorm';
import { User } from '../entity/User';
import { Request, Response } from 'express';
import { Session } from '../entity/Session';
import * as jwt from 'jsonwebtoken';
import { token } from 'morgan';

export const getSignin = (req: Request, res: Response) => {
    res.sendFile(process.env.FULL_SRC_PATH + 'static/html/login-page.html');
}

export const getSignup = (req: Request, res: Response) => {
    res.sendFile(process.env.FULL_SRC_PATH + 'static/html/signup-page.html');
}

export const getUserlist = async (req: Request, res: Response) => {
    try {
        const userlist: Array<User> = await getConnection().getRepository(User).find();
        userlist.map(val => {
            val.profile_pic = "http://localhost:1337/static/user_pics/" + val.profile_pic;
        })
        console.log(userlist);
        res.send(userlist);
    } catch (err) {
        res.send(err)
    }

}

export const getVerify = (req: Request, res: Response) => {
    res.send({ success: true, message: "JWT Verified" });
}

export const getInfo = async (req: Request, res: Response) => {
    const session = await getManager()
        .createQueryBuilder(Session,"session")
        .where("session.token = :token", { token: req.headers.authorization })
        .getOne();
    console.log(session);
    const user = await getConnection().getRepository(User).findByIds([session.user]);
    user[0].profile_pic = "http://localhost:1337/static/user_pics/" + user[0].profile_pic;
    res.send(user[0]);


}

export const postSignin = async (req: Request, res: Response) => {
    const session = new Session();
    try {
        const user = await getManager()
            .createQueryBuilder(User, "user")
            .where("user.login = :login AND user.password = :password", { login: req.body.login, password: req.body.password })
            .getOne();
        if (user.login) {
            session.user = user.id;
            session.token = generateToken(user.id, user.login);
            console.log(session);
            try {
                const isSessionExist = await getManager()
                    .createQueryBuilder()
                    .select("session")
                    .from(Session, "session")
                    .where("session.token", { token: session.token })
                    .getOne();

                if (isSessionExist) {

                    await getManager()
                        .createQueryBuilder()
                        .update(Session)
                        .set(session)
                        .where("session.userId = :id", { id: user.id })
                        .execute();

                } else {

                    await getManager()
                        .createQueryBuilder()
                        .insert()
                        .into(Session)
                        .values(session)
                        .execute();

                }
            } catch (err) {
                console.log(err);
                res.send(err);
            }
            res.redirect(301, `http://localhost:3001/redirect.html?id=${user.id}&token=${session.token}`);
        }
    } catch (err) {
        res.send({ success: false, ...err })
    }
}

export const postSignup = async (req: Request, res: Response) => {

    const user = new User();
    const session = new Session();

    user.login = req.body.login;
    user.password = req.body.password;
    user.profile_pic = req.file !== undefined ? req.file.filename : "no-image.png";

    try {
        await getConnection().getRepository(User).save(user);
        session.user = user.id;
        session.token = generateToken(user.id, user.login);
        await getConnection().getRepository(Session).save(session);
        res.redirect(301, `http://localhost:3001/redirect.html?id=${user.id}&token=${session.token}`);
    } catch (err) {
        res.send({ success: false, ...err });
    }
}

function generateToken(id: string, login: string) {
    const token = jwt.sign({ id: id, login: login }, 'SUPADUPASECRET', { expiresIn: 86400 });
    return token;
}