 $(function () {
     init();
   
     function init() {
         //先判断用户是否登陆 
         if (!$.checktoken()) {
             //跳到登陆页面 保存现在的地址
             localStorage.setItem("location_url", location.href);
             location.href = "/pages/login.html";
             return;
         }
         $("body").fadeIn(200);
         getAll();
         editBtn();
     }
     //发送ajax my/cart/all
     function getAll(){
         var token = $.token();
        $.ajax({
            url:"my/cart/all",
            headers:{Authorization:token},
            type:'get',
            success:function(res){
               if(res.meta.status==200){
                var data =JSON.parse(res.data.cart_info);
                var html = template("pyg_main",{data:data});
                $(".pyg_shopping ul").html(html);
                //初始化数字框
                mui('.mui-numbox').numbox()
               }    
            }
        })
     } 
     function editBtn(){
         $(".edit_btn").on('tap',function(){
             $('body').toggleClass("big_box");
             if($('body').hasClass('big_box')){
                 $(this).text('完成')
                  $(".pyg_shopping_img").css('padding','0')  
             }else{
                $(this).text('编辑');
             }
         })
     }
 })