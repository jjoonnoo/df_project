const UserRepository = require('../repositories/user.repository')
class UserService{
    userRepository = new UserRepository()
    findUserByGoogleId = async(googleId) => {
        const userData = await this.userRepository.findUserByGoogleId(googleId)
        return userData
    }
    createUser = async(googleId,email,name,address,phone,postalCode,role,usePersonalInfo)=>{
        const userData = await this.userRepository.createUser(googleId,email,name,address,phone,postalCode,role,usePersonalInfo)
        return userData
    }
    modifyUser = async(googleId,address,postalCode,phone)=>{
        const userData = await this.userRepository.modifyUser(googleId,address,postalCode,phone)
        return userData
    }
    deleteUser = async(googleId)=>{
        const userData = await this.userRepository.deleteUser(googleId)
        return userData
    }
}
module.exports = UserService