var express = require("express");
var router = express.Router();

var Classify = require("../models/classify");
var classdata = new Classify();

router.get('/getClassData',function(req,res,next){
    classdata.getClassData(function(classData){
        //console.log(classData)
        res.send(JSON.stringify(classData))
    })
})
module.exports = router;