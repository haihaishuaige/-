$(function () {
   //接受发送过来的id
   var goods_id = $.getURL("goods_id");
   init();
    function init() {
       
        //调用ajax函数
        getDetail();
    }
    //发送ajax获取动态数据
    function getDetail(){
       $.get("goods/detail",{goods_id:goods_id},function(res){
           console.log(res);       
           if(res.meta.status==200){
                var html = template("view_banner_conten",{data:res.data});$(".pyg_view").html(html);       //初始化轮播图
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 1500 //自动轮播周期，若为0则不自动播放，默认为0；
                });         
           }
       })
    }
})