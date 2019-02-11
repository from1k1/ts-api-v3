import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { Session } from './entity/Session';
import * as path from 'path';
import * as http from 'http';
import * as Express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import {router} from './router';

/* APP SETUP */
const app = Express();
const connection = createConnection();
app.use(morgan('combined'));
app.use(cors());
app.use('/static',Express.static(process.env.FULL_SRC_PATH + "static"));
router(app);
/* APP SETUP */


/*SERVER SETUP*/
app.set("port",1337);
const server = http.createServer(app);
server.listen(app.get("port"));
/*SERVER SETUP*/