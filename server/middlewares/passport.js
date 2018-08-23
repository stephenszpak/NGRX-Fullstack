const { ExtractJwt, Strategy } = require('passport-jwt');
const CONFIG = require('../config/config');
const db = require('../config/db');
const User = db.User;

module.exports = function(passport) {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = CONFIG.jwt_encryption;

  passport.use(new Strategy(opts, function(jwt_payload, done) {
    User.findOne(jwt_payload.user_id, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  }));
}
