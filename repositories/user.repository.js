const { User } = require('../models');
class UserRepository {
    findUserByYoutubeId = async (youtubeId) => {
        const userData = await User.findOne({
            where: { youtubeId: youtubeId },
        });
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
    };
    updateAddress = async (youtubeId, address, postalCode) => {
        const data = await User.update(
            { address: address, postalCode: postalCode },
            { where: { youtubeId: youtubeId } }
        );
        return data;
    };
    updateInfo = async (youtubeId, name, phone) => {
        const data = await User.update(
            { name: name, phone: phone },
            { where: { youtubeId: youtubeId } }
        );
        return data;
    };
    deleteUser = async (googleId) => {
        const data = await User.destroy({ where: { googleId: googleId } });
        return data;
    };
}
module.exports = UserRepository;
