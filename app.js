const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const { LiveChat } = require('youtube-chat');
const passport = require('passport');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const router = require('./routes');
require('./config/passport.config');
require('dotenv').config();
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
const liveChat = new LiveChat({ liveId: 'FJfwehhzIhw' });
// io.on('cennection',(socket)=>{
//     console.log('Connected')
//     socket.on('chat',(message)=>{
//         liveChat.on('chat',(chatItem)=>{
//             console.log(chatItem)
//             io.emit('chat',chatItem)
//         })
//     })
// })
// 이 부분 다시해야됨
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);
server.listen(process.env.PORT, '0.0.0.0', function () {
    console.log(`http://localhost:${process.env.PORT}/`);
});
