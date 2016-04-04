var minLength = 0,
    maxLength = 16,
    passLength = 8,
    nameRule = '请输入' + minLength + '-' +　maxLength + '个字符',
    passRule = "请输入" + passLength +　"个字符",
    passAgainRule = "请输入相同的内容",
    email = "请输入正确的邮箱格式",
    tel = "请输入11位的手机号",
    form = base.$("test");
    rule = [];

rule.push(nameRule);
rule.push(passRule);
rule.push(passAgainRule);
rule.push(email);
rule.push(tel);



/*obj的返回值去设置变化*/
function changeStatus(obj,tig,checkitem) {
  if(obj.status === 0) {
      base.removeAllClass(tig);
      base.addClass(tig,"invalid");
      tig.textContent = obj.str;
      checkitem.style.borderColor = "#EB6C76";
    } else if(obj.status === 1) {
      base.removeAllClass(tig);
      base.addClass(tig,"invalid");
      tig.textContent = obj.str;
      checkitem.style.borderColor = "#EB6C76";
    } else {
      base.removeAllClass(tig);
      base.addClass(tig,"valid");
      tig.textContent = obj.str;
      checkitem.style.borderColor = "green";
    } 
}
/*将这些都设成变量的 是为了后来的变化*/ 
function bindEvent() { 
 
  var items = base.getClass(form,"item");
  for(var i = 0,len = items.length;i < len;i+=1) {
    (function(i){
      base.addEventListener(items[i],"focus",function(){
        if(i == 1) {
          base.$("pass_again").value = "";
          var pass_tig = base.$("pass_again").nextElementSibling;
          pass_tig.textContent = passAgainRule;
          base.$("pass_again").style.borderColor = "#DCDCDC";
          base.removeAllClass(pass_tig);
          base.addClass(pass_tig,"normal");
          pass_tig.style.display = "none";
        }
        /*上面的部分是为了设置两个密码的联动*/
        var tig = items[i].nextElementSibling;
        tig.textContent = rule[i];
        base.addClass(tig,"normal");
        tig.style.display = "block";
      });
    })(i);
  }
  //统一为所有的input绑定foucs事件 
  

  var name = base.$("name");
  base.addEventListener(name,"blur",function(event){
    var evt = event || window.event;
    var tig = event.target.nextElementSibling;
    var text = base.trim(event.target.value);
    var obj = validate.checkName(text,minLength,maxLength);
    changeStatus(obj,tig,name);
  });

  var pass = base.$("pass");
  base.addEventListener(pass,"blur",function(event){
    var evt = event || window.event;
    var tig = event.target.nextElementSibling;
    var text = base.trim(event.target.value);
    var obj = validate.checkPass(text,passLength);
    changeStatus(obj,tig,pass);
  });

  var pass_again = base.$("pass_again");
  base.addEventListener(pass_again,"blur",function(){
    var evt = event || window.event;
    var tig = event.target.nextElementSibling;
    var text = base.trim(event.target.value);
    var beforeText = base.trim(base.$("pass").value);
    var obj = validate.checkPassAgain(beforeText,text);
    changeStatus(obj,tig,pass_again);
  });

  var email = base.$("email");
  base.addEventListener(email,"blur",function(){
    var evt = event || window.event;
    var tig = event.target.nextElementSibling;
    var text = base.trim(event.target.value);
    var obj = validate.checkEmail(text);
    changeStatus(obj,tig,email);
  });
  

  var phone = base.$("phone");
  base.addEventListener(phone,"blur",function(event){
    var evt = event || window.event;
    var tig = event.target.nextElementSibling;
    var text = base.trim(event.target.value);
    var obj = validate.checkPhone(text);
    changeStatus(obj,tig,phone);
  });

  var submit = base.$("submit_btn");
  base.addEventListener(submit,"click",function(){
    var form = base.$("test");
    var items = base.getClass(form,"item");
    for(var i = 0,len = items.length;i < len;i+=1) {
      (function(i){
        if(items[i].value.length === 0) {
          items[i].focus();
          return false;
        }
      })(i);
    }

    var invalids = base.getClass(form,"invalid");
    if(invalids.length > 0) {
      alert("输入不合格");
      return false;
    } else if(invalids.length === 0){
      /*发送ajax*/
      alert("ok send message");
    }
    
  });
}


bindEvent();

