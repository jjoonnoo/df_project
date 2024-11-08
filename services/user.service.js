const UserRepository = require('../repositories/user.repository');
class UserService {
    userRepository = new UserRepository();
    findUserByYoutubeId = async (youtubeId) => {
        try {
            const userData =
                await this.userRepository.findUserByYoutubeId(youtubeId);
            if (!userData) {
                throw new Error('User not found');
            }
            return userData;
        } catch (error) {
            throw new Error('Error finding user');
        }
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
        try {
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
        } catch (error) {
            throw new Error('Error creating user');
        }
    };
    changedUserInfoUpdate = async (youtubeId, googleId, email, nickname) => {
        try {
            const userData = await this.userRepository.changedUserInfoUpdate(
                youtubeId,
                googleId,
                email,
                nickname
            );
            if (!userData) {
                throw new Error('User info update failed');
            }
            return userData;
        } catch (error) {
            throw new Error('Error updating user info');
        }
    };
    updateAddress = async (youtubeId, address, postalCode) => {
        try {
            const userData = await this.userRepository.updateAddress(
                youtubeId,
                address,
                postalCode
            );
            if (!userData) {
                throw new Error('Address update failed');
            }
            return userData;
        } catch (error) {
            throw new Error('Error updating user info');
        }
    };
    updateInfo = async (youtubeId, name, phone) => {
        try {
            const userData = await this.userRepository.updateInfo(
                youtubeId,
                name,
                phone
            );
            if (!userData) {
                throw new Error('User info update failed');
            }
            return userData;
        } catch (error) {
            throw new Error('Error updating user info');
        }
    };
    deleteUser = async (youtubeId) => {
        try {
            const userData = await this.userRepository.deleteUser(youtubeId);
            if (!userData) {
                throw new Error('User delete operation failed');
            }
            return userData;
        } catch (error) {
            throw new Error('Error deleting user');
        }
    };
}
module.exports = UserService;
