

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    console.log("file");
    console.log(file)
    
    const uniqueSuffix = Date.now();
    cb(null,file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])

  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});
const {setHeader,isAuth} = require("../utility.js");

module.exports = function(app) {
    const users = require('../controllers/user.controller.js');
    app.post('/signup',[setHeader,upload.single("file")],users.addUser);
    app.post('/login',[setHeader,upload.single("file")],users.login);
    app.post('/add_moment/:user_id',[setHeader,upload.single("file")],users.addMoment);
    app.get('/list_moment',[setHeader],users.getMoments);
    app.post('/logout',[setHeader],users.logout);
}