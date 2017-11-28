require(["config"],()=>{
    require(["jquery","fnBase"],($,fnBase)=>{
        var uid = fnBase.getUserId();
        var cart_ids = fnBase.getQueryData("cart_ids");
        var ads_id,total_price,total_num;
        var order_ids = order_numbers = "";
        console.log(uid,cart_ids)
        var confirmPage={
            init(){
                this.getConfirmData();
                this.bindEvent();
            },
            getConfirmData(){
                $.get(fnBase.baseUrl+"/order/getConfirmData",{cart_ids,uid},function(data){
                    console.log(data)
                if(data.msgCode == 1){
                        $(".receiveMsg").append(`<li>收件人：<span class="receive">${data.adsInfo[0].ads_name}</span></li>
                                                <li>地址：<span class="address">${data.adsInfo[0].detail}</span></li>
                                                <li>手机号码：<span class="phone">${data.adsInfo[0].mobile}</span></li>`)
                        ads_id = data.adsInfo[0].ads_id;
                        total_num = total_price = 0;
                        if(data.orderInfo.length){
                        data.orderInfo.forEach((ele,index)=>{
                            var sum = ele.p_num * ele.price
                            order_ids += (index?",":"")+ele.p_id;
                            order_numbers += (index?",":"")+ele.p_num;
                            //console.log(order_ids,order_numbers)
                            $(".order-list").append(`<li class="order-item"><img src="${ele.img_url}">
                                                    <p class="p_name">${ele.p_name}</p>   
                                                    <div><p> 数量：<span class="num">${ele.p_num}</span><p>
                                                        <p> 单价：￥<span class="price">${ele.price}</span></p>
                                                    </div>
                                                    </li>`)
                                                    total_num += ele.p_num;
                                                    total_price += sum;
                        })
                            $(".all_price").text(total_price)
                        }else{
                        $(".order-list").text("暂无订单信息").css({"font-size":"30px","text-align":"center","margin-top":"100px"})
                        }
                    }
                })
            },
            bindEvent(){
                $(".order-btn").click(function(){
                    var params = {uid,cart_ids,ads_id,order_ids,order_numbers,total_price}
                    console.log(params)
                    if(params.order_ids){
                        $.post(fnBase.baseUrl+"/order/getOrderData",params,function(data){
                            console.log(data)
                            window.location.href= "order.html"
                        })
                    }
                })
            }
        }
        confirmPage.init();
    })
})