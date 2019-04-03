// import mongoose from 'mongoose';
// import mongodbErrorHandler from 'mongoose-mongodb-errors';

const mongoose = require('mongoose');
const validator = require('validator');
const mongodbErrorHandler =require('mongoose-mongodb-errors');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const testSchema = new Schema({
  Question: [{
    Question: String,
    ChooseAnswer: Array
  }],
  Answers: Array,
  test: String
});
testSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('testQuestions', testSchema);