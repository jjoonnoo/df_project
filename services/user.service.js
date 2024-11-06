const UserRepository = require('../repositories/user.repository');
class UserService {
    userRepository = new UserRepository();
    findUserByYoutubeId = async (youtubeId) => {
        const userData =
            await this.userRepository.findUserByYoutubeId(youtubeId);
        return userData;
    };
    createUser = async (
        googleId,
        youtubeId,
        nickname,
        email,
        name,
        address,
        phone,
        postalCode,
        usePersonalInfo
    ) => {
        const userData = await this.userRepository.createUser(
            googleId,
            youtubeId,
            nickname,
            email,
            name,
            address,
            phone,
            postalCode,
            usePersonalInfo
        );
        return userData;
    };
    modifyUser = async (googleId, address, postalCode, phone) => {
        const userData = await this.userRepository.modifyUser(
            googleId,
            address,
            postalCode,
            phone
        );
        return userData;
    };
    deleteUser = async (googleId) => {
        const userData = await this.userRepository.deleteUser(googleId);
        return userData;
    };
}
module.exports = UserService;
