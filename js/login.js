 $(function(){
     init();
     function init(){
         //左上角的a的默认跳转没有了，需要手动加上
        $("#header a").on('tap',function(){
            location.href="/index.html";
        })
        Login();
     }
     function Login(){
         //点击登陆按钮需要触发的逻辑
         $("#login_btn").on('tap',function(){
             //获取两个输入框的内容 判断是否合法再发送给后台
             var Phone_txt = $("[name='mobile']").val().trim();
             var pwd_txt = $("[name='pwd']").val().trim();
             //验证手机号是否合法
             if(!$.checkPhone(Phone_txt)){
                 mui.toast("手机号不合法");
                 return;
             }
             //判断密码是否合法  长度 > 6
             if(pwd_txt.length<6){
                mui.toast("密码不合法");
                return;
             }
             var location_url = localStorage.getItem('location_url');
             
             //验证都合法就发送ajax
             $.post("login",{
                 username:Phone_txt,
                 password:pwd_txt
             },function(res){
                 //判断回来的数据 查看是否登陆成功
                 if(res.meta.status==200){
                     //存起来接受过来的data数据 复杂类型转换
                     localStorage.setItem('token_data',JSON.stringify(res.data));
                    mui.toast(res.meta.msg);
                    setTimeout(function(){
                        if(location_url){
                            location.href = location_url;
                        }else{
                            location.href = "/index.html";  
                        }  
                    },1500)
                 }else{
                    mui.toast(res.meta.msg);
                    return;
                 }
                 
             })
             
         })
     }
 })
 
