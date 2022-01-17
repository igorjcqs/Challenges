const mongoose = require("mongoose");
require("dotenv/config");

mongoose.connect(
  process.env.DATABASE_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to mongo database successfully")
);

module.exports = mongoose;
