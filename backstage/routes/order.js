var express = require("express");
var async = require("async");
var router = express.Router();
var Confirm = require("../models/order");
var myOrder = new Confirm();
var User = require("../models/user");
var user = new User();
var Cart = require("../models/cart");
var myCart = new Cart();
router.get('/getConfirmData',function(req,res,next){
    var {uid,cart_ids} = req.query;
    console.log(req.query)
    async.parallel([
        function (callback) {
            myCart.getConfirmData({cart_ids},function(err,orderInfo){
                callback(err,orderInfo);
            })
        },
        function(callback){
            user.getDefaultsData({uid},function(err,adsInfo){
                callback(err,adsInfo);
            })
        }
    ],function(err,results){
        if(err){
            res.send({msgCode:2});
            throw err;
        }else{
            res.send({msgCode:1,orderInfo:results[0],adsInfo:results[1]})
        }
    })
})
//订单编号
function toDouble(num){
  if(num<10){
    num="0"+num
  }
  return num+""
}
//打乱id to  3位
function mixinId(uid){
  var id = String(uid);
  var str=(id[2]||"0")+(id[1]||"0")+id[0]
  return str
}
router.post('/getOrderData',function(req,res,next){
    var oDate = new Date()
  //生成订单号
  var order_code = ""
   order_code += oDate.getFullYear()+toDouble(oDate.getMonth()+1)+toDouble(oDate.getDate())+toDouble(oDate.getHours())+toDouble(oDate.getMinutes())+toDouble(oDate.getSeconds())+mixinId(1);

  //{...req.body,order_num}
   var params = req.body;//前端传递的数据
   params.order_code = order_code //追加 order_num 参数
   console.log(params)
    //console.log(params)
    myOrder.getOrderData(params,function(err){
        if(err){
            res.send({msgCode:2})
        }else{
            res.send({msgCode:1})
        }
    })
})
router.get('/getStateData',function(req,res,next){
    //console.log(req.query)
         myOrder.getStateData(req.query,function(err,results){
            if(err){
                res.send({msgCode:2})
                throw err;
            }else{
                res.send({msgCode:1,results})
            }
        })
})      
module.exports = router;
