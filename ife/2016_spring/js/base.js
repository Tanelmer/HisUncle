/*封装一些基本的功能*/

(function(win){
  var base = {};

  //在页面加载完成后 绑定事件队列
  base.addLoadEvent = function(func) {
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

  //跨浏览器的绑定事件函数
  base.addEventListener = function(eventTarget,eventType,handler) {
    if(eventTarget.addEventListener) {
      eventTarget.addEventListener(eventType,handler,false);
    } else if(eventTarget.attachEvent) {
      eventType = 'on' + eventType;
      eventTarget.attachEvent(eventType,handler);
    } else {
      eventTarget['on'+eventType] = handler;
    }
  }

  //跨浏览器的移除事件函数
  base.removeListenEvent = function(eventTarget,eventType,handler){
    if(eventTarget.removeEventListener) {
      eventTarget.removeListenerEvent(eventType,handler,false);
    } else if(eventTarget.detachEvent) {
      eventType = 'on' + eventType;
      eventTarget.detachEvent(eventType,handler);
    } else {
      eventTarget['on'+ eventType] = null;
    }
  }

  //id选择器
  base.$ = function(id) {
    return document.getElementById(id);
  }

  //去输入字符串的头尾的空格
  base.trim = function(str) {
    return str.replace(/^\s+|\s+$/g,''); 
  }

  //判断输入是否由数字组成
  base.test_num = function(num) {
    if(!num) {
    return false;
    }
    if(num.match(/^[0-9]+$/)) {
      return true;
    } else {
      return false;
    }
  }

  base.test_input_null = function(text) {
    if(!text) {
      alert("请输入内容");
      return false;
    }
    return true;
  }

  //为一个元素节点增加class
  base.addClass = function(element,classValue) {
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

  //为一个元素节点移除class
  base.removeClass = function(element,classValue) {
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

  

  //判断数字是否在一个数组中 为了去重使用
  base.num_exist = function(nums,num) {
    if(nums.indexOf(num) != -1) {
      return true;
    } else {
      return false;
    }
  }
  

  win.base = base;
})(window); 







