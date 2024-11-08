const { User } = require('../models');
class UserRepository {
    findUserByYoutubeId = async (youtubeId) => {
        try {
            const userData = await User.findOne({
                where: { youtubeId: youtubeId },
            });
            return userData;
        } catch (error) {
            throw new Error('Error finding user by YouTube ID');
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
            const data = await User.create({
                googleId,
                youtubeId,
                nickname,
                email,
                name,
                address,
                phone,
                postalCode,
                usePersonalInfo,
            });
            return data;
        } catch (error) {
            throw new Error('Error creating user');
        }
    };
    changedUserInfoUpdate = async (youtubeId, googleId, email, nickname) => {
        try {
            const data = await User.update(
                { googleId: googleId, email: email, nickname: nickname },
                { where: { youtubeId: youtubeId } }
            );
            if (data[0] == 0) {
                throw new Error('No user updated');
            }
            return data;
        } catch (error) {
            throw new Error('Error updating user info');
        }
    };
    updateAddress = async (youtubeId, address, postalCode) => {
        try {
            const data = await User.update(
                { address: address, postalCode: postalCode },
                { where: { youtubeId: youtubeId } }
            );
            if (data[0] == 0) {
                throw new Error('No user updated');
            }
            return data;
        } catch (error) {
            throw new Error('Error updating address');
        }
    };
    updateInfo = async (youtubeId, name, phone) => {
        try {
            const data = await User.update(
                { name: name, phone: phone },
                { where: { youtubeId: youtubeId } }
            );
            if (data[0] == 0) {
                throw new Error('No user updated');
            }
            return data;
        } catch (error) {
            throw new Error('Error updating user info');
        }
    };
    deleteUser = async (youtubeId) => {
        try {
            const data = await User.destroy({
                where: { youtubeId: youtubeId },
            });
            if (data === 0) {
                throw new Error('No user deleted');
            }
            return data;
        } catch (error) {
            throw new Error('Error deleting user');
        }
    };
}
module.exports = UserRepository;
