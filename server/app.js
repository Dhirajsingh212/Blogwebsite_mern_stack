const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserRoutes = require('./routes/UserRoutes');
const User = require('./models/UserModel');
const jwt = require('jsonwebtoken');

dotenv.config({ path: './.env' });

mongoose
  .connect(process.env.DB_LOCAL)
  .then(() => {
    console.log('db connected successfully');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use(morgan('dev'));
app.use(express.urlencoded({limit:'50mb',extended:true}));

app.use('/', UserRoutes);

module.exports = app;
