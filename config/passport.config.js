const passport = require('passport');
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { google } = require('googleapis');
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_REDIRECT_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const oauth2Client = new google.auth.OAuth2();
                oauth2Client.setCredentials({ access_token: accessToken });
                const youtube = google.youtube({
                    version: 'v3',
                    auth: oauth2Client,
                });
                const response = await youtube.channels.list({
                    part: 'snippet',
                    mine: true,
                });
                let youtubeId;
                let youtubeNickName;
                if (response.data.items && response.data.items.length > 0) {
                    youtubeId = response.data.items[0].id;
                    youtubeNickName = response.data.items[0].snippet.title;
                }
                const user = {
                    googleId: profile.id,
                    youtubeId,
                    youtubeNickName,
                    email: profile.emails[0].value,
                    accessToken,
                    refreshToken,
                };
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
module.exports = passport;
