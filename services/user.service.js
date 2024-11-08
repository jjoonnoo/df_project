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
    updateAddress = async (youtubeId, address, postalCode) => {
        const userData = await this.userRepository.updateAddress(
            youtubeId,
            address,
            postalCode
        );
        return userData;
    };
    updateInfo = async (youtubeId, name, phone) => {
        const userData = await this.userRepository.updateInfo(
            youtubeId,
            name,
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
