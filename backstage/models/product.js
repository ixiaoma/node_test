var pool = require("./pool");
class Product{
    constructor(){}
    getProductData(classID,callback){
        classID *=1
        pool.getConnection(function(err,connection){
            if(err) throw err;
            var sqlStr = "select p_id,p_name,price,img_url,number from product";
            if(classID){
               var sqlStr = sqlStr + " where class_id = "+classID
            }
                connection.query(sqlStr,function(err,results){
                    if(err) throw err;
                    callback(results);
                    //console.log(results)
                    //释放链接
                connection.release();
                })
        })
    }
    getDetialData(pid,callback){
        pool.getConnection(function(err,connection){
            if(err) throw err;
            connection.query(`select * from product where p_id=${pid}`,function(err,results){
                if(err) throw err;
                callback(results[0]);
                //console.log(results)
                connection.release();
            })
        })
    }
}
module.exports = Product;