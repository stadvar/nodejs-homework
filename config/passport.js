const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const Users = require("../schemas/users");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await Users.findOne({ _id: payload.id });
      if (!user) {
        return done(new Error("User not found"));
      }
      if (!user.token) {
        done(null, false);
      }
      return done(null, user);
    } catch (e) {
      done(e);
    }
  })
);
module.exports = passport;