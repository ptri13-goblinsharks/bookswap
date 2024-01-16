const express = require('express');

const libraryController = require('../controllers/libraryController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/findBook',
  libraryController.checkLibrary,
  libraryController.checkApi,
  (req, res) => res.status(200).json(res.locals.bookData)
);

router.post('/addBook',
  libraryController.addBookToGlobal,
  
)