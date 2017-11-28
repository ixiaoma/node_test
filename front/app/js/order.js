require(["config"],()=>{
    require(["jquery","fnBase"],($,fnBase)=>{
        var uid = fnBase.getUserId();
        var orderPage ={
            init(){
                this.getOrderData();
                this.bindEvent();
            },
            getOrderData(state){
                    $.get(fnBase.baseUrl + "/order/getStateData",{uid,state},function(data){
                        console.log(data);
                        var sumOrderNum = 0,sumOrderPrice = 0;
                        var orderStr = "";
                            data.results.forEach((order)=>{
                                var proStr = "";
                                var sumProPrice=0,sumProNum = 0;
                                var stateStr = "";
                                if(order.state == 1){
                                stateStr = "未支付";
                                }
                                order.proInfo.forEach((pro)=>{
                                    sumProNum += pro.num*1;
                                    sumProPrice += pro.price*1;
                                    proStr +=  `<li class="order-item">
                                                <img src="${pro.img_url}" alt="">
                                                <div class="info">
                                                    <p>${pro.p_name}</p>
                                                    <p>单价:${pro.price}</p>
                                                </div>
                                                <p class="nubmer">数量：${pro.num}</p>
                                            </li>`
                                })
                                sumOrderNum += sumProNum;
                                sumOrderPrice += sumProPrice;
                                //console.log(sumOrderNum,sumProPrice)
                                  orderStr += `<div class="order-container">
                                    <div class="order-section">
                                        <div class="item-header">
                                            订单编号:${order.order_code}
                                        </div>
                                        <ul class="order-list">
                                            ${proStr}
                                        </ul>
                                        <div class="item-footer">
                                            <span>订单合计:</span>
                                            <span>总数量 <em>${sumOrderNum}</em></a>
                                            <span>总金额 <em>${sumOrderPrice}</em></a>
                                        </div>
                                        <div class="item-footer">
                                            <em>订单状态: ${stateStr}</em>
                                            <a href="javasript:;" class="order-btn pay-btn">支付</a>
                                            <a href="javasript:;" class="order-btn">收货</a>
                                        </div>
                                    </div>
                                </div>`
                            })
                            $(".content").html(orderStr);
                    })
            },
            bindEvent(){
                var that = this;
                $(".state_btn").on("click","li",function(){
                    if($(this).hasClass("active")){
                        return
                    }else{
                        $(this).addClass("active").siblings().removeClass()
                        that.getOrderData($(this).index())
                    }
                })
            }
        }
        orderPage.init();
    })
})