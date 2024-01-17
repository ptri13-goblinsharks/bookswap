const Session = require('../models/sessionModel');
const { User } = require('../models/models');

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
    console.log('checking if logged in session exists')
    Session.findOne({ cookieId: req.cookies.ssid })
        .then(session => {
            if (session === null) {
                console.log('no active session found')
                return res.status(401).json(false);
            } else {
                console.log('active session found')
                User.findOne({ _id: session.cookieId })
                    .then(user => {
                        res.locals.user = user;
                        console.log('current username is ', user.username)
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
    console.log('session controller start session running');
    console.log('cookieID is ', req.cookies.ssid)
    Session.findOne({ cookieId: res.locals.userID })
        .then(session => {
            if (!session) {
                console.log('creating new session and continuing login')
                Session.create({ cookieId: res.locals.userID })
                    .then((sesh) => {
                        console.log('new session is ', sesh)
                        next()
                    })
                    .catch(err => next({
                        log: 'Error in sessionController.startSession',
                        status: 400,
                        message: { err: 'Error when creating session' }
                    }))
            } else {
                console.log('existing session found, continuing log in')
                return next();
            }
        })
        .catch(err => {
            console.log('error when creating new session')
            return next({
                log: 'Error in sessionController.startSession',
                status: 400,
                message: { err: 'Error when finding session' }
            });
        });
}

sessionController.endSession = (req, res, next) => {
    Session.findOneAndDelete({ cookieId: req.cookies.ssid})
    .then(() => next())
    .catch(err => {
        return next({
            log: 'Error in sessionController.endSession',
            status: 400,
            message: { err: 'Error when ending session' }
        });       
    })
}

module.exports = sessionController;
