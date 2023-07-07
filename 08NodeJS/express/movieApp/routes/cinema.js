let express = require("express");
let router = express.Router();

let CinemaController=require('../controller/cinemaController')
let cinemaController=new CinemaController()
router.get('/findAll',(req,res)=>{
  cinemaController.findAll(req,res)
})
router.get('/findCinemaToMovie',(req,res)=>{
  cinemaController.findCinemaToMovie(req,res)
})

module.exports=router