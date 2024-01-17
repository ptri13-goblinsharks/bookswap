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

};

libraryController.deleteBook = (req,res,next) => {
  
};

libraryController.updateBook = (req, res,next) => {
    
};

module.exports = libraryController;