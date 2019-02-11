import { upload } from './middleware/multer';
import * as token from './middleware/token';
import * as userController from './controllers/user';
export const router = (app) => {

    /* GET ROUTES */
    app.get('/', upload.none(), userController.getSignin);
    app.get('/signup', upload.none(), userController.getSignup);
    app.get('/userlist', token.verify, userController.getUserlist);
    app.get('/verify', token.verify, userController.getVerify);
    app.get('/me', token.verify, userController.getInfo);
    /* GET ROUTES */

    app.post('/', upload.none(), userController.postSignin);
    app.post('/signup', upload.single('avatar'), userController.postSignup);

}