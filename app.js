const express = require('express');
const voceRouter  = require("./routes/voce");
const app = express();

app.use(express.json());

app.use("/api", voceRouter);


// error handler
app.use(function(err, req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS");

  next();
});

app.listen(8080, () => {
  console.log("Server listen on port: ", 8080);
});

module.exports = app;
