import * as multer from 'multer';
import * as mime from 'mime';
const storage: multer.StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.FULL_SRC_PATH + '/static/user_pics/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + mime.getExtension(file.mimetype))
    }
})
export const upload: multer.Instance = multer({ storage: storage });