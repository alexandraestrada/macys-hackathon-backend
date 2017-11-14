const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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