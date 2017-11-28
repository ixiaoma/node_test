var pool = require("./pool");

class User{
    constructor(){}
    reg({username,password},callback){
        pool.getConnection(function(err,connection){
            if(err) throw err;
            connection.query(`select * from user where name = ${username}`,function(err,results){
                if(results.length){
                    callback(0);
                    connection.release();
                }else{
                    connection.query(`insert into user (name,pass) values (${username},${password})`,function(err){
                        if(err) throw err;
                        callback(1);
                        connection.release();
                    })
                }
            })
        })
    }
    login({username,password},callback){
        pool.getConnection(function(err,connection){
            if(err) throw err;
            connection.query(`select * from user where name = ${username}`,function(err,results){
                if(err) throw err;
                if(results.length){
                    var userInfo = results[0];
                    if(password == results[0].pass){
                        callback(1,userInfo)
                    }else{
                        callback(2);
                    }
                }else{
                    callback(0);
                }
                connection.release();
            })
        })
    }
    getDefaultsData({uid},callback){
        pool.getConnection(function(err,connection){
            if(err) throw err
            connection.query(`select * from address where u_id = ${uid} and first = 1`,function(err,results){
                if(err) throw err;
                callback(err,results);
                connection.release();
            })
        })
    }
}
module.exports = User; 