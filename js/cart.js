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
                 if (res.meta.status == 200) {
                     //  var data = JSON.parse(res.data.cart_info);
                     if (res.data.cart_info != '') {
                         var data = JSON.parse(res.data.cart_info);
                         var html = template("pyg_main", {
                             data: data
                         });
                         $(".pyg_shopping ul").html(html);
                         //初始化数字框
                         mui('.mui-numbox').numbox()
                         prices();
                     }
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
         //================
         //点击删除按钮
         $('.delete_btn').on('tap', function () {
             var checked = $('.pyg_shopping [name="check_value"]:checked');
             if (checked.length == 0) {
                 mui.toast("没有选中商品");
                 return;
             }
             mui.confirm('确定要删除吗?', '警告', ['确定', '取消'], function (etype) {
                 if (etype.index == 0) {
                     //找到勾选上的li 
                     var lis = $('.pyg_shopping [name="check_value"]').not(':checked').parents('li');
                     var infos = {};
                     for (var i = 0; i < lis.length; i++) {
                         var li = lis[i];
                         var obj = $(li).data('price')
                         infos[obj.goods_id] = obj ; 
                        }
                     //发送ajax请求 Authorization
                     var token = $.token();
                     $.ajax({
                         url:'my/cart/sync',
                         type:'post',
                         data:{infos:JSON.stringify(infos)},
                         headers:{Authorization:token},
                         success:function(res){
                             if(res.meta.status==200){
                                getAll();
                             }else{
                                 mui.toast(res.meta.msg)
                             }
                         }
                     })
                 }else{
                    mui.toast('你点了取消');
                 }
             })




         })
     }
     //点击动态计算价格
     $('.pyg_shopping').on('tap', '.mui-btn', function () {
         prices();
     })

     function prices() {
         //获取所有li的data数据  循环遍历
         if ($('.pyg_shopping li')) {
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
     }

 })