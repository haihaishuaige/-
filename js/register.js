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
         var gender_txt = $("[name='gender']:checked").val();
         //判断手机
          if(!$.checkPhone(mobile_txt)){
            mui.toast("你的手机不合法")
            return;
          }
          //判断验证码   长度4位
          if(code_txt.length<4){
            mui.toast("验证码不合法")
            return;
          }
          //判断邮箱
          if(!$.checkEmail(email_txt)){
                mui.toast("邮箱不合法")
                return;
          }
          //判断密码
          if(pwd_txt.length<6){
            mui.toast("密码不合法")
            return;
          }
          //判断确认密码
          if(pwd2_txt!=pwd_txt){
            mui.toast("两次密码不一致")
            return;
          }
          //经历重重困难，到下面就是全部合法 发送请求
          $.post("users/reg",{
              mobile:mobile_txt,
              code:code_txt,
              email:email_txt,
              pwd:pwd_txt,
              gender:gender_txt
          },function(res){
              if(res.meta.status==200){
                mui.toast(res.meta.msg);
                setTimeout(function(){
                    location.href = "/pages/login.html";
                },1500)
              }else{
                mui.toast(res.meta.msg);
                return;
              }
              
          })
     })
 })