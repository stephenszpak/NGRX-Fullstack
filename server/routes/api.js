const express = require('express');
const router = express.Router();
const CONFIG = require('../config/config');

const UserController = require('../users/user.controller');
const TaskController = require('../tasks/task.controller');

const passport = require('passport');
const path = require('path');

require('../middlewares/passport')(passport);

router.get('/', function(req,res,next) {
  res.json({ status: "succss", message: "API", data: { "version_number": "v0.0.1"}})
})

// passport.authenticate('jwt', { session: false }),


//Auth

router.post('/users/authenticate', UserController.login);
router.post('/users/register', UserController.create);
router.get('/users', UserController.getAll);
router.get('/users/:id', UserController.getById);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.remove);

//Tasks

router.post('/tasks', TaskController.create);
router.get('/tasks', TaskController.getAll);
router.get('/tasks/:id', TaskController.getById);
router.put('/tasks/:id', TaskController.update);
router.delete('/tasks/:id', TaskController.remove);


module.exports = router;
