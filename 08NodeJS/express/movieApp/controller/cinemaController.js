const { model } = require("mongoose");

class CinemaController {
  async findAll(req,res){
    let re=await model('cinemaModel').find({})
    res.send({
      code:200,
      msg:re
    })
  }
  async findCinemaToMovie(req, res) {
    let re=await model('cinemaModel').find({}).populate('movies')
    res.send({
      code: 200,
      msg: re,
    });
  }
}

module.exports = CinemaController;
