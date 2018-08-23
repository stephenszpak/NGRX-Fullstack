const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdDate: { type: Date, default: Date.now }
}, { timestamps: true });

TaskSchema.set('toJSON', { virtuals: true });

let Task = module.exports = mongoose.model('Task', TaskSchema);
