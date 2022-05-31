const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let User = new Schema({
  
   full_name: {
      type: String
   },
   email: {
      type: String
   },
   password:{
      type:String
   },
   created_at:{
      type:Date
   }
}, {
   collection: 'users'
})

module.exports = mongoose.model('User', User)