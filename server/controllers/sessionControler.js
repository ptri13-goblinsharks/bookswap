const Session = require('../models/sessionModel');
const User = require('../models/userModel');
// check datatype of imported user

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
    Session.findOne({ cookieId: req.cookies.ssid })
        .then(session => {
            if (!session) {
                return res.redirect('/signup');
            } else {
                User.findOne({ _id: session.cookieId })
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
    Session.findOne({ cookieId: req.cookies.ssid })
        .then(session => {
            if (!session) {
                Session.create({ cookieId: req.cookies.ssid })
                    .then(() => next())
                    .catch(err => next({
                        log: 'Error in sessionController.startSession',
                        status: 400,
                        message: { err: 'Error when creating session' }
                    }))
            } else {
                return next();
            }
        })
        .catch(err => {
            return next({
                log: 'Error in sessionController.startSession',
                status: 400,
                message: { err: 'Error when finding session' }
            });
        });
}

module.exports = sessionController;
