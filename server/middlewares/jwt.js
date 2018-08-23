const expressJwt = require('express-jwt');
const CONFIG = require('../config/config');
const UserService = require('../users/user.service');


function jwt() {
  const secret = CONFIG.jwt_encryption;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      '/api/users/authenticate',
      '/api/users/register'
    ]
  });
}

async function isRevoked(req, payload, done) {
  const user = await UserService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
};

module.exports = jwt;
