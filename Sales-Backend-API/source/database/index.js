const mongoose = require("mongoose");
require("dotenv/config");

mongoose.connect(process.env.databaseURI, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log("Connected to mongo database successfully")
);

module.exports = mongoose;
