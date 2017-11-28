/**
 * Created by hasee on 2017/7/12.
 */
require(["config"],function () { //先加载配置
    //加载完配置以后，再加载配置里面 的模块
    require(["jquery","fastclick","IScroll"],function ($,fastclick,IScroll) {
        console.log(IScroll);
        var $classList = $(".class-list");
        var $productList = $(".product-list");
        var classID = 0; //分类id
        var linenumber = 5; //每页显示的数量
        var pageCode = 0; //页码（从0开始）
        var loading = false; //是否正在加载数据 （等本次数据加载完成才能加载下一次数据）
        //启动iscroll
        var myScroll = new IScroll("#wrapper",{
            scrollbars:true,
            interactiveScrollbars:true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true,
            click:true
        });


        var listPage = function () {
            return {
                init:function () {
                    //获取数据
                    this.getClassData();
                    this.getProductData();
                    //绑定事件
                    this.bindEvent()
                },
                getProductData:function () {
                    $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",
                        {classID:classID,pageCode:pageCode,linenumber:linenumber},function (data) {
                        console.log(data);
                        //商品数据
                        var str = "";
                        if(!data){
                            str = "没有相关商品"
                        }else {
                            //有数据再循环
                            data.forEach(function (ele) {
                                str+=`<li class="product-item" data-id="${ele.goodsID}">
                                        <img src="${ele.goodsListImg}" alt="">
                                        <p>${ele.goodsName}</p>
                                    </li>`
                            });
                        }
                        $productList.html(str);
                        //等数据获取完成，更新滚动条
                        myScroll.refresh()
                    })
                },
                getClassData:function () {
                    $.get("http://datainfo.duapp.com/shopdata/getclass.php",function (data) {
                        console.log(data)
                        //分类数据
                        var str = "";
                        data.forEach(function (ele) {
                            str+=`<li data-id="${ele.classID}">${ele.className}</li>`
                        });

                        $classList.html(str)
                        
                    },"json")
                },
                getMoreData:function () {
                    loading = true;
                    // linenumber  pageCode  classID
                    pageCode++ //页码++
                    $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",
                        {classID:classID,pageCode:pageCode,linenumber:linenumber},function (data) {
                        //更多的数据需要拼接到 之前的数据后面
                            console.log(data);
                            var str = "";
                            if(data){
                                data.forEach(function (ele) {
                                    str+=`<li class="product-item" data-id="${ele.goodsID}">
                                        <img src="${ele.goodsListImg}" alt="">
                                        <p>${ele.goodsName}</p>
                                    </li>`
                                });
                            };
                            //让自己的html+新的数据
                            $productList.html($productList.html()+str)
                            loading = false //结束加载，可以加载下一次的数据;

                            //加载完更多数据。页面高度还会改变，更新滚动条
                            myScroll.refresh()

                    })

                },
                bindEvent:function () {
                    //给每一个分类 的选项绑定事件，
                    var that = this;
                    $classList.on("click","li",function () {
                        //当分类的li被点击的时候，获取分类id
                        classID = $(this).attr("data-id");
                        //通过classID获取数据 （）
                        pageCode =0;//切换分类,需要把页码变成0，滚动高度也需要归0   ()
                         //让myScroll滚动高度=0
                        myScroll.scrollTo(0,0,0);

                        that.getProductData() //重新获取数据
                    });
                    //当商品li 被点击
                    $productList.on("click","li",function () {
                        var id = $(this).attr("data-id")
                        window.location.href = "detail.html?goodsID="+id
                    });
                    myScroll.on("scrollEnd",function () {
                        if(this.y===this.maxScrollY){
                            //到底部了
                            if(loading) return;
                            that.getMoreData() //加载更多数据
                        }
                    })

                }
            }
        }();

        listPage.init();


    });
});


//到底部加载更多
//1、什么时候到底部   $(window).scrollTop()
//2、到底部以后该怎么加载更多数据（下一页）





