
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema =  new Schema({
  associateId: String,
  name: {
    first: String,
    last: String
  },
  image: String,
  title: String,
  department: String,
  accountType: String
})

module.exports = mongoose.model('User', userSchema);
