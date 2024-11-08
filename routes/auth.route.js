const express = require('express');
const passport = require('passport');
const router = express();
const AuthController = require('../controllers/auth.controller');
const authController = new AuthController();
router.get('/google', (req, res, next) => {
    const promptOption = req.isAuthenticated() ? 'none' : 'select_account';
    passport.authenticate('google', {
        scope: [
            'profile',
            'email',
            'https://www.googleapis.com/auth/youtube.readonly',
        ],
        prompt: promptOption,
    })(req, res, next);
});
router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        scope: ['https://www.googleapis.com/auth/youtube.readonly'],
    }),
    authController.googleCallback
);
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('로그아웃 실패');
        }
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.redirect('/');
        });
    });
});
router.use((err, req, res, next) => {
    if (res.headerSent) {
        return next(err);
    }
    res.status(500).send(err.message || 'Internal Server Error');
});
module.exports = router;
