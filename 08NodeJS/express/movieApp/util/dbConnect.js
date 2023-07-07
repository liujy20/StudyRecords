let mongoose = require("mongoose");

let myUrl = "mongodb://127.0.0.1:27017/movieM";
mongoose.connect(myUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", function () {
  console.log("mongodb启动");
});

