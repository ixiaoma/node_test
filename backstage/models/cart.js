var pool = require("./pool");

class Cart{
    constructor(){}
    add({pid,uid},callback){
        pool.getConnection(function(err,connection){
            if(err) throw err;
            connection.query(`select * from cart where u_id = ${uid} and p_id = ${pid}`,function(err,results){
                if(err) throw err;
                 console.log(results)
                if(results.length){
                   
                    var num = results[0].p_num + 1;
                    connection.query(`update cart set p_num = ${num} where cart_id = ${results[0].cart_id}`,(err)=>{
                        callback(err);
                        console.log("增加数量")
                        connection.release();
                    })
                }else{
                    connection.query(`insert into cart (p_id,u_id,p_num) values (${pid},${uid},1)`,(err)=>{
                        callback(err)
                        console.log("添加商品")
                        connection.release();
                    })
                }
            })
        })
    }
    getCartData({uid},callback){
        pool.getConnection(function(err,connection){
            if(err) throw err;
            connection.query(`select * from cart,product where u_id = ${uid} and product.p_id = cart.p_id`,(err,results)=>{
                if(err) throw err;
                callback(results);
                //console.log(results)
                connection.release();
            })
        })
    }
    changeNumber({cart_id,p_num},callback){
        pool.getConnection(function(err,connection){
            if(err) throw err;
            connection.query(`update cart set p_num = ${p_num} where cart_id = ${cart_id}`,(err)=>{
                callback(err)
                connection.release();
            })
        })
    }
    deleteItem({cart_id},callback){
        pool.getConnection(function(err,connection){
            if(err) throw err;
            connection.query(`delete from cart where cart_id = ${cart_id}`,function(err){
                callback(err)
                connection.release();
            })
        })
    }
    getConfirmData({cart_ids},callback){
        pool.getConnection(function(err,connection){
            if(err) throw err;
            var cartIDs = cart_ids.split(",");
            console.log(cartIDs)
            var sqlStr = "select * from cart,product where";
            cartIDs.forEach((ele,index)=>{
                sqlStr += (index ? " or " : " ") + `cart_id = ${ele} and product.p_id = cart.p_id`
            })
            //console.log(sqlStr)
            connection.query(sqlStr,function(err,results){
                callback(err,results);
                //console.log(results)
                connection.release();
            })
        })
    }
}
module.exports = Cart;