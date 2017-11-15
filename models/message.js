const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  recipient: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  socketId: String,
  text: String,
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Message', messageSchema);


