var text = base.$("name"),
    submit = base.$("submit_btn"),
    valid_part = base.$("valid_part");


/*
*想在输入的keyup的时候去响应验证 
*/
/*base.addEventListener(text,"keyup",function(){
  


});*/

base.addEventListener(submit,"click",function(event){
  var value = base.trim(text.value),
      length = 0;

  for(var i = 0,len = value.length;i < len;i++) {
  	
  	if(value[i].match(/[\u4E00-\u9FA5\uf900-\ufa2d]/)) {
  	  length += 2;
  	} else {
  	  length += 1;
  	}
  }
  
  if(length == 0) {
    base.removeAllClass(valid_part);
    base.addClass(valid_part,"invalid");
    text.style.borderColor = "red";
    valid_part.textContent = "姓名不能为空";
    return false;
  } else if( length < 4 || length > 16) {
  	base.removeAllClass(valid_part);
    base.addClass(valid_part,"invalid");
    text.style.borderColor = "red";
    valid_part.textContent = "输入必须是4-16个字符";
    return false;
  } else {
  	base.removeAllClass(valid_part);
  	base.addClass(valid_part,"valid");
  	text.style.borderColor = "green";
  	valid_part.textContent = "输入合法";
  }

  /*
  *发送ajax
  */

});