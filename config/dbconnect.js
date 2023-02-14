const mongoose  = require("mongoose");

const dbconnect = () => {
  try {
    const conn = mongoose.connect(process.env.monogodbUrl);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("error:",error);
  }
};
module.exports = dbconnect;