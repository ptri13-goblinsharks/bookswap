const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();

// parses JSON from incoming request
app.use(express.json());

const userController = require('./controllers/userController')
const cookieController = require('./controllers/cookieController')
const sessionController = require('./controllers/sessionController')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});


//Signup
app.post('/signup', userController.createUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
    res.status(200).redirect('/myLibrary')
})

//Checks user availability
app.get('/check/:username', userController.checkUser, (req, res) => {
    res.json(res.locals.userAvailability)
})

//Login
app.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
    if (res.locals.correctUser) {
        res.status(200).redirect('/myLibrary')}
    else {
        res.json(res.locals.correctUser)
    }
})

//Homepage once logged in
app.get('/myLibrary', sessionController.isLoggedIn, (req, res) => {
    res.status(200).json(res.locals.user)
})

//Logout
app.get('/logout', sessionController.endSession, (req, res) => {
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