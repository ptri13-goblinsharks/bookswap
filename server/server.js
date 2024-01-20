const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// parses JSON from incoming request
app.use(express.json());
app.use(cookieParser());

const libraryRouter = require('./routes/library');

const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

//Signup
app.post(
  '/action/signup',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    res.status(200).json(true);
    // res.status(200).redirect('/home')
  }
);

app.get('/action/getMapsKey', (req, res) => {
  res.status(200).json(googleMapsKey);
});

//Checks user availability
app.get('/action/check/:username', userController.checkUser, (req, res) => {
  console.log('availability is ', res.locals.userAvailability);
  res.json(res.locals.userAvailability);
});

//Login
app.post(
  '/action/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    console.log(
      'authentication completed, correctUser is ',
      res.locals.correctUser
    );
    console.log('redirecting to home');
    res.json(res.locals.correctUser);
    // res.status(200).redirect('/home')
    // }
    // else {
    //     res.json(res.locals.correctUser)
    // }
  }
);

//Protect server side requests to protected pages
app.get('/home', sessionController.isLoggedIn, (req, res) => {
  res.status(200).json(res.locals.user);
});

app.get('/myLibrary', sessionController.isLoggedIn, (req, res) => {
  res.status(200).json(res.locals.user);
});

app.get('/action/getUser', sessionController.isLoggedIn, (req, res) => {
  res.status(200).json(res.locals.user);
})

app.post('/action/updateUser', sessionController.isLoggedIn, userController.updateUserProfile, (req, res) => {
  res.status(200).json(res.locals.user);
})

app.get('/action/getLibrary', sessionController.isLoggedIn, (req, res) => {
  console.log('get library running');
  res.status(200).json(res.locals.user.books);
});

app.get('/action/getNotifications', sessionController.isLoggedIn, (req, res) => {
  console.log('get notifications running');
  res.status(200).json(res.locals.user.notifications);
})

app.get('/action/markAsRead/:id', sessionController.isLoggedIn, userController.markReadNotification, (req, res) => {
  res.status(200).json(res.locals.user.notifications);
})

app.get('/action/clearNotifications', sessionController.isLoggedIn, userController.clearNotifications, (req, res) => {
  res.status(200).json(res.locals.user.notifications);
})

//Verify active session for client side requests to protected pages
app.get('/action/auth', sessionController.isLoggedIn, (req, res) => {
  res.status(200).json(true);
});

//Logout
app.get('/action/logout', sessionController.endSession, (req, res) => {
  res.clearCookie('ssid');
  res.redirect('/');
});

// Library
app.use('/library', libraryRouter);

//Handler for 404
app.use('*', (req, res) => {
  res.status(404).send('Page not found.');
});

//Global Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
