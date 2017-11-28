//加载配置
require(["config"],()=>{
    //加载依赖
    require(["jquery","fnBase"],($,fnBase)=>{
        var $cartList = $(".cart-list")
        //var uid = document.cookie.split("=")[1];
        var uid = fnBase.getUserId();
        var cartPage = {
            init(){
                this.getCartData();
                this.bindEvent();
            },
            getCartData(){
                $.get(fnBase.baseUrl+"/cart/getCartData",{uid},(data)=>{
                    console.log(data);
                    if(data.msgCode==0){
                        alert("请先登录")
                    }else if(data.cartData.length){
                        var str = ''
                        data.cartData.forEach(ele=>{
                            str+=`<li class="item" data-id="${ele.cart_id}">
                                <img src="${ele.img_url}">
                                <div class="item-cont">
                                    <p class="item-name ovfl-ellipsis2">${ele.p_name}</p>
                                    <p class="item-price">￥${ele.price}</p>
                                    <div class="calc-num">
                                        <span>数量：</span>
                                        <button class="button min">-</button>
                                        <input type="text" class="item-num" value="${ele.p_num}" readonly="">
                                        <button class="button plus">+</button>
                                    </div>
                                </div>
                                <button class="item-delete iconfont">删除</button>
                            </li>`
                        })
                        $cartList.html(str)
                    }else{
                        $cartList.html(`<p style="font-size:20px;margin-top:100px;text-align:center">购物车空空如也，去<a href="list.html">购物</a></p>`)
                    }
                },"json")
            },
            bindEvent(){
                 $(".to-confirm").click(function(){
                     var cart_ids = "";
                     $cartList.find(".item").each(function(index){
                         cart_ids += ((index?",":"")+$(this).attr("data-id"))
                     })
                     console.log(cart_ids)
                     window.location.href="confirm.html?cart_ids="+cart_ids
                 })
                //把所有按钮的事件都委托给list
                 $cartList.on("click","button",function(){
                    //无论点击谁，都需要找到 li 
                    var oLi = $(this).parents(".item")
                    var cart_id = oLi.attr("data-id"); //购物车id
                    var oItemNum = oLi.find(".item-num"); //数量的input
                    var number = oItemNum.val()*1 //数量
                    //console.log(cart_id);
                    
                    if($(this).hasClass("min")){
                         //console.log("-")
                         oItemNum.val(number-1)
                         //数据交互
                         $.post(fnBase.baseUrl+"/cart/changeNumber",
                         {cart_id,uid,p_num:number-1},
                         function(data){
                             console.log(data)
                         })
                    }else if($(this).hasClass("plus")){
                         //console.log("+")
                         oItemNum.val(number+1)
                         //数据交互
                         $.post(fnBase.baseUrl+"/cart/changeNumber",
                         {cart_id,uid,p_num:number+1},
                         function(data){
                             console.log(data)
                         })
                    }else{
                         //console.log("x")
                         oLi.remove()
                         //数据交互
                         $.post(fnBase.baseUrl+"/cart/deleteItem",{cart_id,uid},function(data){
                             console.log(data)
                             window.location.reload();
                         })
                    }
                    //差统计（自己想办法）
                 })
            }
        } 
        cartPage.init();
    })
})