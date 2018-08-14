$(function () {
    //准备一个全局变量 存放接受回来的res数据
    var getDetail;
    //接受发送过来的id
    var goods_id = $.getURL("goods_id");
    init();

    function init() {
        //调用ajax函数
        getDetail();
        addCart();
    }
    //发送ajax获取动态数据
    function getDetail() {
        $.get("goods/detail", {
            goods_id: goods_id
        }, function (res) {
            getDetail = res.data;
            if (res.meta.status == 200) {
                var html = template("view_banner_conten", {
                    data: res.data
                });
                $(".pyg_view").html(html); //初始化轮播图
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 1500 //自动轮播周期，若为0则不自动播放，默认为0；
                });
            }
        })
    }
    //点击加入购物车 my/cart/add
    function addCart() {
        $('.add_goods').on('tap', function () {
            //存起来当前路径
            localStorage.setItem('location_url', location.href);
              //点击的时候，先判断有没有token  没有就跳转
              if(!$.checktoken()){
                mui.toast("请先登录");
                setTimeout(function () {
                    location.href = "/pages/login.html";
                }, 1000)
                return;
              }
              //存起来需要发送的参数
            var Obj = {
                cat_id: getDetail.cat_id,
                goods_id: getDetail.goods_id,
                goods_name: getDetail.goods_name,
                goods_number: getDetail.goods_number,
                goods_price: getDetail.goods_price,
                goods_small_logo: getDetail.goods_small_logo
            }
            var token = $.token();
            //需要发送请求头 要用ajax发送
            $.ajax({
                url: 'my/cart/add',
                type: 'post',
                headers: {
                    Authorization: token
                },
                data: {
                    info: JSON.stringify(Obj)
                },
                success: function (res) {
                    if (res.meta.status == 401) {  
                        //提示用户  跳到登陆页面
                        mui.toast("请先登录");
                        setTimeout(function () {
                            location.href = "/pages/login.html";
                        }, 1000)
                    }else if(res.meta.status == 200){
                         mui.confirm('跳转到购物车？',res.meta.msg,['跳转','留下'],function(callback){
                           if(callback.index==0){
                             location.href="/pages/cart.html"
                           } else{
                            mui.toast("继续购物吧");
                           }
                        })
                    }
                }
            })
        })
    }
})