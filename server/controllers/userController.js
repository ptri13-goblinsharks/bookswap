const bcrypt = require("bcryptjs");
const { User, Notification, Book } = require("../models/models");

const userController = {};

userController.createUser = (req, res, next) => {
    console.log("userController createUser running");
    console.log("request body ", req.body);
    const { username, password, name, address } = req.body;

    //Checks if any input fields are missing
    if (!username || !name || !password || !address) {
        return res.status(400).json({ error: "All fields are required" });
    }

    User.create({
        username,
        password,
        name,
        address,
    })
        .then((data) => {
            res.locals.user = data;
            res.locals.userID = data._id.toString();
            console.log(
                "new user is ",
                res.locals.user,
                " and id is ",
                res.locals.userID
            );

            return next();
        })
        .catch((err) => {
            return next({
                log: "Create User Error",
                status: 400,
                message: { err: "Create User Error" },
            });
        });
};

//Checking if username already exists during signup
userController.checkUser = (req, res, next) => {
    console.log("userController checkuser running");
    const { username } = req.params;
    console.log("username is ", username);
    User.findOne({ username }).then((data) => {
        console.log("data is, ", data);
        if (data === null) {
            res.locals.userAvailability = true;
        } else {
            res.locals.userAvailability = false;
        }
        console.log("user availability is ", res.locals.userAvailability);
        return next();
    });
};

userController.verifyUser = (req, res, next) => {
    console.log("verifyUser running. Req.body is ", req.body);
    const { username, password } = req.body;
    User.findOne({ username }).then((data) => {
        if (data !== null) {
            console.log("username found");
            bcrypt.compare(password, data.password, function (error, result) {
                if (result) {
                    res.locals.user = data;
                    res.locals.userID = data._id.toString();
                    res.locals.correctUser = true;
                    console.log(
                        "correct password, correct user is ",
                        res.locals.correctUser
                    );
                    return next();
                } else {
                    console.log("wrong password");
                    return res.json(false);
                    // res.locals.correctUser = false;
                    // return next();
                }
            });
        } else {
            // res.locals.correctUser = false;
            console.log("username not found");
            return res.json(false);
        }
    });
};

userController.updateUserProfile = async (req, res, next) => {
    console.log('update user profile running')
    const { name, address, instructions } = req.body;
    console.log('name, address and instructions are ', name, address, instructions);
    try {
        const updatedUser = await User.findOneAndUpdate(
            { username: res.locals.user.username },
            { name, address, instructions },
            { new: true }
        );
        res.locals.user = updatedUser;
        console.log('updated user is ,', updatedUser)
        return next();
    } catch (error) {
        console.log("userController.updateUserError");
        return next(error);
    }
}

userController.addToUserLibrary = async (req, res, next) => {
    const userId = res.locals.user._id;
    const bookId = res.locals._id;
    const currentBooks = res.locals.user.books;
    currentBooks.push([{ book: bookId }, { isAvailable: true }]);
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { books: currentBooks } },
            { new: true }
        )
        res.locals.user = updatedUser;
        return next();
    } catch (err) {
        console.log('Error in userController.addToUserLibrary: ', err);
    };
};

userController.sendSwapRequest = async (req, res, next) => {
    const { title, reqUsername, resUsername } = req.body;
    const outgoingRequests = res.locals.user.outgoingRequests;
    outgoingRequests.push({ title, reqUsername, resUsername });
    try {
        // update the current user's outgoing requests
        const updatedReqUser = await models.User.findOneAndUpdate(
            { username: res.locals.user.username },
            { outgoingRequests },
            { new: true }
        );
        res.locals.user = updatedReqUser;

        // update the other users's incoming requests and send a notification
        const resUser = await models.User.findOne({ username: resUsername });
        const incomingRequests = resUser.incomingRequests;
        incomingRequests.push({ title, reqUsername, resUsername })
        const notifications = resUser.notifications;
        const newNotification = await Notification.create({
            username: resUsername,
            message: 'You have received a new swap request',
            read: false
        });
        notifications.push(newNotification);
        const updatedResUser = await models.User.findOneAndUpdate(
            { username: resUsername },
            {
                incomingRequests,
                notifications
            },
            { new: true }
        );
        return next();
    } catch (error) {
        console.log('error in userController.sendSwapRequests: ', err);
    }
}

