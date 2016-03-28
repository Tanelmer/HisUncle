/*封装一些基本的功能*/

function addLoadEvent(func) {
  var oldonload = window.onload;
  if(typeof window.onload != 'function') {
    window.onload = func;
  } else {
  	window.onload = function() {
  		oldonload();
  		func();
  	}
  }
}
//在页面加载完成后 绑定事件队列

function addListenEvent(eventTarget,eventType,handler) {
  if(eventTarget.addEventListener) {
  	eventTarget.addEventListener(eventType,handler,false);
  } else if(eventTarget.attachEvent) {
  	eventType = 'on' + eventType;
  	eventTarget.attachEvent(eventType,handler);
  } else {
  	eventTarget['on'+eventType] = handler;
  }
}

//跨浏览器的绑定事件函数

function removeListenEvent(eventTarget,eventType,handler) {
  if(eventTarget.removeEventListener) {
  	eventTarget.removeListenerEvent(eventType,handler,false);
  } else if(eventTarget.detachEvent) {
  	eventType = 'on' + eventType;
  	eventTarget.detachEvent(eventType,handler);
  } else {
  	eventTarget['on'+ eventType] = null;
  }
}

function $(id) {
	return document.getElementById(id);
}

function trim(str) {
  return str.replace(/^\s+|\s+$/g,'');  //去掉头尾的空格
}
/*去除一个字符串两头的空格*/

/*判断一个输入是否为一个或者多个数字组成*/

function test_num(num) {
  if(!num) {
    return false;
  }
  if(num.match(/^[0-9]+$/)) {
    return true;
  } else {
    return false;
  }
}

/*冒泡排序*/
function sort(num) {
  var len = num.length,
      i,
      j,
      temp;
  for(i = len-1;i>=1;i--) {
    for(j=0;j <= i-1;j++) {
      if(num[j] > num[j+1]) {
        temp = num[j];
        num[j] = num[j+1];
        num[j+1] = temp;
      }
    }
    
  }

  return num;
}

function num_range(num,left,right) {
  
  var get_num = parseInt(num);
  if( (num >= left && num <= right) ) {
    return true;
  } else {
    return false;
  }
}

function test_input_null(text) {
  if(!text) {
    alert("请输入内容");
    return false;
  }
  return true;

}

function addClass(element,classValue) {
  var oldClass = element.getAttribute("class");

  var newClass = null;
  if(oldClass !== null) {  //不为空的时候 将返回的string类型值转换成数组 判断新添加的样式是否存在后在进行添加
    var oldClassNums = oldClass.split(" ");
    var length = oldClassNums.length;
    for(var i = 0;i < length;i++ ) {
        if(oldClassNums[i] === classValue) {  //indexOf判断
            return;
        }
    }
    newClass = oldClassNums + " " + classValue;
    element.setAttribute("class",newClass);
  } else {
    element.setAttribute("class",classValue);  //如果元素之前的样式为空 直接设置值
  }
}


function removeClass(element,classValue) {
  var oldClass = element.getAttribute("class");
  
  var newClass = null;
  if(oldClass !== null) {
    var oldClassNums = oldClass.split(" ");

    for(var i = 0,len = oldClassNums.length;i < len;i+=1) {
      if(oldClassNums[i] == classValue) {
        oldClassNums.splice(i,1);
        newClass = oldClassNums.join(" ");
        element.setAttribute("class",newClass);
      }
    }
    
  }


}