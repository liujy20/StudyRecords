
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');
var Utils = require('../tool/Utils');


module.exports.testa = async function (req, res) {
    common.sendResponse(res, 200, [
        {
          "name": "",
          "value": 1111
        }
      ]);
}

module.exports.testb = async function (req, res) {
    common.sendResponse(res, 200, [
        {
          "name": "2222",
          "value": 1111
        }
      ]);
}
