 $(function(){
     init();
     function init(){
        checkPhone();
     }
     //获取验证码
     function checkPhone(){
        $(".huoqu_yanzhengma button").on('tap',function(){
            //点击的时候先验证手机要上是否符合
      var mobile_txt = $("[name='mobile']").val().trim();
            if(!$.checkPhone(mobile_txt)){
               mui.toast("你的手机不合法")
                 return;
            }
            //如果执行下面就是合法
            $.post('users/get_reg_code',{mobile:mobile_txt},function(res){
                //需要禁用按钮
                $(".huoqu_yanzhengma button").attr("disabled",true);
                 var times = 5;
                 $(".huoqu_yanzhengma button").text(times+"秒后再次获取")
                 var timeId = setInterval(function(){
                    times--;
                    $(".huoqu_yanzhengma button").text(times+"秒后再次获取")
                    if(times==0){
                        $(".huoqu_yanzhengma button").removeAttr("disabled");
                        $(".huoqu_yanzhengma button").text('获取验证码')
                        clearInterval(timeId);
                    }
                 },1000)
               if(res.meta.status==200){
                   mui.toast(res.meta.msg);
                   console.log(res);  
               }
            }) 
        })
     }
     //点击注册按钮
     $("#register_btn").on('tap',function(){
         //点击注册按钮，获取所有的表单内容，判断是否合法
         var mobile_txt = $("[name='mobile']").val().trim();
         var code_txt = $("[name='code']").val().trim();
         var email_txt = $("[name='email']").val().trim();
         var pwd_txt = $("[name='pwd']").val().trim();
         var pwd2_txt = $("[name='pwd2']").val().trim();
         var gender_txt = $("[name='gender']").val().trim();
     })
 })