const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
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
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Question', questionSchema);