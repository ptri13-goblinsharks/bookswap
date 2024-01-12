const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const userController = {};

userController.createUser = (req, res, next) => {
    const { username, password, address, zipcode } = req.body;

    //Checks if any input fields are missing
    if (!username || !password || !address || !zipcode) {
        return res.status(400).json({ error: 'All fields are required' });
      }

    User.create({
        username,
        password,
        address,
        zipcode
    })
    .then((data) => {
        res.locals.user = data;
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

userController.checkUser = (req, res, next) => {
    const { username } = req.body;
    User.findOne({ username })
        .then((data) => {
            if (data) {
                return res.status(400).json('Username already exists.');
            } else {
                return next();
            }
        })
}



userController.verifyUser = (req, res, next) => {

}

