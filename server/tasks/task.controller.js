const config = require('../config/config');
const TaskService = require('./task.service');

const create = function(req, res, next) {
  TaskService.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}
module.exports.create = create;

const getById = function(req, res, next) {
  TaskService.getById(req.params.id)
    .then(task => task ? res.json(task) : res.sendStatus(404))
    .catch(err => next(err));
}
module.exports.getById = getById;

const getAll = function(req, res, next) {
  TaskService.getAll()
    .then(tasks => res.json(tasks))
    .catch(err => next(err));
}
module.exports.getAll = getAll;

const update = function(req, res, next) {
  TaskService.update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}
module.exports.update = update;

const remove = function(req, res, next) {
  TaskService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
module.exports.remove = remove;
