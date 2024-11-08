const UserService = require('../services/user.service');
const moment = require('moment-timezone');
class UserController {
    userService = new UserService();
    findUserByYoutubeId = async (req, res) => {
        try {
            const youtubeId = req.session.youtubeId;
            if (!youtubeId) {
                return res.status(400).json({ message: '로그인을 해주세요.' });
            }
            const userInfo =
                await this.userService.findUserByYoutubeId(youtubeId);
            if (!userInfo) {
                return res
                    .status(404)
                    .json({ message: '사용자를 찾을 수 없습니다.' });
            }
            res.json({ userInfo });
        } catch (error) {
            res.status(500).json({
                message: '사용자 정보를 찾는 중 에러가 발생했습니다.',
            });
        }
    };
    createUser = async (req, res) => {
        try {
            const { name, address, phone, postalCode } = req.body;
            const youtubeId = req.session.youtubeId;
            const googleId = req.session.googleId;
            const email = req.session.email;
            const nickname = req.session.nickname;
            if (!name || !address || !phone || !postalCode) {
                return res
                    .status(400)
                    .json({ message: '필수 정보가 누락되었습니다.' });
            }
            const usePersonalInfo = moment()
                .tz('Asia/Seoul')
                .add(4, 'years')
                .format('YYYY-MM-DD HH:mm:ss');
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
        } catch (error) {
            res.status(500).json({
                message: '회원가입 중 에러가 발생했습니다.',
            });
        }
    };
    updateAddress = async (req, res) => {
        try {
            const { postalCode, address } = req.body;
            const youtubeId = req.session.youtubeId;
            const user = await this.userService.findUserByYoutubeId(youtubeId);
            if (!user) {
                return res
                    .status(404)
                    .json({ message: '사용자를 찾을 수 없습니다.' });
            }
            await this.userService.updateAddress(
                youtubeId,
                address,
                postalCode
            );
            res.json({ message: '주소 수정에 성공하였습니다.' });
        } catch (error) {
            res.status(500).json({
                message: '주소 수정 중 에러가 발생했습니다.',
            });
        }
    };
    updateInfo = async (req, res) => {
        try {
            const { name, phone } = req.body;
            const youtubeId = req.session.youtubeId;
            const user = await this.userService.findUserByYoutubeId(youtubeId);
            if (!user) {
                return res
                    .status(400)
                    .json({ message: '사용자를 찾을 수 없습니다.' });
            }
            await this.userService.updateInfo(youtubeId, name, phone);
            res.json({ message: '회원정보 수정에 성공하였습니다.' });
        } catch (error) {
            res.status(500).json({
                message: '회원정보 수정 중 에러가 발생했습니다.',
            });
        }
    };
    deleteUser = async (req, res) => {
        try {
            const youtubeId = req.session.youtubeId;
            const user = await this.userService.findUserByYoutubeId(youtubeId);
            if (!user) {
                return res
                    .status(404)
                    .json({ message: '사용자를 찾을 수 없습니다.' });
            }
            await this.userService.deleteUser(youtubeId);
            req.session.destroy();
            res.json({ message: '회원탈퇴에 성공하였습니다.' });
        } catch (error) {
            res.status(500).json({
                message: '회원탈퇴 중 에러가 발생했습니다.',
            });
        }
    };
}
module.exports = UserController;
