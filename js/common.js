//ajax请求拦截器
$(function () {
  var BaseUrl = " http://api.pyg.ak48.xyz/";
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
  $.ajaxSettings.beforeSend = function (xhr, obj) {
    ajaxXHR++;
    obj.url = BaseUrl + "api/public/v1/" + obj.url;
    $("body").addClass("wait");
  }
  $.ajaxSettings.complete = function () {
    ajaxXHR--;
    if (ajaxXHR == 0) {
      $("body").removeClass("wait");
    }
  }
  $.extend($, {
    //获取url地址参数
    getURL: function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    },
    //验证手机号的正则
    checkPhone: function (phone) {
      if (!(/^1[34578]\d{9}$/.test(phone))) {
        return false;
      } else {
        return true;
      }
    },
    checkEmail:function (myemail) {　　
      var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
      if (myReg.test(myemail)) {　　　　
          return true;　　
      } else {　　　　
          return false;
      }
  },
  token:function(){
    var token;
    token = JSON.parse(localStorage.getItem('token_data')).token?JSON.parse(localStorage.getItem('token_data')).token:'';
    return token;
  },
  checktoken:function(){
    return localStorage.getItem('token_data');
  },
  setURL:function(){
    localStorage.setItem("location_url", location.href);
  }
  })
})