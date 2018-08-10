$(function () {
    init();


    function init() {
        header_slide();

    }
    // 发送ajax请求轮播图的数据   http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata
    function header_slide() {
        $.get("http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata", function (res) {
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
})