const express = require('express');

const libraryController = require('../controllers/libraryController');
const userController = require('../controllers/userController');
const apiController = require('../controllers/apiController')
const sessionController = require('../controllers/sessionController')

const router = express.Router();

router.post('/findBook',
  libraryController.checkLibrary,
  apiController.checkApi,
  (req, res) => res.status(200).json(res.locals.bookData)
);

router.post('/addBook',
  libraryController.addToGlobalLibrary,
  sessionController.isLoggedIn,
  userController.addToUserLibrary,
  (req, res) => res.status(200).json(res.locals.userLibrary)
)

// router.get('/getLibrary/:username',
//   libraryController.getUserLibrary,
//   (req, res) => res.status(200).json(res.locals.userLibrary)
// )

module.exports = router;