const db = require('../models/models');


const apiController = {};

apiController.checkApi = async (req, res, next) => {
    try {
        if (res.locals.title){
            const bookTitle = res.locals.title.replaceAll(' ', '+');
            const response = await fetch('https://openlibrary.org/search.json?title=' + bookTitle);
            const data = await response.json();
            res.locals.bookData = {olKey : data.docs[0].key, title : data.docs[0].title, author : data.docs[0].author_name};
            return next();
        }
        else {
            return next();
        }
    } catch (error) {
        console.log ('Error in apiController fetch request', error)
    }
}

apiController.addToGlobalLibrary = async (req, res, next) => {
    try {
        const olWorkNumber = req.body;
        const response = await fetch('https://openlibrary.org/works/' + olWorkNumber + '.json');
        const data = await response.json();
        
    } catch (error) {
        console.log('Error in addToGlobalLibrary middleware')
    }
}

module.exports = apiController;

