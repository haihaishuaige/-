$(function(){
    var GetSearchObj = {
        query:'',
        cid:getURL('cid'),
        pagenum:1,
        pagesize:10
    }
    var contents;
    init();
    mui.init({
        pullRefresh: {
          container: ".pyg_view",
          down: {
            auto: true,
            //  触发下拉刷新时自动触发
            callback: function () {
              //重置数据
                $(".view_banner ul").html('');
                //重置页码
                GetSearchObj.pagenum=1;
                init(function(){
                    mui('.pyg_view').pullRefresh().endPulldownToRefresh();
                    //重置组件
                    mui('.pyg_view').pullRefresh().refresh(true);
                });    
            }
          },
          up:{
            //  触发上拉刷新时自动触发
            callback:function () {
              //如果没有了，就不做操作
              if(GetSearchObj.pagenum>=contents){
                mui('.pyg_view').pullRefresh().endPullupToRefresh(true);
                return;
              }
              GetSearchObj.pagenum++;
              init(function(){
                mui('.pyg_view').pullRefresh().endPullupToRefresh();
              });
            }
          }
        }
      });
    function init(callback){
       //主体内容渲染  goods/search
       $.get("goods/search",GetSearchObj,function(res){
          if(res.meta.status==200){
            //算出总页数
            contents = Math.ceil(res.data.total / (GetSearchObj.pagesize));
            //调用模板
                var html = template("view_banner",{arr:res.data.goods})
                 $(".view_banner ul").append(html);
                 callback&&callback();
          }       
       })

    }


    //获取url地址参数
     function getURL(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
      }
})  