const models = require('../models/models.js');

const libraryController = {};

libraryController.checkLibrary = async (req, res, next) => {
  try {
    const title = { title: req.body.title };
    const book = await models.Book.findOne(title);
    if (book) {
      console.log(book);
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
    const { title, author, genre, olId, previewUrl } = req.body;
    const checkBook = await models.Book.findOne({ olId });
    if (checkBook) {
      res.locals._id = checkBook._id;
    } else {
      const book = await models.Book.create({title, author, genre, olId, previewUrl});
      res.locals._id = book._id;
    }
    return next();
  } catch (error) {
    console.log('Error in addToGlobalLibrary middleware', error);
  }
};

libraryController.deleteBook = (req, res, next) => { };

libraryController.updateBook = (req, res, next) => { };

// get all books in global library
libraryController.getAllBooks = (req, res, next) => {
  models.Book.find({})
    .then((data) => {
      res.locals.globalLibrary = data;
      console.log(data)
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


module.exports = libraryController;
