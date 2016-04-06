define(function(require, exports, module){
  require('../js/base.js');


function drawBack() {
  var canvas = base.$("canvas");
  var ctx = canvas.getContext("2d");

  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.strokeRect(0,0,500,500);
  /*在这里出现的一个问题是 我想让外层的画布lineWidth粗一些 但是这在移动的时候就会产生覆盖 后画的会变细 边缘的部分 每次重画背景是不是影响效率呢？*/
  for(var i = 1;i <= 9;i+=1) {
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0,50*i);
    ctx.lineTo(500,50*i);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(50*i,0);
    ctx.lineTo(50*i,500);
    ctx.stroke();
  }
}
function clearAll(){
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,500,500);
  ctx.clearRect(obj.positionX,obj.positionY,obj.size,obj.size); 
};
function drawObj(obj) {
  var ctx = canvas.getContext("2d");
  var x = obj.positionX,
      y = obj.positionY,
      arrow = obj.arrow;
  ctx.fillStyle = "blue";
  ctx.lineWidth = 0;
  var upsize = 10;
  switch(arrow){
    case 0:{
      ctx.fillRect(50*x,50*y,obj.size,upsize);
      ctx.fillStyle = "red";
      ctx.fillRect(50*x,50*y+upsize,obj.size,(obj.size-upsize));
      break;  
    }
    case 1:{
      ctx.fillRect(50*x+(obj.size-upsize),50*y,upsize,obj.size);
      ctx.fillStyle = "red";
      ctx.fillRect(50*x,50*y,obj.size-upsize,obj.size);
      break;
    }
    case 2:{
      ctx.fillRect(50*x,50*y+(obj.size-upsize),obj.size,upsize);
      ctx.fillStyle = "red";
      ctx.fillRect(50*x,50*y,obj.size,(obj.size-upsize));
      break;
    }
    case 3:{
      ctx.fillRect(50*x,50*y,upsize,obj.size);
      ctx.fillStyle = "red";
      ctx.fillRect(50*x+upsize,50*y,obj.size-upsize,obj.size);
    }

  }
  	
}

function move(obj,value) {
  var get_order = value.replace(/[ ]+/g,"");
  switch(get_order) {
  	case "go":{
  	  var x = obj.positionX;
  	  var y = obj.positionY;
  	  if(obj.arrow == 0) {
        if(y === 0) {
          alert("请调转方向后移动");
          return false;
        } else {
          clearAll();
          obj.positionY -= 1;
          drawBack();
          drawObj(obj);
        }
  	  }
  	  if(obj.arrow == 1) {
        if(x === 9) {
          alert("请调转方向后移动");
          return false;
        } else {
          clearAll();
          obj.positionX += 1;
          drawBack();
          drawObj(obj);
        }
  	  }
  	  if(obj.arrow == 2) {
  	    if(y == 9) {
  	      alert("请调转方向后移动");
          return false;	
  	    } else {
  	      clearAll();
  	      obj.positionY += 1;
  	      drawBack();
          drawObj(obj);
  	    }	
  	  }
  	  if(obj.arrow == 3) {
  	  	if(x === 0) {
  	  	  alert("请调转方向后移动");
          return false;		
  	  	} else {
  	  	  clearAll();
  	  	  obj.positionX -= 1;
  	  	  drawBack();
  	  	}
  	  }
  	  break;
  	}
  	case "tunlef":{
  	  if(obj.arrow == 0) {
  	  	clearAll();
  	  	obj.arrow = 3;
  	  	drawBack();
  	  	drawObj(obj);
  	  } else {
  	  	clearAll();
  	  	obj.arrow -= 1;
  	  	drawBack();
  	  	drawObj(obj);
  	  }
      break;
  	}
  	case "tunrig":{
  	  if(obj.arrow == 3) {
  	  	clearAll();
  	  	obj.arrow = 0;
  	  	drawBack();
  	  	drawObj(obj);
  	  } else {
  	  	clearAll();
  	  	obj.arrow += 1;
  	  	drawBack();
  	  	drawObj(obj);
  	  }
  	  break;
  	}
  	case "tunbac": {
      if(obj.arrow === 0) {
      	clearAll();
  	  	obj.arrow = 2;
  	  	drawBack();
  	  	drawObj(obj);
  	  	return;
      }
      if(obj.arrow === 1) {
      	clearAll();
  	  	obj.arrow = 3;
  	  	drawBack();
  	  	drawObj(obj);
  	  	return;
      }
      if(obj.arrow === 2) {
        clearAll();
  	  	obj.arrow = 0;
  	  	drawBack();
  	  	drawObj(obj);
  	  	return;
      }
      if(obj.arrow === 3) {
      	clearAll();
  	  	obj.arrow = 1;
  	  	drawBack();
  	  	drawObj(obj);
  	  	return;
      }
      break;
  	}
  	default:{
      alert("输入不合法");
      return false;	
  	}
  }
}
var obj = {};
obj.positionX = base.randomNum(10);
obj.positionY = base.randomNum(10);
obj.arrow = 2;
obj.size = 50;
drawBack();
drawObj(obj);


var btn = base.$("run");
base.addEventListener(btn,"click",function(event){
  var evt = event || window.event,
      text = base.$("go"),
      value = base.trim(text.value).toLowerCase();
  if(!base.test_input_null(value)) {
  	alert("您没有输入内容");
  	return false;
  } else {
    move(obj,value);
    
  }
});
});