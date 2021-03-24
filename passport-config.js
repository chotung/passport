require("dotenv").config();
const OAuth2Strategy = require("passport-oauth2")
const mongoose = require("mongoose");
const User = require("./models/User");
const secret = process.env.SECRET;


module.exports = (passport) => {
  passport.use(
		new OAuth2Strategy({
			// authorizationURL: "https://www.example.com/oauth2/authorize",
			authorizationURL: "http://localhost:3333/api/oauth2/authorize",
			tokenURL: "http://localhost:3333/api/oauth2/token",
			clientID: "EXAMPLE_CLIENT_ID",
			clientSecret: "EXAMPLE_CLIENT_SECRET",
			callbackURL: "http://localhost:3333/api/auth/example/callback"
		},
		async (accessToken, refreshToken, profile, cb) =>{
				const user = await User.findById({ _id: profile.id}, (err, user) => {
					return cb(err, user)
				})
		})
    // new Strategy(opts, (payload, done) => {
    //   User.findById(payload.id)
    //     .then((user) => {
    //       if (user) {
    //         const { id, name, email } = user;
    //         return done(null, {
    //           id,
    //           name,
    //           email,
    //         });
    //       }
    //       return done(null, false);
    //     })
    //     .catch((err) => console.error(err));
    // })
  );
};
