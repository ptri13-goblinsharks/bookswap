const bcrypt = require('bcryptjs');
const { User, Notification, Book } = require('../models/models');

const userController = {};

userController.createUser = (req, res, next) => {
  console.log('userController createUser running');
  console.log('request body ', req.body);
  const { username, password, name, address } = req.body;

  //Checks if any input fields are missing
  if (!username || !name || !password || !address) {
    return res.status(400).json({ error: 'All fields are required' });
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
        'new user is ',
        res.locals.user,
        ' and id is ',
        res.locals.userID
      );

      return next();
    })
    .catch((err) => {
      return next({
        log: 'Create User Error',
        status: 400,
        message: { err: 'Create User Error' },
      });
    });
};

//Checking if username already exists during signup
userController.checkUser = (req, res, next) => {
  console.log('userController checkuser running');
  const { username } = req.params;
  console.log('username is ', username);
  User.findOne({ username }).then((data) => {
    console.log('data is, ', data);
    if (data === null) {
      res.locals.userAvailability = true;
    } else {
      res.locals.userAvailability = false;
    }
    console.log('user availability is ', res.locals.userAvailability);
    return next();
  });
};

userController.verifyUser = (req, res, next) => {
  console.log('verifyUser running. Req.body is ', req.body);
  const { username, password } = req.body;
  User.findOne({ username }).then((data) => {
    if (data !== null) {
      console.log('username found');
      bcrypt.compare(password, data.password, function (error, result) {
        if (result) {
          res.locals.user = data;
          res.locals.userID = data._id.toString();
          res.locals.correctUser = true;
          console.log(
            'correct password, correct user is ',
            res.locals.correctUser
          );
          return next();
        } else {
          console.log('wrong password');
          return res.json(false);
          // res.locals.correctUser = false;
          // return next();
        }
      });
    } else {
      // res.locals.correctUser = false;
      console.log('username not found');
      return res.json(false);
    }
  });
};

userController.updateUserProfile = async (req, res, next) => {
  console.log('update user profile running');
  const { name, address, instructions } = req.body;
  console.log(
    'name, address and instructions are ',
    name,
    address,
    instructions
  );
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: res.locals.user.username },
      { name, address, instructions },
      { new: true }
    );
    res.locals.user = updatedUser;
    console.log('updated user is ,', updatedUser);
    return next();
  } catch (error) {
    console.log('userController.updateUserError');
    return next(error);
  }
};

userController.addToUserLibrary = async (req, res, next) => {
  const userId = res.locals.user._id;
  // const { username } = req.params;
  const user = await User.findOne({ username: res.locals.user.username });
  // const user = await User.findOne({ username });
  const book = res.locals.book;
  // const bookId = res.locals.book._id;
  // const currentBooks = res.locals.user.books;
  const currentBooks = [...user.books];
  // currentBooks.push([{ book: bookId }, { isAvailable: true }]);
  currentBooks.push({ book });
  try {
    if (!user.books.findIndex((el) => el.book.title === book.title)) {
      console.log('Book Exists in User Library!');
      res.locals.user = user;
      return next();
    } else {
      const updatedUser = await User.findOneAndUpdate(
        // { _id: userId },
        { username: res.locals.user.username },
        // { username },
        { $set: { books: currentBooks } },
        { new: true }
      );
      // const newBookLocation = updatedUser.books.length - 1;
      // const populatedUser = await updatedUser.populate({
      //     path: `books[${newBookLocation}]`
      // })
      // res.locals.user = populatedUser;
      res.locals.user = updatedUser;
      console.log('updatedUser is ', updatedUser);
    }
    return next();
  } catch (err) {
    console.log('Error in userController.addToUserLibrary: ', err);
  }
};

userController.sendSwapRequest = async (req, res, next) => {
  const { book, reqUsername, resUsername } = req.body;
  console.log(`book is ${book}, reqUsername is ${reqUsername}, resUsername is ${resUsername}`)

  const user = await User.findOne({ username: reqUsername });
  console.log(user.username)
  // const outgoingRequests = res.locals.user.outgoingRequests;
  let outgoingRequests = user.outgoingRequests;
  console.log('outgoingRequests firstly is ', outgoingRequests)
  if (!outgoingRequests) outgoingRequests = [];
  console.log('outgoing rqeuests then is ', outgoingRequests)

  outgoingRequests.push({ book, reqUsername, resUsername });
  console.log('outgoing rqeuests finally is ', outgoingRequests)
  try {
    // update the current user's outgoing requests
    const updatedReqUser = await User.findOneAndUpdate(
      // { username: res.locals.user.username },
      { username: reqUsername },
      { outgoingRequests },
      { new: true }
    );
    res.locals.user = updatedReqUser;
    console.log('updated user is ', res.locals.user);

    // update the other users's incoming requests and send a notification
    const resUser = await User.findOne({ username: resUsername });
    let incomingRequests = resUser.incomingRequests;
    if (!incomingRequests) incomingRequests = [];
    incomingRequests.push({ book, reqUsername, resUsername });
    const notifications = resUser.notifications;
    const newNotification = await Notification.create({
      username: resUsername,
      message: `You have received a new swap request for ${book.title}. Go to your Requests page to see more details.`,
      read: false,
    });
    notifications.push(newNotification);
    const updatedResUser = await User.findOneAndUpdate(
      { username: resUsername },
      {
        incomingRequests,
        notifications,
      },
      { new: true }
    );
    return next();
  } catch (error) {
    console.log('error in userController.sendSwapRequests: ', error);
  }
};

