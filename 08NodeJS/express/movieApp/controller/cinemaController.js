const { model } = require("mongoose");

class CinemaController {
  async findAll(req, res) {
    let re = await model("cinemaModel").find({});
    res.send({
      code: 200,
      msg: re,
    });
  }
  // 查询电影院播放的电影
  async findCinemaToMovie(req, res) {
    let re = await model("cinemaModel").find({}).populate("movies");
    res.send({
      code: 200,
      msg: "查询成功",
      data: re,
    });
  }
  // 通过Id查询播放该电影的电影院
  async findCinemaPlayingMovie(req, res) {
    let { _id } = req.query;
    let re = await model("cinemaModel").find({});
    re = re.filter((item) => {
      return item.movies.includes(_id);
    });
    res.send({
      code: 200,
      msg: "查询成功",
      data: re,
    });
  }
}

module.exports = CinemaController;
