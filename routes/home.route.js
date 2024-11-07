const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.render('index', { title: '홈' });
});
router.get('/profile', (req, res) => {
    res.render('profile', { title: '프로필' });
});
router.get('/createUser', (req, res) => {
    res.render('create.user.ejs', { title: '회원가입' });
});
router.get('/updateInfo', (req, res) => {
    res.render('update.info.ejs', { title: '주소 수정' });
});
module.exports = router;
