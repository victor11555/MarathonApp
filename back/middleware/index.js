const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dbConnect = require('./db-connect');

module.exports = function useMiddleware(app) {
  app.use(morgan('dev'));
  dbConnect();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
};
