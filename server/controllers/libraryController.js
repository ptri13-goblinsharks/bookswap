const models = require('../models/models.js')

const libraryController = {};

libraryController.checkLibrary = async (req, res, next) => {
  try {
    const title = {title: req.body.title};
    const book = await models.Book.findOne(title);
    if (book) {
      res.locals.bookData = book;
    } else {
      res.locals.title = req.body.title;
    }
    return next();
  } catch (error) {
    console.log('Error in CheckLibrary middleware')
  }
};

libraryController.getUserLibrary = async (req, res, next) => {
  try {
    const user = req.params;
    const userLibrary = await models.User.findOne(user);
    res.locals.userLibrary = userLibrary.books
  } catch (error) {
    console.log('Error in getUserLibrary middleware')
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
        const checkBook = await models.Book.findOne(olId)
        if (checkBook) {
            res.locals._id = checkBook._id
        } else {
            const book = await models.Book.create(title, author, genre, olId);
            res.locals._id = book._id
        }
        return next();
    } catch (error) {
        console.log('Error in addToGlobalLibrary middleware')
    }
};

libraryController.deleteBook = (req,res,next) => {
  
};

libraryController.updateBook = (req, res,next) => {
    
};

module.exports = libraryController;