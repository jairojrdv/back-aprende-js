const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors({
  origin: '*'
}));

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);

const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

app.use(express.json());
const routes = require('./routes');
app.use('/api', routes);

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server Started at ${3000}`)
})