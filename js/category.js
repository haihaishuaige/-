$(function(){
    init();
    function init(){
        htmlFontSize();
        getCategories();
    }
    window.onresize = function(){
        htmlFontSize();
    }
    var leftScroll;

    //计算字体的随着屏幕的变化而变化
    function htmlFontSize(){
         var htmlSize = 100;
         var htmlWidth = document.querySelector('html').offsetWidth;
         var big = 375;
        var fz = htmlWidth * htmlSize / big;
        document.querySelector('html').style.fontSize = fz+'px';
    }
    //让商品滚动
    function Scroll(){
        leftScroll = new IScroll(".pyg_view .left");
        
    }
    // var dataId = dataId || 0;
    //获得商品信息   goods/qsearch
    var data;
    function getCategories(){
        $.get("categories",function(res){
            data = res;
            //左边导航栏
            var htmlLeft = template("left_banner",{arr:res.data});
            $(".left ul").html(htmlLeft);
            Scroll();
            $(".left ul li:first-child").css({
                background:'#fff',
                borderLeft:'5px solid #0094ff'
            })
            //渲染右边数据
            var htmlRight = template("right_banner",{data:res.data[0]});
            $(".right ul").html(htmlRight);   
        })

    }
    
    //左边点击事件
    $(".left ul").on('tap','li',function(e){
        var page = e.target;
        var value =$(this).children('input').val();
        value = value -1 + 1;
      $(this).css({
          background:'#fff',
          borderLeft:'5px solid #0094ff'
      }).siblings().css({
          background:'',
          borderLeft:'none'
      });      
      haha(value,data);   
    })
    function haha(value,res){
        var htmlRight = template("right_banner",{data:res.data[value]});
        $(".right ul").html(htmlRight).fadeIn(1500); 
        leftScroll.scrollToElement($(".left li").eq(value)[0],1500)
    }  
})
