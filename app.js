/**
 * 123alor
 *
 * Simple app for checking the status of a LoRaWAN device.
 *
 * Author: ferenc.szekely@urho.eu
 * License: MIT
 *
 * Copyright (c) 2022 Urho KFT
 */
'use strict';

import express from 'express';
import path from 'path';
import cors from 'cors';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { URL } from 'url';

// Routes
import indexRouter from './routes/index.js';
import checkRouter from './routes/check.js';

dotenv.config()

const app = express();

// env stuff
const name = process.env.NAME || '123arol';
const server = process.env.SERVER || 'localhost';
const port = process.env.PORT || 3000;

const __filename = new URL('', import.meta.url).pathname;
const __dirname = new URL('.', import.meta.url).pathname;

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Route handlers
app.use(indexRouter);
app.use(checkRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  createError(404, "No such route.");
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// start
app.listen(port, server, function() {
  console.log('Open the browser at http://' + server + ':' + port + ' to use ' + name + "\n");
});

export default app;
