var express = require('express');
var router = express.Router();
/* GET home page. */
var Cart = require("../models/cart");
var mycart = new Cart();
router.get('/add', function(req, res, next) {
        //console.log(req.query)
        if(req.query.uid || req.session.user){//两种方式判断用户是否登录
            var uid = req.query.uid || req.session.user.u_id;
            //console.log(uid)
            var pid = req.query.pid;
             mycart.add({pid,uid},function(err){
                if(!err){
                    res.send({msgCode:1})
                }else{
                    res.send({msgCode:2})
                }
            })
        }else{
            res.send({msgCode:0})
        }
});
router.get('/getCartData',function(req,res,next){
    if(req.query.uid || req.session.user){
        var uid = req.query.uid || req.session.user.u_id;
        console.log(uid)
        mycart.getCartData({uid},function(cartData){
            //console.log(cartData)
            if(cartData){
                res.send({msgCode:1,cartData})
            }else{
                res.send({msgCode:0,cartData:[]})
            }
        })
    }
});
router.post('/changeNumber',function(req,res,next){
    console.log(req.body)
    if(req.body.uid || req.session.user){
        mycart.changeNumber(req.body,function(err){
            if(err){
                res.send({msgCode:2})
            }else{
                res.send({msgCode:1})
            }
        })
    }else{
        res.send({msgCode:0})
    }
})
router.post('/deleteItem',function(req,res,next){
    if(req.body.uid || req.session.user.u_id){
        mycart.deleteItem(req.body,function(err){
            if(err){
                res.send({msgCode:2})
            }else{
                res.send({msgCode:1})
            }
        })
    }else{
        res.send({msgCode:0})
    }
})
module.exports = router;
