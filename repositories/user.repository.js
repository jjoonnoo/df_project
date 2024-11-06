const { User } = require('../models');
class UserRepository {
    findUserByYoutubeId = async (youtubeId) => {
        const data = await User.findOne({
            where: { youtubeId: youtubeId },
        });
        return data;
    };
    createUser = async (
        googleId,
        email,
        name,
        address,
        phone,
        postalCode,
        role,
        usePersonalInfo
    ) => {
        const data = await User.create({
            googleId,
            email,
            name,
            address,
            phone,
            postalCode,
            role,
            usePersonalInfo,
        });
        return data;
    };
    modifyUser = async (googleId, address, postalCode, phone) => {
        const data = await User.update(
            { address: address, postalCode: postalCode, phone: phone },
            { where: { googleId: googleId } }
        );
        return data;
    };
    deleteUser = async (googleId) => {
        const data = await User.destroy({ where: { googleId: googleId } });
        return data;
    };
}
module.exports = UserRepository;
