const UserService = require('../services/user.service')
class AuthController{
    userService = new UserService()
    googleCallback = async(req,res)=>{
        const googleId = req.user.googleId
        const youtubeId = req.user.youtubeId
        req.session.googleId = googleId
        req.session.youtubeId = youtubeId
        const user = await this.userService.findUserByYoutubeId(youtubeId)
        if(user == null){
            res.redirect('/register')
        }else if(user.role == 1){
            res.redirect('/admin')
        }
        else{
            req.session.user = user
            res.redirect('/profile')
        }
    }
    
}
module.exports = AuthController