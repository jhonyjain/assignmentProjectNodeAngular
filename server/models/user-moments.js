const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let UserMoment = new Schema({
  
   image: {
      type: String
   },
   comment: {
      type: String,
      maxlength: 100
   },
   user_id: { type: Schema.Types.ObjectId, ref:'User' },
   tag:{
      type:String
   },
   created_at:{
      type:Date
   }
}, {
   collection: 'user_moments'
})

module.exports = mongoose.model('UserMoment', UserMoment)