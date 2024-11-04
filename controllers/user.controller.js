const UserService = require('../services/user.service')
class UserController {
    userService = new UserService()
    createUser = async(req,res)=>{
        const {name,address,phone,postalCode,role,usePersonalInfo} = req.body
        const {googleId} = req.session.googleId
        const {email} = req.session.email
        const createuser = await this.userService.createUser(googleId,email,name,address,phone,postalCode,role,usePersonalInfo)
        res.json({message:"회원가입에 성공하였습니다."})
    }
    modifyUser = async(req,res)=>{
        const {address,postalCode,phone} = req.body
        const userGoogleId = req.session.googleId
        const user = await this.userService.findUserByGoogleId(userGoogleId)
        if(user){
            const modify = await this.userService.modifyUser(userGoogleId,address,postalCode,phone)
        }
        res.json({message:"회원정보 수정에 성공하였습니다."})
    }
    deleteUser = async(req,res)=>{
        const userGoogleId = req.session.googleId
        const user = await this.userService.findUserByGoogleId(userGoogleId)
        if(user){
            await this.userService.deleteUser(userGoogleId)
        }
        req.session.destroy()
        res.json({message:"회원탈퇴에 성공하였습니다."})
        res.render('index',{title:"Home"})
    }
}
module.exports = UserController