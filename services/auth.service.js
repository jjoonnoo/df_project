const UserRepository = require('../repositories/user.repository');

class AuthService {
    userRepository = new UserRepository();
    handleGoogleLogin = async (profile) => {
        const user = await this.userRepository.findUserByGoogleId(profile.id);
        return user;
    };
}
module.exports = AuthService;
