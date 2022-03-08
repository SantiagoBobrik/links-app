const mongoose = require("mongoose");
module.exports = () => {
  if (process.env.NODE_ENV === "dev") {
    mongoose.connect(process.env.DB_DEV_URL);
  }
  if (process.env.NODE_ENV === "test") {
    mongoose.connect(process.env.DB_TEST_URL);
  }
};
