import "reflect-metadata";
import { createConnection } from "typeorm";
import * as http from 'http';
import * as Express from 'express';
import * as cors from 'cors';
import { router } from './router';
import * as socket from 'socket.io';
import * as token from './middleware/token';
/* APP SETUP */
const app: Express.Express = Express();
const connection = createConnection();
//app.use(morgan('combined'));
app.use(cors());
app.use('/static', Express.static(process.env.FULL_SRC_PATH + "static"));
/* APP SETUP */


/*SERVER SETUP*/
app.set("port", 1337);
const server = http.createServer(app);
const io: SocketIO.Server = socket(server);
io.use(token.verifyIO);
router(app, io);
server.listen(app.get("port"));
/*SERVER SETUP*/