userController.approveSwapRequest = async (req, res, next) => {
  const { book, reqUsername, resUsername } = req.body;
  console.log('usercontroller approveswaprequest running');
  //update resUser with updated incoming requests and books
  const incomingRequests = res.locals.user.incomingRequests;
  const updatedIncomingRequests = incomingRequests.filter(
    (request) => request.book.title !== book.title
  );
  const updatedResBooks = res.locals.user.books.filter(
    (el) => el && el.book && el.book.title !== book.title
  );
  try {
    const updatedResUser = await User.findOneAndUpdate(
      { username: res.locals.user.username },
      {
        incomingRequests: updatedIncomingRequests,
        books: updatedResBooks,
      },
      { new: true }
    );
    res.locals.user = updatedResUser;
    console.log('updated approver info is ', updatedResUser);
    // update reqUser with updated outgoing requests and books, and send a notification
    const reqUser = await User.findOne({ username: reqUsername });
    const updatedOutgoingRequests = reqUser.outgoingRequests.filter(
      (request) => request.book.title !== book.title
    );
    const reqBooks = reqUser.books;
    const swappedBook = await Book.findOne({ title: book.title });
    reqBooks.push({ book: swappedBook });
    const notifications = reqUser.notifications;
    const newNotification = await Notification.create({
      username: reqUser.username,
      message: `Your request to swap ${book.title} with ${resUsername} has been approved. Please pick up your book from ${updatedResUser.address} per the instructions provided: \n ${updatedResUser.instructions}`,
    });
    notifications.push(newNotification);
    const updatedReqUser = await User.findOneAndUpdate(
      { username: reqUsername },
      {
        outgoingRequests: updatedOutgoingRequests,
        books: reqBooks,
        notifications,
      },
      { new: true }
    );
    console.log('updated requested info is ', updatedReqUser);
    return next();
  } catch (error) {
    console.log('error in userController.approveRequest: ', error);
    return next(error);
  }
};

userController.rejectSwapRequest = async (req, res, next) => {
  const { book, reqUsername, resUsername } = req.body;
  try {
    // remove incoming request from resUser
    const incomingRequests = res.locals.user.incomingRequests;
    const updatedIncomingRequests = incomingRequests.filter(
      (request) =>
        request.book.title !== book.title || request.reqUsername !== reqUsername
    );
    const resUser = await User.findOneAndUpdate(
      { username: res.locals.user.username },
      { incomingRequests: updatedIncomingRequests },
      { new: true }
    );
    res.locals.user = resUser;
    // remove outgoing request from reqUser and send a notification
    let reqUser = await User.findOne({ username: reqUsername });
    const outgoingRequests = reqUser.outgoingRequests;
    const updatedOutgoingRequests = outgoingRequests.filter(
      (request) => request.book.title !== book.title
    );
    const notifications = reqUser.notifications;
    const newNotification = await Notification.create({
      username: reqUser.username,
      message: `Sorry, your swap request for ${book.title} from ${resUsername} has been declined. Try requesting another copy near you.`,
    });
    notifications.push(newNotification);

    reqUser = await User.findOneAndUpdate(
      { username: reqUsername },
      {
        outgoingRequests: updatedOutgoingRequests,
        notifications,
      },
      { new: true }
    );
    return next();
  } catch (error) {
    console.log('Error in userController.rejectSwapRequest: ', error);
    return next(error);
  }
};

userController.withdrawRequest = async (req, res, next) => {
  console.log('withdraw request running');
  const { book, reqUsername, resUsername } = req.body;
  try {
    const outgoingRequests = res.locals.user.outgoingRequests.filter(
      (item) =>
        item.book.title !== book.title || item.resUsername !== resUsername
    );
    const newReqUser = await User.findOneAndUpdate(
      { username: reqUsername },
      { outgoingRequests },
      { new: true }
    );
    res.locals.user = newReqUser;

    const resUser = await User.findOne({ username: resUsername });
    const incomingRequests = resUser.incomingRequests.filter(
      (item) =>
        item.book.title !== book.title || item.reqUsername !== reqUsername
    );
    const newResUser = await User.findOneAndUpdate(
      { username: resUsername },
      { incomingRequests },
      { new: true }
    );
    return next();
  } catch (err) {
    console.log('error in userController withdraw request: ', err);
    return next(err);
  }
};

userController.markReadNotification = async (req, res, next) => {
  console.log('userController markReadnotification running');
  const { id } = req.params;
  try {
    const notice = await Notification.findOneAndUpdate(
      { _id: id },
      { read: true },
      { new: true }
    );
    const notifications = res.locals.user.notifications.map((item) =>
      item && item._id && item._id.toString() === id ? notice : item
    );

    // const notifications = [];
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
};

userController.clearNotifications = async (req, res, next) => {
  res.locals.user.notifications.forEach(async (notice) => {
    await Notification.findOneAndDelete({ id: notice._id });
  });
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: res.locals.user.username },
      { notifications: [] },
      { new: true }
    );
    res.locals.user = updatedUser;
    return next();
  } catch (error) {
    console.log('Error in userController.markReadNotification: ', error);
    return next(error);
  }
};

userController.clearNotifications = async (req, res, next) => {
  res.locals.user.notifications.forEach(async (notice) => {
    await Notification.findOneAndDelete({ id: notice._id });
  });

  const updatedUser = await User.findOneAndUpdate(
    { username: res.locals.user.username },
    { notifications: [] },
    { new: true }
  );
  res.locals.user = updatedUser;
};

module.exports = userController;
