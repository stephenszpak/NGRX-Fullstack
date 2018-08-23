const config = require('../config/config');
const UserService = require('./user.service');

const login = function(req, res, next) {
  UserService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));
}
module.exports.login = login;

const create = function(req, res, next) {
  UserService.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}
module.exports.create = create;

const getById = function(req, res, next) {
  UserService.getById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}
module.exports.getById = getById;

const getAll = function(req, res, next) {
  UserService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}
module.exports.getAll = getAll;

const update = function(req, res, next) {
  UserService.update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}
module.exports.update = update;

const remove = function(req, res, next) {
  UserService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
module.exports.remove = remove;
