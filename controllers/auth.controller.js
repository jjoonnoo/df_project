const UserService = require('../services/user.service');
class AuthController {
    userService = new UserService();
    googleCallback = async (req, res) => {
        try {
            const googleId = req.user.googleId;
            const youtubeId = req.user.youtubeId;
            const email = req.user.email;
            const nickname = req.user.youtubeNickName;
            req.session.googleId = googleId;
            req.session.youtubeId = youtubeId;
            req.session.email = email;
            req.session.nickname = nickname;
            const user = await this.userService.findUserByYoutubeId(youtubeId);
            if (user.role == 1) {
                res.redirect('/admin');
            } else if (!user.googleId || !user.email || !user.nickname) {
                await this.userService.changedUserInfoUpdate(
                    youtubeId,
                    googleId,
                    email,
                    nickname
                );
                res.redirect('/profile');
            } else {
                req.session.user = user;
                res.redirect('/profile');
            }
        } catch (error) {
            res.redirect('/createUser');
        }
    };
}
module.exports = AuthController;
