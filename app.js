var express = require('express');
const voceRouter  = require("./routes/voce");
var app = express();

app.use(express.json());

app.use("/api", voceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.listen(8080, () => {
  console.log("Server listen on port: ", 8080);
});

module.exports = app;
