const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();
const cookieParser = require('cookie-parser');


// parses JSON from incoming request
app.use(express.json());
app.use(cookieParser());


const userController = require('./controllers/userController')
const cookieController = require('./controllers/cookieController')
const sessionController = require('./controllers/sessionController')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});


//Signup
app.post('/action/signup', userController.createUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
    res.status(200).json(true);
    // res.status(200).redirect('/home')
})

//Checks user availability
app.get('/action/check/:username', userController.checkUser, (req, res) => {
    console.log('availability is ', res.locals.userAvailability)
    res.json(res.locals.userAvailability);
})

//Login
app.post('/action/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
    console.log('authentication completed, correctUser is ', res.locals.correctUser)
    console.log('redirecting to home')
    res.json(res.locals.correctUser)
    // res.status(200).redirect('/home')
    // }
    // else {
    //     res.json(res.locals.correctUser)
    // }
})

//Protect server side requests to protected pages
app.get('/home', sessionController.isLoggedIn, (req, res) => {
    res.status(200).json(res.locals.user)
})

app.get('/myLibrary', sessionController.isLoggedIn, (req, res) => {
    res.status(200).json(res.locals.user)
})

//Verify active session for client side requests to protected pages
app.get('/action/auth', sessionController.isLoggedIn, (req, res) => {
    res.status(200).json(true);
})

//Logout
app.get('/action/logout', sessionController.endSession, (req, res) => {
    res.clearCookie('ssid');
    res.redirect('/');
})

//Handler for 404
app.use('*', (req, res) => {
    res.status(404).send('Page not found.');
});

//Global Error Handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ error: err });
});


app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`); });


module.exports = app;
