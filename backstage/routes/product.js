var express = require('express');
var router = express.Router();
var Product = require("../models/product");
var pro = new Product();
/* GET home page. */
router.get('/getProductData', function(req, res, next) {
    var classID = req.query.class_id
    //console.log(classID)
    pro.getProductData(classID,function(productData){
        res.send(JSON.stringify(productData))
    })
});
router.get('/getDetialData',function(req,res,next){
    var pid = req.query.p_id;
    console.log(pid)
    pro.getDetialData(pid,function(detialData){
        res.send(JSON.stringify(detialData));
    })
})
module.exports = router;
