const CONFIG = require('../config/config');
const mongoose = require('mongoose');

mongoose.connect(CONFIG.db_url, {
  useNewUrlParser: true
}).catch((err) => {
  console.log('*** Can Not Connect to Mongo Server:', CONFIG.db_url)
})

module.exports = {
  User: require('../users/user.model'),
  Task: require('../tasks/task.model')
};