userController.approveSwapRequest = async (req, res, next) => {
    const { title, reqUsername, resUsername } = req.body;
    //update resUser with updated incoming requests and books
    const incomingRequests = res.locals.user.incomingRequests;
    const updatedIncomingRequests = incomingRequests.filter(request => request.title !== title);
    const updatedResBooks = res.locals.user.books.filter(el => el.book.title !== title);
    try {
        const updatedResUser = await models.User.findOneAndUpdate(
            { username: res.locals.user.username },
            {
                incomingRequests: updatedIncomingRequests,
                books: updatedResBooks
            },
            { new: true }
        );
        res.locals.user = updatedResUser;
        // update reqUser with updated outgoing requests and books, and send a notification
        const reqUser = await models.User.findOne({ username: reqUsername });
        const updatedOutgoingRequests = reqUser.outgoingRequests.filter(request => request.title !== title);
        const reqBooks = reqUser.books;
        const swappedBook = await models.Book.findOne({ title })
        reqBooks.push({ book: swappedBook })
        const notifications = reqUser.notifications;
        const newNotification = Notification.create({
            username: reqUser.username,
            notification: `Your request to swap has been approved. Please pick up your book per the instructions provided: ${updatedResUser.instructions}`
        })
        notifications.push(newNotification);
        const updatedReqUser = await models.User.findOneAndUpdate(
            { username: reqUsername },
            {
                outgoingRequests: updatedOutgoingRequests,
                books: reqBooks,
                notifications
            },
            { new: true }
        );
        return next();
    } catch (error) {
        console.log('error in userController.approveRequest: ', error);
        return next(error);
    }
}

userController.rejectSwapRequest = async (req, res, next) => {
    const { title, reqUsername, resUsername } = req.body;
    try {
        // remove incoming request from resUser
        const incomingRequests = res.locals.user.incomingRequests;
        const updatedIncomingRequests = incomingRequests.filter(request => request.title !== title);
        const resUser = await models.User.findOneAndUpdate(
            { username: res.locals.user.username },
            { incomingRequests: updatedIncomingRequests },
            { new: true }
        );
        res.locals.user = resUser;
        // remove outgoing request from reqUser and send a notification
        let reqUser = await models.User.findOne({ username: reqUsername });
        const outgoingRequests = reqUser.outgoingRequests;
        const updatedOutgoingRequests = outgoingRequests.filter(request => request.title !== title);
        const notifications = reqUser.notifications;
        const newNotification = Notification.create({
            username: reqUser.username,
            message: 'Sorry, your swap request has been declined. Try requesting another copy near you.'
        });
        notifications.push(newNotification);

        reqUser = await models.User.findOneAndUpdate(
            { username: reqUsername },
            {
                outgoingRequests: updatedOutgoingRequests,
                notifications
            },
            { new: true }
        );
        return next();
    } catch (error) {
        console.log('Error in userController.rejectSwapRequest: ', error);
        return next(error);
    }
}

userController.markReadNotification = async (req, res, next) => {
    const { id } = req.params;
    try {
        const notice = await Notification.findOneAndUpdate(
            { _id: id },
            { read: true },
            { new: true }
        );
        const notifications = res.locals.user.notifications;
        notifications.push(notice);
        const updatedUser = await User.findOneAndUpdate(
            { username: res.locals.user.username },
            { notifications },
            { new: true }
        );
        res.locals.user = updatedUser;
        return next();
    } catch (error) {
        console.log('Error in userController.markReadNotification: ', error);
        return next(error);
    }
}


module.exports = userController;
