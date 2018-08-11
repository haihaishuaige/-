//ajax请求拦截器
$(function () {
    var BaseUrl=" http://api.pyg.ak48.xyz/";
    template.defaults.imports.iconUrl = BaseUrl;
    // 修改接口的使用方式
    // 拦截器
    // 在每一次发送请求 之前对请求做一些处理 
    // 发送请求之前,提前对于 接口的url进行处理 
    // var oobj={};
    // $.ajax(oobj);
    // http://api.pyg.ak48.xyz/api/public/v1/  +   home/swiperdata

    //准备一个存储发送请求次数的变量
    var ajaxXHR = 0;
    $.ajaxSettings.beforeSend=function (xhr,obj) {
      ajaxXHR++;
      obj.url=BaseUrl+"api/public/v1/"+ obj.url;
      $("body").addClass("wait");
    }
    $.ajaxSettings.complete = function(){
      ajaxXHR--;
      if(ajaxXHR==0){
        $("body").removeClass("wait");
      }
    }
  })