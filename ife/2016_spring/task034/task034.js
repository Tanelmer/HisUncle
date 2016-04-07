define(function(require, exports, module){
  require('../js/base.js');

var obj = {};
obj.positionX = base.randomNum(10);
obj.positionY = base.randomNum(10);
obj.arrow = 1;
obj.size = 50;
obj.x = obj.positionX*obj.size + obj.size/2;
obj.y = obj.positionY*obj.size + obj.size/2;

drawBack();
drawObj(obj);
/*以上所有初始化画布*/

/*画背景的虚格*/
function drawBack() {
  var canvas = base.$("canvas");
  var ctx = canvas.getContext("2d");
  ctx.restore();
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
/*清除画布*/
function clearAll(){
  var canvas = base.$("canvas");
  var ctx = canvas.getContext("2d");
  ctx.restore();
  ctx.clearRect(0,0,500,500); 
};

/*画物体*/
function drawObj(obj,angel) {
  var ctx = canvas.getContext("2d");
  var x = obj.positionX*obj.size+obj.size/2,
      y = obj.positionY*obj.size+obj.size/2,
      arrow = obj.arrow;
  ctx.save();
  ctx.translate(obj.x,obj.y);
  ctx.rotate(angel);
  ctx.fillStyle = "blue";
  ctx.lineWidth = 0;
  var upsize = 10;
  switch(arrow){
    case 0:{
      ctx.fillRect(-obj.size/2,-obj.size/2,obj.size,upsize);
      ctx.fillStyle = "red";
      ctx.fillRect(-obj.size/2,-(obj.size/2-upsize),obj.size,(obj.size-upsize));
      break;  
    }
    case 1:{
      ctx.fillRect(obj.size/2-upsize,-obj.size/2,upsize,obj.size);
      ctx.fillStyle = "red";
      ctx.fillRect(-obj.size/2,-obj.size/2,obj.size-upsize,obj.size);
      break;
    }
    case 2:{
      ctx.fillRect(-obj.size/2,obj.size/2-upsize,obj.size,upsize);
      ctx.fillStyle = "red";
      ctx.fillRect(-obj.size/2,-obj.size/2,obj.size,obj.size-upsize);
      break;
    }
    case 3:{
      ctx.fillRect(-obj.size/2,-obj.size/2,upsize,obj.size);
      ctx.fillStyle = "red";
      ctx.fillRect(-(obj.size/2-upsize),-obj.size/2,obj.size-upsize,obj.size);
    }

  }
  	
}
/*变方向的两个动画*/
function tunRig(obj,sec) {
  var canvas = base.$("canvas");
  var ctx = canvas.getContext("2d");
  var speed = Math.PI/20;
  var counter = 0;
  var timer = setInterval(function(){
    counter++;
    clearAll();
    drawBack();
    drawObj(obj,speed*counter);
    if(counter == 10) {
      clearInterval(timer);
      if(obj.arrow == 3) {
        obj.arrow = 0
      } else {
        obj.arrow += 1;
      }
    }
  },sec*1000/10);
}

function tunLef(obj,sec) {
  var canvas = base.$("canvas");
  var ctx = canvas.getContext("2d");
  var speed = -Math.PI/20;
  var counter = 0;
  var timer = setInterval(function(){
    counter++;
    clearAll();
    drawBack();
    drawObj(obj,counter*speed);
    if(counter == 10) {
      clearInterval(timer);
      if(obj.arrow == 0) {
        obj.arrow = 3
      } else {
        obj.arrow -= 1;
      }
    }
  },sec*1000/10);
}
/*测试当前元素在给定的方向上是否可以移动*/
function testMove(obj,dir) {
  switch(dir) {
    case 0: {
      if(obj.y === obj.size/2) {
        return false;
      } else {
        return true;
      }
      break;
    }
    case 1: {
      if(obj.x === (500-obj.size/2)) {
        return false;
      } else {
        return true;
      }
      break;
    }
    case 2: {
      if(obj.y === (500-obj.size/2)) {
        return false;
      } else {
        return true;
      }
      break;
    }
    case 3: {
      if(obj.x === obj.size/2) {
        return false;
      } else {
        return true;
      }
      break;
    }
  }
}

/*在给定的方向上移动元素 结合testMove使用*/
function drawMoveDir(obj,sec,dir) {
  var counter = 0;
  var times = 10;
  var speed = obj.size/times;
  var timer = setInterval(function(){
    clearAll();
    drawBack();
    counter++;
    switch(dir){
      case 0:{
        obj.y -= speed;
        break;
      }
      case 1:{
        obj.x += speed;
        break;
      }
      case 2:{
        obj.y += speed;
        break;
      }
      case 3:{
        obj.x -= speed;
        break;
      }
    }
    drawObj(obj);

    if(counter == 10) {
      clearInterval(timer);
    }

  },sec*1000/10);  
}
/*处理指定的函数 */
function move(obj,value,sec) {
  var get_order = value.replace(/[ ]+/g,"");

  var canvas = base.$("canvas");
  var ctx = canvas.getContext("2d");
  switch(get_order) {
  	case "go":{
      if(!testMove(obj,obj.arrow)) {
        alert("请调转方向");
        return false;
      } else {
        drawMoveDir(obj,sec,obj.arrow);
      }
      break;
  	}
  	case "tunlef":{
      tunLef(obj,sec);
      break;
  	}
  	case "tunrig":{
  	  tunRig(obj,sec);
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
    case "tralef": {
      if(!testMove(obj,3)) {
        alert("请调转方向");
        return false;
      } else {
        drawMoveDir(obj,sec,3);
      }
      break;
    }
    case "tratop": {
      if(!testMove(obj,0)) {
        alert("请调转方向");
        return false;
      } else {
        drawMoveDir(obj,sec,0);
      }
      break;
    }
    case "trarig":{
      if(!testMove(obj,1)) {
        alert("请调转方向");
        return false;
      } else {
        drawMoveDir(obj,sec,1);
      }
      break;
    }
    case "trabot":{
      if(!testMove(obj,2)) {
        alert("请调转方向");
        return false;
      } else {
        drawMoveDir(obj,sec,2);
      }
      break;
    }
    case "movlef":{
      if(!testMove(obj,3)) {
        alert("请调转方向");
        return false;
      } else {
        obj.arrow = 3;
        drawMoveDir(obj,sec,3);
      }
      break;
    }
    case "movtop":{
      if(!testMove(obj,0)) {
        alert("请调转方向");
        return false;
      } else {
        obj.arrow = 0;
        drawMoveDir(obj,sec,0);
      }
      break;
    }
    case "movrig":{
      if(!testMove(obj,1)) {
        alert("请调转方向");
        return false;
      } else {
        obj.arrow = 1;
        drawMoveDir(obj,sec,1);
      }
      break;
    }
    case "movbot":{
      if(!testMove(obj,2)) {
        alert("请调转方向");
        return false;
      } else {
        obj.arrow = 2;
        drawMoveDir(obj,sec,2);
      }
      break;
    }
  	default:{
      alert("输入不合法");
      return false;	
  	}
  }
}




var btn = base.$("run");
base.addEventListener(btn,"click",function(event){
  var evt = event || window.event,
      text = base.$("go"),
      value = base.trim(text.value).toLowerCase(),
      sec = base.trim(base.$("min").value);
  if(!base.test_input_null(value)) {
  	alert("您没有输入指令");
  	return false;
  }
  if(!base.test_num(sec)) {
    alert("请输入正确的时间");
    return false;
  }
  move(obj,value,sec);

});
});