const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Configure dotenv to load environment variables
dotenv.config({
  path: './config/config.env',
});

// Set up a connection to the database
connectDB();

const app = express();

// Body parser
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
