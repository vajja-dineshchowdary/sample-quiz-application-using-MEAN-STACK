// import mongoose from 'mongoose';
// import validator from 'validator';
// import mongodbErrorHandler from 'mongoose-mongodb-errors';

const mongoose = require('mongoose');
const validator = require('validator');
const mongodbErrorHandler =require('mongoose-mongodb-errors');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
    name: {
      type: String,
      unique: true,
      minlength: [3, 'Username must be at least 3 characters.'],
      maxlength: [25, 'Username must be less than 10 characters.'],      
      required: 'Please enter name',
      trim: true,
    },
    test: {
      type: String,
      trim: true,
      required: 'Choose atleast one test'
    }

});

userSchema.plugin(mongodbErrorHandler);


module.exports = mongoose.model('Users', userSchema);