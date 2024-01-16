const bcrypt = require('bcryptjs');
const { User } = require('../models/models');

const userController = {};

userController.createUser = (req, res, next) => {
    console.log("userController createUser running")
    console.log("request body ", req.body)
    const { username, password, name, address, zipcode } = req.body;

    //Checks if any input fields are missing
    if (!username || !name || !password || !address || !zipcode) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    User.create({
        username,
        password,
        name,
        address,
        zipcode
    })
        .then((data) => {
            res.locals.user = data;
            res.locals.userID = data._id.toString();
            console.log('new use is ', res.locals.user, ' and id is ', res.locals.userID)

            return next()
        })
        .catch((err) => {
            return next({
                log: 'Create User Error',
                status: 400,
                message: { err: 'Create User Error' }
            })
        });
}

//Checking if username already exists during signup
userController.checkUser = (req, res, next) => {
    console.log('userController checkuser running')
    const { username } = req.params;
    console.log('username is ', username)
    User.findOne({ username })
        .then((data) => {
            console.log('data is, ', data)
            if (data === null) {
                res.locals.userAvailability = true;
            } else {
                res.locals.userAvailability = false;
            }
            console.log('user availability is ', res.locals.userAvailability)
            return next();
        })
}


userController.verifyUser = (req, res, next) => {
    console.log('verifyUser running. Req.body is ', req.body)
    const { username, password } = req.body;
    User.findOne({ username })
        .then((data) => {
            if (data !== null) {
                (console.log('username found'))
                bcrypt.compare(password, data.password, function (error, result) {
                    if (result) {
                        res.locals.user = data;
                        res.locals.userID = data._id.toString();
                        res.locals.correctUser = true
                        console.log('correct password, correct user is ', res.locals.correctUser)
                        return next();
                    }
                    else {
                        console.log('wrong password')
                        return res.json(false);
                        // res.locals.correctUser = false;
                        // return next();
                    }
                })
            } else {
                // res.locals.correctUser = false;
                console.log('username not found')
                return res.json(false)
            }
        })
}

module.exports = userController;
