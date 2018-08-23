const CONFIG = require('../config/config');
const db = require('../config/db');
const Task = db.Task;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await Task.find();
}

async function getById(id) {
  return await Task.findById(id);
}

async function create(taskParam) {
  const task = new Task(taskParam);

  await task.save();
}

async function update(id, taskParam) {
  const task = await Task.findById(id);
  Object.assign(task, taskParam);
  await task.save();
}

async function _delete(id) {
  await Task.findByIdAndRemove(id);
}
