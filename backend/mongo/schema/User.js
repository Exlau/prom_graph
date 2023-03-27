const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { mongoConnection } = require('../mongo')

const userSchema = new mongoose.Schema({
  username: String,
  password: String
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;

  next();
})

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoConnection.model('User', userSchema);

module.exports = {
  User
}