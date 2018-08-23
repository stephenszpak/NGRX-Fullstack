const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdDate: { type: Date, default: Date.now }
}, { timestamps: true });


UserSchema.set('toJSON', { virtuals: true });

let User = module.exports = mongoose.model('User', UserSchema);
