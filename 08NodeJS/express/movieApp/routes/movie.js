let express = require("express");
let router = express.Router();

let MovieController = require("../controller/movieController");
let movieController = new MovieController();

router.get("/findAll", (req, res) => {
  movieController.findAll(req, res);
});
router.get("/getMovieById", (req, res) => {
  movieController.getMovieById(req, res);
});
router.post("/addMovie", (req, res) => {
  movieController.addMovie(req, res);
});
router.get("/delMovieById", (req, res) => {
  movieController.delMovieById(req, res);
});
router.get("/modifyMovieById", (req, res) => {
  movieController.modifyMovieById(req, res);
});

module.exports = router;
