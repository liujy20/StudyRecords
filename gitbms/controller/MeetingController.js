var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');
var Utils = require('../tool/Utils');

module.exports.publishMeeting = async function (req, res) {
    let {subject, content, imgURL, subjectType, typeTitle, typeRefText,
        fkDeptId, meetingDate, meetingChair, createUserId, fkGradeTemplateId, 
        meetingType, meetingMode, txDesc, txMeetingNo, txMeetingPwd, meetingRoom, listUser} = req.body;
    //输入检查
    if (!Utils.checkRequired(subject, "主题必须输入", req)) {
        return;
    }
    if (!Utils.checkRequired(content, "会议描述必须输入", req)) {
        return;
    }
    if (!Utils.checkRequired(imgURL, "主题图片必须输入", req)) {
        return;
    }
    if (!Utils.checkRequired(subjectType, "主题类型必须输入", req)) {
        return;
    }
    if (!Utils.checkRequired(subjectType, "主题类型必须输入", req)) {
        return;
    } else {
        if (!Utils.checkRequired(typeTitle, "类型标题必须输入", req)) {
            return;
        }
        if (!Utils.checkRequired(typeRefText, "类型内容必须输入", req)) {
            return;
        }
    }

    if (!Utils.checkRequired(fkDeptId, "部门id必须输入", req)) {
        return;
    }
    if (!Utils.checkRequired(meetingDate, "会议开始时间必须输入", req)) {
        return;
    }
    if (!Utils.checkRequired(meetingChair, "主持人必须输入", req)) {
        return;
    }
    if (!Utils.checkRequired(createUserId, "会议创建人必须输入", req)) {
        return;
    }
    if (!Utils.checkRequired(fkGradeTemplateId, "评分模板必须输入", req)) {
        return;
    }
    if (!Utils.checkRequired(meetingType, "会议类型必须输入", req)) {
        return;
    }

    if (!Utils.checkRequired(meetingMode, "会议模式必须输入", req)) {
        return;
    } else if(meetingMode == "0") {
        if (!Utils.checkRequired(txMeetingNo, "腾讯会议号必须输入", req)) {
            return;
        }
        if (!Utils.checkRequired(txMeetingPwd, "腾讯会议密码必须输入", req)) {
            return;
        }
        if (!Utils.checkRequired(txDesc, "腾讯会议内容必须输入", req)) {
            return;
        }
    } else if(meetingMode == "1") {
        if (!Utils.checkRequired(meetingRoom, "线下会议室必须输入", req)) {
            return;
        }
    }
    
    if (!Utils.checkRequired(listUser, "参会人员必须输入", req)) {
        return;
    }
    


    let params = [];
    let meetingId = UUID.v1();
    params.push(meetingId);
    params.push(subject);
    params.push(content);
    params.push(imgURL);
    params.push(subjectType);
    params.push(typeTitle);
    params.push(typeRefText);
    params.push(fkDeptId);
    params.push(meetingDate);
    params.push(meetingChair);
    params.push(createUserId);
    params.push(fkGradeTemplateId);
    params.push(meetingType);
    params.push(meetingMode);
    params.push(txDesc);
    params.push(txMeetingNo);
    params.push(txMeetingPwd);
    params.push(meetingRoom);
    params.push("0");

    let sql = `insert into mt_meeting(id,subject, content, imgURL, subjectType, typeTitle, typeRefText, fkDeptId, meetingDate, meetingChair, createUserId, fkGradeTemplateId, meetingType, meetingMode, txDesc, txMeetingNo, txMeetingPwd, meetingRoom, dr) \
    values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    
    try {
        //插入会议
        let count = await db.insert(sql, params);

        //插入会议参与人
        for (let userId of listUser) {
            let joinSql = "insert into mt_meeting_join(id, joinUserId, fkMeetingId, joinTime, dr, status, signStatus) values(?,?,?,?,?,?,?)";
            let joinParams = [];
            joinParams.push(UUID.v1());
            joinParams.push(userId);
            joinParams.push(meetingId);
            joinParams.push(Utils.getCurDate());
            joinParams.push("0");
            joinParams.push("0");
            joinParams.push("0");
            let joinCount = await db.update(joinSql, joinParams);
        }

        common.sendResponse(res, 200, {code: 200, msg: "预定成功"});
    } catch(err) {
        console.log(err, 222);
        common.sendResponse(res, 200, {
            code: 500,
            msg: '预定失败',
            data: err
        });
    }
}

//预约会议室
module.exports.bookingMeetingRoom = async function (req, res) {
    let {fkRoomId, bookingDate, bookingTime, fkUserId} = req.body;
    //输入检查
    if (!Utils.checkRequired(fkRoomId, "会议室必须选择", res)) {
        return;
    }
    if (!Utils.checkRequired(bookingDate, "日期必须输入", res)) {
        return;
    }
    if (!Utils.checkRequired(bookingTime, "时间必须输入", res)) {
        return;
    }
    if (!Utils.checkRequired(fkUserId, "预定人必须输入", res)) {
        return;
    }

    //会议室是否被预约
    let room = await db.get("select * from mt_meeting_room where id = ?", [fkRoomId]);
    if (!room) {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '会议室id不正确，请检查'
        });
        return;
    }
    if (room.status == 1) {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '会议室已被预订，请重新选择'
        });
        return;
    }
    

    let params = [];

    params.push(UUID.v1());
    params.push(fkRoomId);
    params.push(bookingDate);
    params.push(bookingTime);
    params.push(fkUserId);
    params.push("0");

    let sql = `insert into mt_booking_room(id,fkRoomId, bookingDate, bookingTime, fkUserId, dr) values(?,?,?,?,?,?)`;

    
    try {
        //插入会议预定记录
        let count = await db.insert(sql, params);

        //更新会议室状态
        let upSql = "update mt_meeting_room set status = 1 where id = ?";
        let upCount = await db.update(upSql, [fkRoomId]);

        common.sendResponse(res, 200, {code: 200, msg: "预定成功"});
    } catch(err) {
        console.log(err, 222);
        common.sendResponse(res, 200, {
            code: 500,
            msg: '预定失败',
            data: err
        });
    }
    
}


//查询我参与会议
module.exports.getJoinMeeting = async function (req, res) {
    let {userId, joinDate} = req.body;
    if (!Utils.checkRequired(userId, "参会人id必须输入", res)) {
        return;
    }
    let params = [];
    params.push(userId);
    let sql = "select mt_meeting.* from mt_meeting \
            inner join mt_meeting_join on mt_meeting_join.fkMeetingId = mt_meeting.id \
            where mt_meeting_join.joinUserId = ?";
    
    //加入时间
    if (Utils.isNotEmpty(joinDate)) {
        sql = sql + " and substr(mt_meeting_join.joinTime, 0, 11) = ?";
        params.push(joinDate);
    }
    

    db.query(sql, params).then(meeting => {
        common.sendResponse(res, 200, {code: 200, msg: "查询成功", data: meeting});
    })
}

//查询我预订的会议室
module.exports.getMyBookingRoom = async function (req, res) {
    let {userId} = req.body;
    if (!Utils.checkRequired(userId, "预订人id必须输入", res)) {
        return;
    }
    let params = [];
    params.push(userId);
    let sql = "select DISTINCT mt_meeting_room.* from mt_meeting_room \
                inner join mt_booking_room on mt_meeting_room.id = mt_booking_room.fkRoomId \
                where mt_booking_room.fkUserId = ?";
    
    db.query(sql, params).then(meeting => {
        common.sendResponse(res, 200, {code: 200, msg: "查询成功", data: meeting});
    })
}

//查询评分模板
module.exports.getGradeTemplate = async function (req, res) {
    
    let sql = "select * from mt_grade_template where dr=0";

    let listTemplate = await db.query(sql, []);

    let itemSql = "select * from mt_grade_item where dr=0";
    let listItem = await db.query(itemSql, []);
    for (let template of listTemplate) {
        template.listItem = listItem.filter(item => item.fkTemplateId == template.id);
    }
    common.sendResponse(res, 200, {code: 200, msg: "查询成功", data: listTemplate});

}

//会议评分
module.exports.doGradeMeeting = async function (req, res) {
    
    let {listGradeItemId, listScore, fkUserId, fkMeetingId} = req.body;
    if (!listGradeItemId) {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '选项id必须输入'
        });
        return;
    }
    if (!listScore) {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '评分必须输入'
        });
    }
    if (listGradeItemId.length != listScore.length) {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '选项id和评分数量须保持一致'
        });
    }
    if (!Utils.checkRequired(fkUserId, "用户id必须输入", res)) {
        return;
    }
    if (!Utils.checkRequired(fkMeetingId, "会议id必须输入", res)) {
        return;
    }

    
    for (let fkGradeItemId of listGradeItemId) {
        //评分选项是否存在
        let checkItemSql = "select count(0) from mt_grade_item where id = ?";
        let existItemCount = await db.get(checkItemSql, [fkGradeItemId]);
        if (existItemCount <= 0) {
            common.sendResponse(res, 200, {
                code: 500,
                msg: '评分选项id不存在'
            });
            return;
        }
        //检查是否评过分
        let checkSql = "select count(0) from mt_grade_record where fkUserId = ? and fkMeetingId = ? and fkGradeItemId = ?";
        let existCount = await db.get(checkSql, [fkUserId, fkMeetingId, fkGradeItemId]);
        if (existCount > 0) {
            common.sendResponse(res, 200, {
                code: 500,
                msg: '您已经评过分了'
            });
            return;
        }
    }
    
    //用户是否存在
    let checkUserSql = "select count(0) from ums_member where id = ?";
    let existUserCount = await db.get(checkUserSql, [fkUserId]);
    if (existUserCount <= 0) {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '用户id不存在'
        });
        return;
    }
    //会议是否存在
    let checkMeetingSql = "select count(0) from mt_meeting where id = ?";
    let existMeetingCount = await db.get(checkMeetingSql, [fkMeetingId]);
    if (existMeetingCount <= 0) {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '会议id不存在'
        });
        return;
    }
    for (let i = 0; i < listGradeItemId.length; i++) {
        let fkGradeItemId = listGradeItemId[i];
        let score = listScore[i];
        let sql = "insert into mt_grade_record values(?,?,?,?,?,?)";
        let params =  [];
        params.push(UUID.v1());
        params.push(fkGradeItemId);
        params.push(score);
        params.push(fkUserId);
        params.push(fkMeetingId);
        params.push("0");
        await db.insert(sql, params);
    }
    common.sendResponse(res, 200, {code: 200, msg: "评分成功"});
}

//取得会议评分
module.exports.getMeetingScore = async function (req, res) {
    let {id} =req.body;
    
}