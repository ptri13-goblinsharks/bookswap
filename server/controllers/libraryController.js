const models = require('../models/models.js')

const libraryController = {};

libraryController.addBook = async (req, res, next) => {
  await models.Book.create(req.body);
  return next();
}

libraryController.deleteBook = (req,res,next) => {
  
}

libraryController.updateBook = (req, res,next) => {
    
}