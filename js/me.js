 $(function(){
     init();
     function init(){
         if(!$.checktoken()){
             mui.toast('请先登录');
             $.setURL();
             setTimeout(function(){
                 location.href = '/pages/login.html';
             },500)
         }
         $('body').fadeIn(200);
         getUsers();
         goOut();
     }
     //发送请求个人信息ajax my/users/userinfo
     function  getUsers(){
         $.ajax({
             url:"my/users/userinfo",
             headers:{Authorization:$.token()},
             success:function(res){
                 if(res.meta.status==200){
                    var html = template("pyg_main",{data:res.data})
                    $('.userName').html(html)
                 } else{
                     mui.toast(res.meta.msg)
                 }
             }
         })
     }
     //点击退出登录
     function goOut(){
         $('.goOut_login button').on('tap',function(){
             mui.confirm('你点了退出','温馨提示',['确定','取消'],function(etype){
                 if(etype.index==0){
                     //删除token
                     localStorage.removeItem('token_data');
                     //保存当前页面  调到登陆
                     $.setURL();
                     location.href = '/pages/login.html';
                     
                 }else if(etype.index==1){
                     
                     
                 }
             })
         })
     }
 })