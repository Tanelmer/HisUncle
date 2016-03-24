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