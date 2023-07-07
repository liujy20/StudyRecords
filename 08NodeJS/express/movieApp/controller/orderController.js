const { model } = require("mongoose");

class orderController {
  async findAll(req, res) {
    let re = await model("orderModel").find({});
    res.send({
      code: 200,
      msg: re,
    });
  }
  // 通过订单查询电影院
  async findOrderToCinema(req, res) {
    let re = await model("orderModel").find({}).populate("cinemaid");
    res.send({
      code: 200,
      msg: "查询成功",
      data: re,
    });
  }
  // 通过订单查询电影院,再查询电影
  async findOrderToCinemaTomovie(req, res) {
    let re = await model("orderModel")
      .find({})
      .populate({
        path: "movieid",
      })
      .populate({
        path: "cinemaid",
        populate: "movies",
      });
    res.send({
      code: 200,
      msg: "查询成功",
      data: re,
    });
  }
}

module.exports = orderController;
