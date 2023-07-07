const { model, Schema } = require("mongoose");

let orderSchema = new Schema({
  orderid: String,
  userphone: String,
  movieid: {
    type: Schema.Types.ObjectId,
    ref: "nowPlayingModel",
  },
  cinemaid: {
    type: Schema.Types.ObjectId,
    ref: "cinemaModel",
  },
  seats: String,
  buytime: String,
  playtime: String,
  status: String,
});
//注册
model("orderModel", orderSchema, "order");
