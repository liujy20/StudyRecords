let MovieMode = require("../mode/movieMode");
let movieArr = require("../util/movieDB");

class MovieController {
  // 查找所有电影
  findAll(req, res) {
    res.send({
      code: 200,
      msg: movieArr,
    });
  }
  // 通过id获取电影信息
  getMovieById(req, res) {
    let { id } = req.query;
    let movie = movieArr.find((item) => item.id == id);
    // console.log(id,movie);
    if (movie) {
      res.send({
        code: 200,
        msg: movie,
      });
    } else {
      res.send({
        code: 500,
        msg: "未找到该电影",
      });
    }
  }
  // 添加电影信息
  addMovie(req, res) {
    let obj = new MovieMode();
    for (let k in req.body) {
      obj[k] = req.body[k];
    }
    movieArr.unshift(obj);
    res.send({
      code: 200,
      msg: "新增成功",
    });
  }
  // 通过id删除电影信息
  delMovieById(req, res) {
    let { id } = req.query;
    let index = movieArr.findIndex((val) => val.id == id);
    movieArr.splice(index, 1);
    res.send({
      code: 200,
      msg: "删除成功",
    });
  }
  // 通过id修改电影信息
  modifyMovieById(req, res) {
    console.log(req.body);
    let { id } = req.body;
    let movie = movieArr.find((item) => item.id == id);
    // console.log(id,movie);
    if (movie) {
      for (let k in req.body) {
        movie[k] = req.body[k];
      }
      res.send({
        code: 200,
        msg: movie,
      });
    } else {
      res.send({
        code: 500,
        msg: "未找到该电影",
      });
    }
  }
}

module.exports = MovieController;
