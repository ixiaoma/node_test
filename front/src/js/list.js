require(['config'],function(){
    require(['jquery',"fnBase"],function($,fnBase){
        var productObj = {
            init(){
                this.getListData();
                this.getClassData();
                this.bindEvent();
            },
            getListData(id){
                //http:localhost:3000/api/product/getListData
                $.get(fnBase.baseUrl+"/product/getProductData",{class_id:id},function(data){
                    //console.log(data);
                    $(".product-list").empty();
                    data&&data.forEach(ele=>{
                        $(".product-list").append(`<li class="product-item">
                                                    <a href="detail.html?p_id=${ele.p_id}">
                                                    <img src="${ele.img_url}" alt="">
                                                    <p>${ele.p_name}</p>
                                                    <p>
                                                        <span>
                                                            价格:<em>￥${ele.price}</em>
                                                        </span>
                                                        <span>
                                                            销量:${ele.number}
                                                        </span>
                                                    </p>
                                                    </a>
                                                </li>`)
                                        })
                },"json")
            },
            getClassData(){
                $.get(fnBase.baseUrl+"/classify/getClassData",function(data){
                    //console.log(data)
                    data.forEach(ele=>{
                        $(".class-list").append(`<li id = "${ele.class_id}">${ele.class_name}</li>`)
                    })
                },"json")
            },
            bindEvent(){
                var that = this;
                $(".class-list").on("click","li",function(){
                    console.log($(this).attr("id"))
                    var id = $(this).attr("id");
                    that.getListData(id)
                })
            }
        }
        productObj.init()
    })
})
