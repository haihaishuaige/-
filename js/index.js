$(function () {
    init();


    function init() {
        getSwiperData();
        getCatitems();
        getGoodslist();
    }
    // 发送ajax请求轮播图的数据   http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata
    function getSwiperData() {
        $.get("home/swiperdata", function (res) {
            if (res.meta.status == 200) {
                var slides_html = template("header_slides", {
                    arr: res.data
                });
                $(".mui-slider").html(slides_html);
                //初始化轮播图   需要生成轮播图再调用
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
                });
            }
        })
    }
    // 发送ajax请求四个分类的图标 http://api.pyg.ak48.xyz/api/public/v1/home/catitems
    function getCatitems(){
        $.get('home/catitems',function(res){
            // console.log(res);
            if(res.meta.status==200){
                var html = template("four_icons",{arr:res.data});
                $(".four_fenlei").html(html)
            }   
        })
    }
    //发送ajax请求主体商品内容 http://api.pyg.ak48.xyz/api/public/v1/home/goodslist
    function getGoodslist(){
        $.get("home/goodslist",function(res){ 
            if(res.meta.status==200){
                var html = template("view_banner",{arr:res.data})
                // console.log(res);
                
                $(".view_shopping").html(html)
                
                
            }
        })
    }
})