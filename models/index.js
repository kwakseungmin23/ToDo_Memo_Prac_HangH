const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.set("debug", true);

mongoose
  .connect(
    "mongodb+srv://Seungmin_Kwak:rhkrtmdals98@cluster0.3hbka9r.mongodb.net/dbsparta?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((value) => console.log("MongoDB 연결에 성공하였습니다."))
  .catch((reason) => console.log("MongoDB 연결에 실패하였습니다."));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

module.exports = db;
