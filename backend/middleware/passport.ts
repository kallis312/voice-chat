import { model } from "mongoose";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";

const UserModel = model('User')

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: process.env.SECRET_KEY || 'secret',
};

const jwtLogin = new Strategy(jwtOptions, async (payload, done) => {
  const existUser = await UserModel.findById(payload._id, 'email ID')
  if (existUser)
    done(null, existUser)
  else
    done(false)
});

passport.use(jwtLogin);