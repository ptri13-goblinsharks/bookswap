const Session = require('../models/sessionModel');
const User = require('../models/userModel');
// check datatype of imported user

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
    const ssidCookie = res.cookies.ssid;
    Session.findOne({ cookieId: ssidCookie })
    .then(data => {
        if (!data) {
            res.redirect('/signup');
        } else {
            User.findOne({ }) // add user search criteria here
            .then(user => {
                res.locals.user = user;
                return next();
            })
        }
    })
    .catch(err => {
        return next({
            log: 'Error in sessionController.isLoggedIn',
            status: 400,
            message: { err: 'Error when verifying logged in session' }
        })
    });
};

sessionController.startSession = (req, res, next) => {
    Session.findOne({ cookieId: res.locals.userID })
    .then(data => {
        if (!data) {
            Session.create({ cookieId: res.locals.userID });
        }
        return next();
    })
    .catch(err => {
        return next({
            log: 'Error in sessionController.startSession',
            status: 400,
            message: { err: 'Error when starting session'}
        });
    });
}

module.exports = sessionController;
