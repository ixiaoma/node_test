var pool = require("./pool");
var async = require("async");
class Confirm{
    constructor(){}
    getOrderData({order_code,uid,ads_id,order_ids,order_numbers,total_price,cart_ids},callback){
        pool.getConnection(function(err,connection){
            if(err) throw err;
            connection.beginTransaction(function(err){
                if(err) throw err;
                async.parallel([function(callback){
                    var sqlStr = "delete from cart where ";
                    var cartIDs = cart_ids.split(",");
                    cartIDs.forEach((ele,index)=>{
                        sqlStr += (index ? " or " : " ") +"cart_id = "+ele
                    })
                    //console.log(sqlStr)
                    connection.query(sqlStr,function(err){
                        callback(err)
                    })
                },function(callback){
                    connection.query(`insert into orderlist (u_id,order_code,order_pids,order_pnums,total_price,ads_id) values (${uid},${order_code},'${order_ids}','${order_numbers}',${total_price},${ads_id})`,function(err){
                        callback(err)
                    })
                }],function(err,results){
                    if(err){
                        connection.rollback(function(err){
                            callback(err)
                            throw err;
                        })
                    }else{
                        connection.commit(function(err){
                            console.log("success")
                            callback(err)
                            connection.release();
                        })
                    }
                })
            })
            
       }) 
    }
    getStateData({uid,state},callback){
        state *=1;
        async.waterfall([(callback)=>{
            pool.getConnection((err,connection)=>{
                if(err) throw err;
                var sqlStr = `select * from orderlist where u_id = ${uid}`;
                if(state){
                    sqlStr += ` and state = ${state}`;
                }
                //console.log(sqlStr)
                connection.query(sqlStr,function(err,stateData){
                    //console.log(stateData)
                   callback(err,connection,stateData);
                })
            })
        },(connection,stateData,callback)=>{
            //console.log(stateData)
            var len = stateData.length;
            if(stateData.length){
             stateData.forEach((ele,index)=>{
                var pidArr = ele.order_pids.split(",");//添加的商品id
                var numArr = ele.order_pnums.split(",")//添加的商品数量
                //console.log(pidArr,numArr)
                //根据pid查找对应商品的数据
                var sqlStr = `select p_name,img_url,price from product where `;
                pidArr.forEach((ele,index)=>{
                    sqlStr += (index ? " or " : " ") + "p_id = " + ele;
                })
                //console.log(sqlStr)
                connection.query(sqlStr,function(err,proData){
                    if(err){
                        callback(err);
                        return
                    }
                    //console.log(proData)
                    //将商品的数量对应传入
                    proData.forEach((ele,index)=>{
                        ele.num = numArr[index]
                    })
                    ele.proInfo = proData;
                    //判断最后遍历完成后回调并释放链接
                    if(len == index+1){
                        callback(null,stateData)
                        connection.release();
                    }
                })
             })  
            }else{
                callback(null,stateData)
            }
        }],(err,results)=>{
            //console.log(results)
            callback(err,results)
        })
    }
}
module.exports = Confirm;