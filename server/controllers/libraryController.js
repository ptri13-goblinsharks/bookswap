const models = require('../models/models.js');

const libraryController = {};

libraryController.checkLibrary = async (req, res, next) => {
  try {
    const title = { title: req.body.title };
    const book = await models.Book.findOne(title);
    if (book) {
      res.locals.bookData = book;
    } else {
      res.locals.title = req.body.title;
    }
    return next();
  } catch (error) {
    console.log('Error in CheckLibrary middleware');
  }
};

libraryController.getUserLibrary = async (req, res, next) => {
  try {
    const user = req.params;
    const userLibrary = await models.User.findOne(user);
    res.locals.userLibrary = userLibrary.books;
  } catch (error) {
    console.log('Error in getUserLibrary middleware');
  }
};

// libraryController.checkApi = async (req, res, next) => {
//   // try {
//   //   if (res.locals.title) {

//   //   }
//   // } catch (error) {

//   // }
// };

libraryController.addToGlobalLibrary = async (req, res, next) => {
  try {
    const { title, author, genre, olId } = req.body;
    const checkBook = await models.Book.findOne(olId);
    if (checkBook) {
      res.locals._id = checkBook._id;
    } else {
      const book = await models.Book.create(title, author, genre, olId);
      res.locals._id = book._id;
    }
    return next();
  } catch (error) {
    console.log('Error in addToGlobalLibrary middleware');
  }
};

libraryController.deleteBook = (req, res, next) => { };

libraryController.updateBook = (req, res, next) => { };

// get all books in global library
libraryController.getAllBooks = (req, res, next) => {
  models.Book.find({})
    .then((data) => {
      res.locals.globalLibrary = data;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'libraryController.getAllBooks error',
        status: 400,
        message: { err: 'error getting all books from global library' },
      });
    });
};

libraryController.retrieveBook = async (req, res, next) => {
  const { title } = req.body;
  try {
    // find all books
    const results = await models.User.aggregate([
      { $unwind: '$books' },
      { $match: { books: title, isAvailable: true } },
      { $project: { _id: 0, username: 1, address: 1, books: 1 } },
    ]);
    // save books and users in object in {user: user, book: book} format in res.locals.books
    res.locals.foundBooks = results;
    console.log(results);
    return next();
  } catch (error) {
    console.log('Error in libraryController.retrieveBook: ', error);
  }
};

libraryController.sendSwapRequest = async (req, res, next) => {
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
    // update the other users's incoming requests
    const resUser = await models.User.findOne({ username: resUsername });
    const incomingRequests = resUser.incomingRequests;
    incomingRequests.push({ title, reqUsername, resUsername })
    const updatedResUser = await models.User.findOneAndUpdate(
      { username: resUsername },
      { incomingRequests },
      { new: true }
    );
    res.locals.user = updatedReqUser;
    return next();
  } catch (error) {
    console.log('error in libraryController.sendSwapRequests: ', err);
  }
}

libraryController.approveSwapRequest = async (req, res, next) => {
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
    res.locals.user = updatedUser;
    // update reqUser with updated outgoing requests and books
    const reqUser = await models.User.findOne({ username: reqUsername });
    const updatedOutgoingRequests = reqUser.outgoingRequests.filter(request => request.title !== title);
    const reqBooks = reqUser.books;
    const swappedBook = await models.Book.findOne({ title })
    reqBooks.push({ book: swappedBook })
    const updatedReqUser = await models.User.findOneAndUpdate(
      { username: reqUsername },
      {
        outgoingRequests: updatedOutgoingRequests,
        books: reqBooks
      },
      { new: true }
    );
    return next();
  } catch (error) {
    console.log('error in libraryController.approveRequest');
  }
}

libraryController.rejectSwapRequest = async (req, res, next) => {
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
    // remove outgoing request from reqUser
    let reqUser = await models.User.findOne({ username: reqUsername });
    const outgoingRequests = reqUser.outgoingRequests;
    const updatedOutgoingRequests = outgoingRequests.filter(request => request.title !== title);
    reqUser = await models.User.findOneAndUpdate(
      { username: reqUsername },
      { outgoingRequests: updatedOutgoingRequests },
      { new: true }
    );
    return next();
  } catch (error) {
    console.log('Error in libraryController.rejectSwapRequest: ', error);
  }
}

module.exports = libraryController;
