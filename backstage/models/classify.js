var pool = require("./pool");
class Classify{
    constructor(){}
    getClassData(callback){
        pool.getConnection(function(err,connection){
            if(err) throw err;
            connection.query("select * from classify",function(err,results){
                if(err) throw err;
                callback(results);
            })
            connection.release();
        })
    }
}
module.exports = Classify;