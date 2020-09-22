const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const bodyparser = require('body-parser');

//import the driver and passenger(rider) router
const driverRouter = require('./routes/driver');
const passengerRouter = require('./routes/passenger');

const app = express();
app.use(logger('dev'));

//Passing through body parser middleware so that the request body can be read
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//handle cors policy
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/driver', driverRouter);
app.use('/api/passenger', passengerRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send error response
  res.status(err.status || 500);
  res.send('error');
});

const port = process.env.PORT || 3000;
app.listen(port);
