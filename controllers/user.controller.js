const UserService = require('../services/user.service');
const moment = require('moment-timezone');
class UserController {
    userService = new UserService();
    findUserByYoutubeId = async (req, res) => {
        const youtubeId = req.session.youtubeId;
        const userInfo = await this.userService.findUserByYoutubeId(youtubeId);
        res.json({ userInfo });
    };
    createUser = async (req, res) => {
        const { name, address, phone, postalCode } = req.body;
        const youtubeId = req.session.youtubeId;
        const googleId = req.session.googleId;
        const email = req.session.email;
        const nickname = req.session.youtubeNickName;
        const usePersonalInfo = moment()
            .tz('Asia/Seoul')
            .add(5, 'years')
            .format('YYY-MM-DD HH:mm:ss');
        await this.userService.createUser(
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
        res.json({ message: '회원가입에 성공하였습니다.' });
    };
    updateAddress = async (req, res) => {
        const { postalCode, address } = req.body;
        const youtubeId = req.session.youtubeId;
        const user = await this.userService.findUserByYoutubeId(youtubeId);
        if (user) {
            await this.userService.updateAddress(
                youtubeId,
                address,
                postalCode
            );
        }
        res.json({ message: '회원정보 수정에 성공하였습니다.' });
    };
    deleteUser = async (req, res) => {
        const youtubeId = req.session.youtubeId;
        const user = await this.userService.findUserByYoutubeId(youtubeId);
        if (user) {
            await this.userService.deleteUser(youtubeId);
        }
        req.session.destroy();
        res.json({ message: '회원탈퇴에 성공하였습니다.' });
        res.render('index', { title: 'Home' });
    };
}
module.exports = UserController;
