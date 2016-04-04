/*负责验证的js*/

(function(win){
  var validate = {};

  validate.checkNull = function(str) {
    var ret = ['就业单位不能为空',"输入合格"];
    if(str.length === 0) {
      return {
        status:0,
        str:ret[0]
      }
    } else {
      return {
        status:1,
        ret:[1]
      }
    }
  }
  

  /*根据验证的状态 设置反应*/
  validate.changeStatus = function(obj,checkitem) {
    var tig = checkitem.nextElementSibling;
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

  validate.checkName = function(str,minLength,maxLength) {
  	var ret = ['姓名不能为空','输入合格','请输入' + minLength + '-' + maxLength + '个字符']; 
        length = 0;
    for(var i = 0,len = str.length;i < len;i++) {
      if(str[i].match(/[\u4E00-\u9FA5\uf900-\ufa2d]/)) {
  	   length += 2;
  	  } else {
  	   length += 1;
  	  }  
    }
    if(length === 0) {
      return {
      	status:0,
      	str:ret[0]
      }
    } if(length < minLength || length > maxLength) {
	  return {
	  	status:1,
	  	str:ret[2]
	  }
    } else {
      return {
        status:2,
        str:ret[1]
      }
    }
  }

  validate.checkPass = function(str,length) {
  	var ret = ['密码不能为空','请输入'+length+"长度的密码",'密码合格']
    if(str.length === 0) {
      return {
        status:0,
        str: ret[0]
      }
    } else if(str.length != 8) {
      return {
      	status:1,
      	str:ret[1]
      }
    } else {
      return {
        status:2,
        str:ret[2]
      }
    }
  }

  validate.checkPassAgain = function(beforeStr,nowStr) {
  	var ret = ['与之前的密码不符合','输入合格',"不能为空"];
  	if(beforeStr.length === 0) {
  	  return {
  	  	status:0,
  	  	str:ret[2]
  	  }
  	} else if(nowStr !== beforeStr) {
  	  return {
  	  	status:1,
  	  	str:ret[0]
  	  }
  	} else {
  	  return {
  	  	status:2,
  	  	str:ret[1]
  	  }
  	}
  }

  validate.checkEmail = function(str) {
  	var reg = /^([a-zA-Z_0-9-])+@([a-zA-Z_0-9-])+(\.[a-zA-Z_0-9-])+/; //邮箱的正则
  	var ret = ['请输入正确的邮箱格式','格式正确'];
    if(reg.test(str)) {
      return {
      	status:2,
      	str:ret[1]
      }
    } else {
      return {
      	status:0,
      	str:ret[0]
      }
    }
  }

  validate.checkPhone = function(str) {
  	var reg = /(^1[3|4|5|7|8][0-9]{9}$)/;
  	var ret = ['请输入正确的手机11位手机','验证合格'];
    if(reg.test(str)) {
      return {
      	status:2,
      	str:ret[1]
      }
    } else {
      return {
      	status:0,
      	str:ret[0]
      }
    }
  }



  win.validate = validate;
})(window);