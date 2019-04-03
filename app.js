import express from 'express';
import bodyparser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/index';
const app = express();
dotenv.config();

const port = process.env.PORT || 6000 ;
const www = process.env.WWW || './';
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cors());
app.use(express.static(www));
app.use('/api', routes);
console.log(`serving ${www}`);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
module.exports = app;
