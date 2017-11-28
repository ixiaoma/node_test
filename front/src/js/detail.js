/**
 * Created by hasee on 2017/7/12.
 */
require(["config"],function () { //先加载配置
    //加载完配置以后，再加载配置里面 的模块
    require(["jquery","fnBase","Swiper"],function ($,fnBase,Swiper) {
        var pid = fnBase.getQueryData("p_id") || 1; 
        var $swiperWrapper = $(".swiper-wrapper");
        var $backBtn = $(".header-btn");
        var $addCart = $(".add-cart");
        var detailPage ={
            init(){
                this.getDetialData();
                this.bindEvent();
            },
            getDetialData(){
                $.get(fnBase.baseUrl+"/product/getDetialData",{p_id:pid},function(data){
                   console.log(data)
                    var imgs =  JSON.parse(data.images);
                    //console.log(data[0].desc)
                    $swiperWrapper.empty();
                    imgs.forEach(ele=>{
                        $swiperWrapper.append(`<div class="swiper-slide"><img src="${ele}"/></div>`)
                    })
                $(".name").text(`${data.p_name}`)
                $(".price").text(`${data.price}`)
                $(".num").text(`${data.number}`)
                $(".desc").append(`${data.desc}`)
                var wrapper = new Swiper('.swiper-container',{
                            loop:true,
                            pagination: '.swiper-pagination'
                        });
                },"json")
            },
            bindEvent(){
                    $addCart.click(function(){
                    var uid = fnBase.getUserId();
                    //var uid = document.cookie.split("=")[1];
                    //console.log(uid)
                    $.get(fnBase.baseUrl+"/cart/add",{pid:pid,uid:uid},function(data){
                        //console.log(data)
                    }) 
                })
            }

    }
    detailPage.init();
    })
})





