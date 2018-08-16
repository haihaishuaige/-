$(function(){
    init();
    function init(){
        //验证是否有token
        if(!$.checktoken()){
            mui.toast('你还没有登陆');
            //存起来当前地址
            $.setURL();
            setTimeout(function(){
                location.href = '/pages/login.html';
            },500);
            return;
        }
        getOrders();
        $('body').fadeIn(200);
    }
    //发送ajax渲染页面数据  my/orders/all
    //Authorization
    function getOrders(){
        $.ajax({
            url:'my/orders/all',
            data:{type:1},
            headers:{Authorization:$.token()},
            success:function(res){             
                if(res.meta.status==200){
                    if(res.data!=''){
                        var html = template('pyg_main',{data:res.data});
                        $('#item1 ul').html(html);
                    }
                }else{
                    mui.toast(res.meta.msg);
                }
                
            }
        })
    }
})  