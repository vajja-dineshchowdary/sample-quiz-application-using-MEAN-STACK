import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

mongoose.Promise = global.Promise;

const conn = mongoose.connection;
dotenv.config();
const db = process.env.DATABASE;
mongoose.connect(db, {
  useCreateIndex: true,
  useNewUrlParser: true
})
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function () {
  console.log('Mongodb connection Established at ', db);
});
require('./model/user');
require('./model/test');

// app.get('*', (req, res) => {
//   // res.sendFile(`index.html`, { root: www });
//   res.send('app works');
// });