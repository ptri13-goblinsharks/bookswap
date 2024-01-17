const express = require('express');

const databaseController = require('../controllers/libraryController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/findBook',
  libraryController.checkLibrary,
  apiController.checkApi,
  (req, res) => res.status(200).json(res.locals.bookData)
);

router.post('/addBook',
  libraryController.addToGlobalLibrary,
  userController.addToUserLibrary,
  (req, res) => res.status(200).json(res.locals.userLibrary)
)

router.get('/getLibrary/:user',
  userController.getLibrary,
  (req, res) => res.status(200).json(res.locals.userLibrary)
)