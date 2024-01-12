const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();

// parses JSON from incoming request
app.use(express.json());

const userController = require('./controllers/userController.js')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});


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