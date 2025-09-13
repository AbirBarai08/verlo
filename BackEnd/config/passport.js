const passport = require('passport');
const GoogleStratagy = require('passport-google-oauth20').Strategy;
const Users = require('../models/user.js');

passport.use(new GoogleStratagy({
    clientID: process.env.CLINT_ID,
    clientSecret: process.env.CLINT_SECRET,
    callbackURL: process.env.CLINT_CALLBACK_URL
}, async (accessToken , refreshToken, profile, done) => {
    try {
        let user = await Users.findOne({ googleId: profile.id });
        if(!user) {
            user = new Users({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails?.[0]?.value
            })
            await user.save();
        }
        return done(null , user);
    } catch (err) {
        return done(err, null);
    }
}))