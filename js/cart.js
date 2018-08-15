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
     function getAll() {
         var token = $.token();
         $.ajax({
             url: "my/cart/all",
             headers: {
                 Authorization: token
             },
             type: 'get',
             success: function (res) {
                 // console.log(JSON.parse(res.data.cart_info));   
                 if (res.meta.status == 200) {
                     var data = JSON.parse(res.data.cart_info);
                     var html = template("pyg_main", {
                         data: data
                     });
                     $(".pyg_shopping ul").html(html);
                     //初始化数字框
                     mui('.mui-numbox').numbox()
                     prices();
                 } else {
                     localStorage.setItem("location_url", location.href);
                     location.href = "/pages/login.html";
                     return;
                 }
             }
         })
     }
     //切换按钮
     function editBtn() {
         $(".edit_btn").on('tap', function () {
             $('body').toggleClass("big_box");
             if ($('body').hasClass('big_box')) {
                 $(this).text('完成')
                 $(".pyg_shopping_img").css('padding', '0')
             } else {
                 $(this).text('编辑');
             }
         })
     }
     //点击动态计算价格
     $('.pyg_shopping').on('tap', '.mui-btn', function () {
         prices();
     })

     function prices() {
         //获取所有li的data数据  循环遍历
         var inps = $('.mui-numbox-input');
         var lis = document.querySelectorAll('.pyg_shopping li');
         var prices_nums = 0;
         var li = [];
         var vals = [];
         for (var i = 0; i < inps.length; i++) {
             vals.push($(inps[i]).val());
              li.push($(lis[i]).data('price'));
         } 
         var arr = [];
         $.each(li, function (k, v) {
             arr.push(v.goods_price)
         })
         for (var i = 0; i < arr.length; i++) {
             prices_nums += vals[i] * arr[i];
         }
         $('.pyg_dingdan_price_left span').text(prices_nums)
     }
     //点击删除按钮
     $('.delete_btn').on('tap',function(){
         var arr2 = [];
         //找到勾选上的li
         var del_check = $('.pyg_shopping [name="check_value"]:checked');
         //.data('price')  .getAttribute('data-price')
        var check_li = del_check.parents('li');
        for(var i = 0;i<$(check_li).length;i++){
            arr2.push($(check_li)[i].getAttribute('data-price'));  
        }  
        //发送ajax请求 Authorization
        var token = $.token();      
        
            
     })
 })