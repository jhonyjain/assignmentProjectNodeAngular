const mongoose = require('mongoose');

const uri = process.env.DATABASE;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}

mongoose.connect("mongodb+srv://gireesh:jain123@mycluster0.5we9c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",options).then(()=>{
  console.log("connection Success")
}).catch((err)=>console.log(err));
module.exports = mongoose;


