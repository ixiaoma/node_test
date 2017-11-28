var express = require('express');
var router = express.Router();
var User = require("../models/user");
var user = new User();
//注册提交
router.post('/reg', function(req, res, next) {
  //req.body 前端用post方式传递的数据
  user.reg(req.body,function(msgCode){
    console.log(msgCode)
    res.send({msgCode})
  })
});
//登录提交
router.post('/login', function(req, res, next) {
  //req.body 前端用post方式传递的数据
  user.login(req.body,function(msgCode,userInfo){
    console.log(msgCode)
    //登录以后要保存登录状态
    req.session.user = userInfo
    res.send({msgCode,userInfo})
  })

});
module.exports = router;