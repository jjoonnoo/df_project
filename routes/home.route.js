const express = require('express')
const router = express.Router()
router.get('/',(req,res)=>{
    res.render('index',{title:'Home'})
})
router.get('/profile',(req,res)=>{
    res.render('profile',{title:'프로필'})
})
router.get('/register',(req,res)=>{
    res.render('register',{title:'회원가입'})
})
module.exports = router