const JwtStrategy = require('passport-jwt').Strategy;
const ExrateJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');
const users = require('../connections/main');

const options = {
    jwtFromRequest: ExrateJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try{
                const user = await users.find(el => el.id === payload.id);
                if (!user) done(null, false);
                else done(null, user);
            } catch (e) {
                console.log(new Error(e).message);
            }
        })
    )
}