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
    //获得商品信息   goods/qsearch
    function getCategories(){
        $.get("categories",function(res){
            //左边导航栏
            var htmlLeft = template("left_banner",{arr:res.data});
            $(".left ul").html(htmlLeft);
            Scroll();
            $(".left ul li:first-child").css({
                background:'#fff',
                borderLeft:'5px solid #0094ff'
            })
            var htmlRight = template("right_banner",{data:res.data[0]});
            $(".right ul").html(htmlRight);
        //   console.log(res.data);
          
            
            
        })
    }
    $(".left ul").on('tap','li',function(e){
        // console.log(e.target);
        leftScroll.scrollToElement(e.target,1500);
       
      $(this).css({
          background:'#fff',
          borderLeft:'5px solid #0094ff'
      }).siblings().css({
          background:'',
          borderLeft:'none'
      });
       
        
    })
})