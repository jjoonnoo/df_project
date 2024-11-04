const UserService = require('../services/user.service')
class AuthController{
    userService = new UserService()
    googleCallback = async(req,res)=>{
        const googleId = req.user.googleId
        req.session.googleId = googleId
        const user = await this.userService.findUserByGoogleId(googleId)
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