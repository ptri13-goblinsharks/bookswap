const bcrypt = require('bcryptjs');
const { User } = require('../models/models');

const userController = {};

userController.createUser = (req, res, next) => {
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
        res.locals.userID = data._id
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
    const { username } = req.params;
    User.findOne({ username })
        .then((data) => {
            if (data) {
                res.locals.userAvailability = false;
                return next();
            } else {
                res.locals.userAvailibilty = true;
                return next();
            }
        })
}


userController.verifyUser = (req, res, next) => {
    const { username, password } = req.body;
    User.findOne( { username })
        .then((data) => {
            bcrypt.compare(password, data.password, function(error, result) {
                if (result) {
                    res.locals.user = data;
                    res.locals.userID = data._id;
                    res.locals.correctUser = true
                    return next();
                }
                else {
                    res.locals.correctUser = false;
                    return next();
                }
            })
        })
}

module.exports = userController;