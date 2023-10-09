'use strict'
let multer = require('multer')
let common = {
    printa: function() {
        console.log(3234)
    },
    sendJsonResponse: function(res,status,json) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        res.status(status);
        return res.json(json);
    },
    sendResponse: function(res,status,msg) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        res.status(status);
        return res.send(msg);
    },

    valid: function(res, msg) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        res.status(200);
        return res.send({
            code: 500,
            msg
        });
    },

    getCurDate: function() {
        let curDate = new Date();
        let year = curDate.getFullYear();
        let month = curDate.getMonth() + 1;
        if (month< 10) {
            month = "0" + month;
        }
        let date = curDate.getDate();
        if (date < 10) {
            date = "0" + date;
        }
        let hour = curDate.getHours();
        if (hour < 10) {
            hour = "0" + hour;
        }
        let minute = curDate.getMinutes();
        if (minute < 10) {
            minute = "0" + minute;
        }
        let second = curDate.getSeconds();
        if (second < 10) {
            second = "0" + second;
        }
        curDate = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second; 
        return curDate;
    }
};
module.exports = common;