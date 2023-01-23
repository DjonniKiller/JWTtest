const JwtStrategy = require('passport-jwt').Strategy;
const ExrateJwt = require('passport-jwt').ExtractJwt;
const knex = require('knex');
const users = require('../connections/main');

const options = {
    jwtFromRequest: ExrateJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try{
                const user = await knex('users').where('email', payload.email);

                if (!user) done(null, false);
                else done(null, user);
            } catch (e) {
                console.log(new Error(e).message);
            }
        })
    )
}