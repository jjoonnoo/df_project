const UserService = require('../services/user.service');
class AuthController {
    userService = new UserService();
    googleCallback = async (req, res) => {
        const googleId = req.user.googleId;
        const youtubeId = req.user.youtubeId;
        const email = req.user.email;
        const nickname = req.user.youtubeNickName;
        req.session.googleId = googleId;
        req.session.youtubeId = youtubeId;
        req.session.email = email;
        req.session.nickname = nickname;
        const user = await this.userService.findUserByYoutubeId(youtubeId);
        if (user == null) {
            res.redirect('/createUser');
        } else if (user.role == 1) {
            res.redirect('/admin');
        } else {
            req.session.user = user;
            res.redirect('/profile');
        }
    };
}
module.exports = AuthController;
