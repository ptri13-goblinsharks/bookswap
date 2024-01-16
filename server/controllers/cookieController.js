const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
    console.log('cookieController running')
    console.log('res locals userID is ', res.locals.userID)
    res.clearCookie('ssid');
    res.cookie('ssid', res.locals.userID, { httpOnly: true });
    console.log(res.cookie.ssid)
    return next();
}

module.exports = cookieController;
