let express = require("express");

let router = express.Router();

let { model } = require("mongoose");

router.get("/findAll", async function (req, res) {
  let re = await model("cinemaModel").find({});
  res.send({
    code: 200,
    msg: re,
  });
});
router.get("/add", async function (req, res) {
  let re = await model("userModel").create({
    account: "xwg",
    password: "112233",
    age: 44,
  });
  res.send({
    code: 200,
    msg: "添加成功",
    data: re,
  });
});

router.get("/del", async function (req, res) {
  let re = await model("userModel").deleteMany({
    account: "xwg",
  });
  res.send({
    code: 200,
    msg: "删除成功",
    data: re,
  });
});

router.get("/update", async function (req, res) {
  let re = await model("userModel").updateMany(
    {
      account: "xwg",
    },
    {
      password: 11111111,
    }
  );
  res.send({
    code: 200,
    msg: "修改成功",
    data: re,
  });
});

router.get("/find", async function (req, res) {
  // 正则表达式
  re=await model('userModel').find({
    account:{
      $regex:/[2w]/
    }
  })
  // 条件满足一个即可
  // re = await model("userModel").find({
  //   $or: [
  //     {
  //       age: {
  //         $lte: 22,
  //       },
  //     },
  //     {
  //       age: {
  //         $gt: 44,
  //       },
  //     },
  //   ],
  // });
  // 两个条件都满足
  // re = await model("userModel").find({
  //   $and: [
  //     {
  //       age: {
  //         $gt: 22,
  //       },
  //     },
  //     {
  //       age: {
  //         $lt: 44,
  //       },
  //     },
  //   ],
  // });
  // 不等于22和33的
  // re=await model('userModel').find({
  //   age:{
  //     $nin:[22,33]
  //   }
  // })
  // 等于22和33的
  // re=await model('userModel').find({
  //   age:{
  //     $in:[22,33]
  //   }
  // })
  // 大于等于33
  // let re=await model('userModel').find({
  //   age:{
  //     $gte:33
  //   }
  // })
  // 大于33
  // let re=await model('userModel').find({
  //   age:{
  //     $gt:33
  //   }
  // })
  // let re=await model('userModel').find({
  //   age:33
  // })
  res.send({
    code: 200,
    msg: "查找成功",
    data: re,
  });
});
module.exports = router;
