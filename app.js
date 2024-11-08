require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./config/passport.config');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const server = require('http').createServer(app);
const router = require('./routes');
app.use(cookieParser());
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('layout extraScripts', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(
    session({
        secret: process.env.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 24 * 60 * 60 * 1000 },
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);
server.listen(process.env.PORT, '0.0.0.0', function () {
    console.log(`http://localhost:${process.env.PORT}/`);
});
