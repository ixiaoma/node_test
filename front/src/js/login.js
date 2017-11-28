/**
 * Created by hasee on 2017/7/12.
 */
require(["config"],function () { //先加载配置
    //加载完配置以后，再加载配置里面 的模块
    require(["jquery","fnBase"],function ($,fnBase) {
        var $oLoginBtn = $(".login-btn");
        var $oName = $(".username");
        var $oPass = $(".password");
        var $oErr = $(".err-alert");
        var loginPage = {
            init(){
                this.bindEvent();
            },
            bindEvent(){
                $oLoginBtn.click(function(){
                    var username = $oName.val();
                    var password = $oPass.val();
                    if(username&&password){
                        $.post(fnBase.baseUrl+"/user/login",{username,password},function(data){
                            switch (data.msgCode){
                                case 0 : $oErr.text("该用户未注册").css("display","block");
                                break;
                                case 1 : //前后端分离验证用户是否登录（token）
                                     document.cookie = "uid="+data.userInfo.u_id;
                                     window.location.href="list.html";
                                break;
                                case 2: $oErr.text("密码输入有误").css("display","block");
                                break;
                                default:
                                break;
                            }
                        },"json")
                    }else{
                            alert("用户名密码不能为空")
                        }
                })
            }
        }
        loginPage.init();
    });
});

