const express = require('express');

const libraryController = require('../controllers/libraryController');
const userController = require('../controllers/userController');
const apiController = require('../controllers/apiController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.post(
  '/action/findBook',
  libraryController.checkLibrary,
  apiController.checkApi,
  (req, res) => res.status(200).json(res.locals.bookData)
);

router.post(
  '/action/addBook/',
  libraryController.addToGlobalLibrary,
  sessionController.isLoggedIn,
  userController.addToUserLibrary,
  (req, res) => res.status(200).json(res.locals.user.books)
);

router.get(
  '/action/globalLibrary',
  libraryController.getAllBooks,

  (req, res) => {
    // console.log(res.locals.globalLibrary);
    res.status(200).json(res.locals.globalLibrary);
  }
);

router.post(
  '/action/retrieveBook',
  libraryController.retrieveBook,
  (req, res) => {
    res.status(200).json(res.locals.foundBooks);
  }
);

router.delete(
  '/action/deleteBook',
  sessionController.isLoggedIn,
  libraryController.retrieveBook,
  libraryController.deleteBook,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

router.delete(
  '/action/deleteBook',
  sessionController.isLoggedIn,
  libraryController.retrieveBook,
  libraryController.deleteBook,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

router.post(
  '/action/sendSwapRequest',
  // sessionController.isLoggedIn,
  userController.sendSwapRequest,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

router.post(
  '/action/approveSwapRequest',
  sessionController.isLoggedIn,
  userController.approveSwapRequest,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

router.post(
  '/action/rejectSwapRequest',
  sessionController.isLoggedIn,
  userController.rejectSwapRequest,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

router.post(
  '/action/withdrawRequest',
  sessionController.isLoggedIn,
  userController.withdrawRequest,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);
// router.get('/getLibrary/:username',
//   libraryController.getUserLibrary,
//   (req, res) => res.status(200).json(res.locals.userLibrary)
// )

module.exports = router;
