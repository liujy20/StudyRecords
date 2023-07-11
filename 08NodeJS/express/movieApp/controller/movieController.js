const { model } = require("mongoose");

class MovieController {
  // 查找所有电影
  async findAll(req, res) {
    let { flag } = req.query;
    let re = null;
    if (flag == 1) {
      re = await model("nowPlayingModel").find({});
    } else if (flag == 2) {
      re = await model("upComingModel").find({});
    } else {
      let re1 = await model("nowPlayingModel").find({});
      let re2 = await model("upComingModel").find({});
      re = [...re1, ...re2];
    }

    res.send({
      code: 200,
      msg: "查询成功",
      data: re,
    });
  }
  // 通过id获取电影信息
  async getMovieById(req, res) {
    let { id } = req.query;
    let [re] = await model("nowPlayingModel").find({
      id: id,
    });
    // console.log(id,movie);
    if (re) {
      res.send({
        code: 200,
        msg: "查找成功",
        data: re,
      });
    } else {
      let [re] = await model("upComingModel").find({
        id: id,
      });
      if (re) {
        res.send({
          code: 200,
          msg: "查找成功",
          data: re,
        });
      } else {
        res.send({
          code: 500,
          msg: "未找到该电影",
        });
      }
    }
  }
  // 添加电影信息
  async addMovie(req, res) {
    let re = await model("nowPlayingModel").find({
      id: req.body.id,
    });
    if (!re.length) {
      let re = await model("nowPlayingModel").create(req.body);
      res.send({
        code: 200,
        msg: "新增成功",
      });
    } else {
      res.send({
        code: 200,
        msg: "新增失败",
      });
    }
  }
  // 通过id删除电影信息
  async delMovieById(req, res) {
    let { id } = req.query;
    let re = await model("nowPlayingModel").deleteOne({
      id: id,
    });
    res.send({
      code: 200,
      msg: "删除成功",
    });
  }
  // 通过id修改电影信息
  async modifyMovieById(req, res) {
    // console.log(req.body);
    let { id } = req.body;
    let re = await model("nowPlayingModel").find({
      id: id,
    });
    // console.log(id,movie);
    if (re.length) {
      await model("nowPlayingModel").updateMany(
        {
          id: id,
        },
        {
          ...req.body,
        }
      );
      res.send({
        code: 200,
        msg: "修改成功",
      });
    } else {
      res.send({
        code: 500,
        msg: "未找到该电影",
      });
    }
  }
  // 分页查询电影数据,按评分排序
  async findMovieSortByScore(req, res) {
    let { page, count } = req.query;
    let re = await model("nowPlayingModel")
      .find({})
      .sort({
        score: -1,
      })
      .select(["title", "imgSrc"])
      .skip((page - 1) * count)
      .limit(count);

    res.send({
      code: 200,
      msg: re,
    });
  }
  // async findOrderToCinema(req,res){
  //   let re = await model('orderModel').find({}).populate('cinemaid');
  //   res.send({
  //       code: 200,
  //       message: '查询成功',
  //       data: re
  //   })
  // }
}

module.exports = MovieController;
