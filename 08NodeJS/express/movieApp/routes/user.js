let express = require("express");

let router = express.Router();

let UserController = require("../controller/userController");
let userController = new UserController();

// 登录
router.post("/login", (req, res) => {
  userController.login(req, res);
});
// 注册
router.post("/register", (req, res) => {
  userController.register(req, res);
});
// 修改密码
router.post("/changePwd", (req, res) => {
  userController.changePwd(req, res);
});
// 检查用户
router.get("/getUserArr", (req, res) => {
  userController.get(req, res);
});

module.exports = router;
