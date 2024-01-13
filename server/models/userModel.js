const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true},
    address: { type: String, required: false },
    zipcode: { type: Number, required: false }
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


module.exports = mongoose.model('User', userSchema);