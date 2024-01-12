const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Bookswap'
})
  .then(() => console.log('Connected to Mongo DB'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const globalLibrarySchema = new Schema({
  title: {type: String, required: true},
  olId: {type: String, required: true},
  author: String,
  
})