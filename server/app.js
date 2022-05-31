const express = require('express');
const app = express();
require('./config/db.js');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: 'mongodb+srv://gireesh:jain123@mycluster0.5we9c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  collection: 'mySessions'
});
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store:store
}))

const dotenv = require("dotenv")
// const mongoose = require('mongoose');
dotenv.config({path:'./config.env'});
var cors = require('cors');
const bodyParser= require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./route/user.js')(app);

app.use(cors())
app.use('/uploads', express.static('./uploads'));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  next();
});


app.listen(3000, function() {
    console.log('listening on 3000')
})