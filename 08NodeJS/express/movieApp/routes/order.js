var express = require('express');
var router = express.Router();

let OrderController=require('../controller/orderController')
let orderController=new OrderController()
router.get('/findAll',(req,res)=>{
  orderController.findAll(req,res)
})
router.get('/findOrderToCinema', function(req, res) {
    orderController.findOrderToCinema(req,res)
});
router.get('/findOrderToCinemaTomovie', function(req, res) {
    orderController.findOrderToCinemaTomovie(req,res)
});

module.exports = router;