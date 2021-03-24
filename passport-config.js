require("dotenv").config();
const { Strategy, ExtractJwt } = require("passport-jwt");
const mongoose = require("mongoose");
const User = require("./models/User");
const secret = process.env.SECRET;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, (payload, done) => {
      User.findById(payload.id)
        .then((user) => {
          if (user) {
            const { id, name, email } = user;
            return done(null, {
              id,
              name,
              email,
            });
          }
          return done(null, false);
        })
        .catch((err) => console.error(err));
    })
  );
};
