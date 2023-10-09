
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');

//统计居民总数，签约居民数量，待处理服务量，已完成服务量
module.exports.getS_TR_SR_SD_SDed =async function (req, res) {
    let total=await db.get('SELECT COUNT(*) count FROM chcs_resident WHERE flag=0');
    let sign=await db.get('SELECT COUNT(DISTINCT residentId) count FROM chcs_sign WHERE flag=0 AND status=3');
    let serviceDetail=await db.get('SELECT COUNT(*) count FROM chcs_serviceDetail WHERE flag=0 AND status=0 OR status=1');
    let finishService=await db.get('SELECT COUNT(*) count FROM chcs_serviceDetail WHERE flag=0 AND status=2');
    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功！',
        data:{
            total:(total!=undefined?total.count:0),
            signCount:(sign!=undefined?sign.count:0),
            serviceCount:(serviceDetail!=undefined?serviceDetail.count:0),
            finishService:(finishService!=undefined?finishService.count:0)
        }
    });
}
//统计指定月数的居民数量，签约量，服务量
module.exports.getS_R_S_SByMonths =async function (req, res) {
    let months=parseInt(req.body.months);
    let residentArr=new Array();
    let signArr=new Array();
    let serviceArr=new Array();
    let d=new Date();
    for(let i=months;i>0;i--){
        let m=d.getMonth()+1;
        m=m<9?'0'+m:m;
        let r=await db.get('SELECT COUNT(*) count FROM chcs_Resident WHERE flag=0 AND createTime LIKE ?',[`${d.getFullYear()}-${m}%`]);
        residentArr.push([`1/${d.getMonth()+1}`,r!=undefined?r.count:0]);
        let s=await db.get('SELECT COUNT(*) count FROM chcs_sign WHERE flag=0 AND subscribeTime LIKE ?',[`${d.getFullYear()}-${m}%`]);
        signArr.push([`1/${d.getMonth()+1}`,s!=undefined?s.count:0]);
        let sc=await db.get('SELECT COUNT(*) count FROM chcs_serviceDetail WHERE flag=0 AND submissionTime LIKE ?',[`${d.getFullYear()}-${m}%`]);
        serviceArr.push([`1/${d.getMonth()+1}`,sc!=undefined?sc.count:0]);

        d.setMonth(d.getMonth()-1);
    }
    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功！',
        data:{
            resident:residentArr,
            sign:signArr,
            service:serviceArr
        }
    });
}
//待办提醒(待审核签约申请，待审核服务申请，待完成服务)
module.exports.getToDealt =async function (req, res) {
    let sign=await db.get('SELECT COUNT(*) count FROM chcs_sign WHERE flag=0 AND status=0');
    let service=await db.get('SELECT COUNT(*) count FROM chcs_serviceDetail WHERE flag=0 AND status=0');
    let fService=await db.get('SELECT COUNT(*) count FROM chcs_serviceDetail WHERE flag=0 AND status=1');
    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功！',
        data:{
            sign:sign!=undefined?sign.count:0,
            service:service!=undefined?service.count:0,
            fService:fService!=undefined?fService.count:0,
        }
    });
}
//居民标签统计
module.exports.getResidentLabelStatistics =async function (req, res) {
    let labelArr=await db.query('SELECT id,name FROM chcs_label WHERE flag=0 AND status=0 OR status=1');
    let pList=labelArr.map(async l=>{
        let p=db.get('SELECT COUNT(*) count FROM chcs_residentLabel_relation WHERE flag=0 AND labelId=?',[l.id]);
        let count=await p;
        l['count']=(count!=undefined?count.count:0);
        return p;
    });
    Promise.all(pList).then(()=>{
        common.sendResponse(res, 200, {
            code: 200,
            msg: '查询成功！',
            data:labelArr
        });
    });
}
//居民指标异常
//血糖 空腹血糖：3.9-6.1mmol/L  餐后2小时血糖：4.4-7.8mmol/L
//血压 收缩压：90-139mmHg，舒张压：60-89mmHg
//心率 60~100次/分
module.exports.getResidentHealth =async function (req, res) {
    let rs=await db.get('SELECT * FROM (SELECT residentId,bloodSugar,createTime FROM chcs_residentBloodSugar WHERE flag=0 AND bloodSugar<3.9 OR bloodSugar>6.1) a INNER JOIN (SELECT id,name,gender,picture,birthday FROM chcs_resident) b ON a.residentId=b.id ORDER BY a.createTime DESC LIMIT 1');
    rs['title']=(rs.bloodSugar<3.9?'血糖过低':'血糖过高');
    rs['age']=new Date().getFullYear()-new Date(rs.birthday).getFullYear();

    let rb=await db.get('SELECT * FROM (SELECT residentId,diastolic,systolic,createTime FROM chcs_residentBloodPressure WHERE flag=0 AND diastolic<60 OR diastolic>89 OR systolic<90 OR systolic>139) a INNER JOIN (SELECT id,name,gender,picture,birthday FROM chcs_resident) b ON a.residentId=b.id ORDER BY a.createTime DESC LIMIT 1');
    rb['title']='血压异常';
    rb['age']=new Date().getFullYear()-new Date(rb.birthday).getFullYear();

    let rhr=await db.get('SELECT * FROM (SELECT residentId,heartRate,createTime FROM chcs_residentHeartRate WHERE flag=0 AND heartRate<60 OR heartRate>100) a INNER JOIN (SELECT id,name,gender,picture,birthday FROM chcs_resident) b ON a.residentId=b.id ORDER BY a.createTime DESC LIMIT 1');
    rhr['title']=(rhr.heartRate<60?'心率过低':'心率过高');
    rhr['age']=new Date().getFullYear()-new Date(rhr.birthday).getFullYear();
    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功！',
        data:{
            BS:rs,
            BP:rb,
            HR:rhr
        }
    });
}

//本周签约概况
module.exports.getThisWeekSign =async function (req, res) {
    //如何获取本周日期
    let d=new Date();
    const year=d.getFullYear();
    const month=d.getMonth()+1;
    const day=d.getDate();
    const week=d.getDay();
    let start=day-week+1;
    let end=day-week+7;
    let result={};
    for(let i=start;i<=end;i++){
        let date=`${year}-${month<10?'0'+month:month}-${i<10?'0'+i:i}`;
        let r=await db.query('SELECT chcs_team.id,name,ifnull(count,0) count FROM chcs_team LEFT JOIN (SELECT teamId,COUNT(*) count FROM chcs_sign WHERE flag=0 AND subscribeTime LIKE ? GROUP BY teamId) t ON chcs_team.id=t.teamId WHERE chcs_team.flag=0',[`${date}%`]);
        r.forEach(rr=>{
            let ra;
            if(result[rr.name]){
                ra=result[rr.name];
            }else{
                ra=[];
            }
            let o={};
            o[date]=rr.count;
            ra.push(o);
            result[rr.name]=ra;
        })
    }
    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功！',
        data:result
    });
}

