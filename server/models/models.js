const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Bookswap',
  })
  .then(() => console.log('Connected to Mongo DB'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  olId: { type: String, required: true },
  previewUrl: String,
  author: String,
  genre: String,
});

const Book = mongoose.model('book', bookSchema);

// Worked with Darren on userSchema

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: false },
  // zipcode: { type: Number, required: false },
  books: [
    { book: Schema.Types.ObjectId, ref: bookSchema },
    { isAvailable: { type: Boolean, required: true } },
    { isBorrowed: { borrowedFrom: String, borrowedOn: Date } },
  ],
});

//Hashing password
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('user', userSchema);

module.exports = {
  User,
  Book,
};
