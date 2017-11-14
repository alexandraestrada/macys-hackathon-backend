const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  socketId: String,
  category: String,
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  assigner: {
  	type: Schema.Types.ObjectId, ref: 'User'
  },
  assignee: {
  	type: Schema.Types.ObjectId, ref: 'User'
  },
  text: String,
  status: String
}, { timestamp: true });

module.exports = mongoose.model('Question', questionSchema);