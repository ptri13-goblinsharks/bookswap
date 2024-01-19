const db = require('../models/models');


const apiController = {};

apiController.checkApi = async (req, res, next) => {
    try {
        if (res.locals.title){
            const bookTitle = res.locals.title.replaceAll(' ', '+');
            const response = await fetch('https://openlibrary.org/search.json?title=' + bookTitle);
            const data = await response.json();
            const olId = data.docs[0].key.slice(7);
            const previewUrl = `https://covers.openlibrary.org/b/olid/${data.docs[0].cover_edition_key}-M.jpg`
            res.locals.bookData = {olId, title : data.docs[0].title, author : data.docs[0].author_name[0], previewUrl, genre:data.docs[0].subject};
            console.log(res.locals.bookData);
            return next();
        }
        else {
            return next();
        }
    } catch (error) {
        console.log ('Error in apiController fetch request', error)
    }
}

// apiController.addToGlobalLibrary = async (req, res, next) => {
//     try {
//         const olWorkNumber = req.body;
//         const response = await fetch('https://openlibrary.org/works/' + olWorkNumber + '.json');
//         const data = await response.json();
        
//     } catch (error) {
//         console.log('Error in addToGlobalLibrary middleware', error)
//     }
// }

module.exports = apiController;
