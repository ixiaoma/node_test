define([], function() {
    return {
        baseUrl : "http://localhost:3000/api",
        formatTime(time){
            if(typeof time !== object){
               var oDate = new Data(time);
            }
            return oDate;
        },
        getQueryData(key){
            var query = window.location.href.split("?")[1]; //参数numer=2&pid=4&type=3
            //console.log(query)
            var value = ""
            if(query){
                var queryArr = query.split("&") //["numer=2","pid=4","type=3"]
                queryArr.forEach(function(ele){
                    var param = ele.split("="); //["pid",4]             ["numer","2"]
                    if(param[0]==key){//["pid",4] 
                         //console.log(param[1])
                         value =  param[1] //pid = 4
                    }
                })
            }
            return value
        },
        getUserId(){
            var cookieArr  = document.cookie.split("; ");
            var uid;
            cookieArr.forEach(ele=>{
                var param = ele.split("=")
                if(param[0]=="uid"){ //["uid",16]
                    uid= param[1]
                }
            })
            return uid
        }
        // getQueryData(key){
        //     var query = window.location.href.split("?")[1];
        //    //console.log(query);
        //     var value = "";
        //         if(query){
        //             var param = query.split("=");
        //                 if(param[0] == key){
        //                     value = param[1]
        //                 }
        //             // var queryArr = query.spilt("&");
        //             // queryArr.forEach(ele=>{
        //             //     var param = ele.split("=");
        //             //     if(param[0] == key){
        //             //         value = param[1]
        //             //     }
        //             //  })
        //         }
        //         return value; 
        // }
         //getCookie(){
            // var cookieArr  = document.cookie.split("; ");
            // var uid;
            // //console.log(cookieArr)
            // cookieArr.forEach(ele=>{
            // var param = ele.split("=");
            // if(param[0]=="uid"){
            //      uid= param[1];
            //   }
            // })
            //return uid;
        //}
    }
    
});