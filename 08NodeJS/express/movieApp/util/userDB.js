let  userMode = require("../mode/userMode");

let userArr = [
  {
    account: "admin1",
    password: "ad111",
  },
  {
    account: "admin2",
    password: "ad222",
  },
  new userMode('admin3','ad333'),
];

module.exports = userArr;
