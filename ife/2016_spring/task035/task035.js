define(function(require, exports, module){
  require('../js/base.js');
var container = base.$("canvas").height;

var obj = {};
obj.positionX = base.randomNum(10);
obj.positionY = base.randomNum(10);
obj.arrow = 1;
obj.size = container/10;
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
  ctx.strokeRect(0,0,container,container);
  /*在这里出现的一个问题是 我想让外层的画布lineWidth粗一些 但是这在移动的时候就会产生覆盖 后画的会变细 边缘的部分 每次重画背景是不是影响效率呢？*/
  for(var i = 1;i <= 9;i+=1) {
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0,obj.size*i);
    ctx.lineTo(container,obj.size*i);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(obj.size*i,0);
    ctx.lineTo(obj.size*i,container);
    ctx.stroke();
  }
}
/*清除画布*/
function clearAll(){
  var canvas = base.$("canvas");
  var ctx = canvas.getContext("2d");
  ctx.restore();
  ctx.clearRect(0,0,container,container); 
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
function tunRig(obj,sec,count) {
  var canvas = base.$("canvas");
  var ctx = canvas.getContext("2d");
  var speed = Math.PI*count/20;
  var counter = 0;
  var timer = setInterval(function(){
    counter++;
    clearAll();
    drawBack();
    drawObj(obj,speed*counter);
    if(counter == 10) {
      clearInterval(timer);
      if(count%4 === 0) {
        obj.arrow = obj.arrow;
      }
      if(count%4 === 1) {
        if(obj.arrow === 3) {
          obj.arrow = 0;
        } else {
          obj.arrow += 1;
        }
      }
      if(count%4 === 2) {
        if(obj.arrow === 0) {
          obj.arrow = 2;
        }
        if(obj.arrow === 1) {
          obj.arrow = 3;
        }
        if(obj.arrow === 2) {
          obj.arrow = 0;
        }
        if(obj.arrow === 3) {
          obj.arrow = 1;
        }
      }
      if(count%4 === 3) {
        if(obj.arrow === 0) {
          obj.arrow = 3;
        } else {
          obj.arrow -= 1;
        }
      }
    }
  },sec*1000/10);
}

function tunLef(obj,sec,count) {
  var canvas = base.$("canvas");
  var ctx = canvas.getContext("2d");
  var speed = -Math.PI*count/20;
  var counter = 0;
  var timer = setInterval(function(){
    counter++;
    clearAll();
    drawBack();
    drawObj(obj,counter*speed);
    if(counter == 10) {
      clearInterval(timer);
      if(count%4 === 0) {
        obj.arrow = obj.arrow;
      }
      if(count%4 === 1) {
        if(obj.arrow === 0) {
          obj.arrow =3;
        } else {
          obj.arrow = obj.arrow-1;
        }
      }
      if(count%4 === 2) {
        if(obj.arrow === 0) {
          obj.arrow = 2;
        }
        if(obj.arrow === 1) {
          obj.arrow = 3;
        }
        if(obj.arrow === 2) {
          obj.arrow = 0;
        }
        if(obj.arrow === 3) {
          obj.arrow = 1;
        }
      }
      if(count%4 === 3) {
        if(obj.arrow === 3) {
          obj.arrow = 0;
        } else {
          obj.arrow += 1;
        }
      }
    }
  },sec*1000/10);
}
/*测试当前元素在给定的方向上是否可以移动*/
function testMove(obj,dir,count) {
  switch(dir) {
    case 0: {
      if((obj.y-obj.size*count)<0 ) {
        return false;
      } else {
        return true;
      }
      break;
    }
    case 1: {
      if((obj.x+obj.size*count > container)) {
        return false;
      } else {
        return true;
      }
      break;
    }
    case 2: {
      if((obj.y+obj.size*count) > container ) {
        return false;
      } else {
        return true;
      }
      break;
    }
    case 3: {
      if((obj.x -obj.size*count) < 0  ) {
        return false;
      } else {
        return true;
      }
      break;
    }
  }
}

/*在给定的方向上移动元素 结合testMove使用*/
function drawMoveDir(obj,sec,dir,count) {
  var counter = 0;
  var times = 10;
  var speed = obj.size*count/times;
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
  if(base.test_input_num(value)) {
    var order = value.split(" ");
    var count = order[order.length-1];
    order.splice(order.length-1,1);
    var get_order = order.join("");
    
  } else {
    var order = value.split(" ");
    var get_order = order.join("");
    var count = 1;
    
  }
  var canvas = base.$("canvas");
  var ctx = canvas.getContext("2d");
  switch(get_order) {
  	case "go":{
      if(!testMove(obj,obj.arrow,count)) {
        return false;
      } else {
        drawMoveDir(obj,sec,obj.arrow,count);
        return true;
      }
      break;
  	}
  	case "tunlef":{
      tunLef(obj,sec,count);
      return true;
      break;
  	}
  	case "tunrig":{
  	  tunRig(obj,sec,count);
      return true;
      break;
  	}
  	case "tunbac": {
      if(obj.arrow === 0) {
      	clearAll();
  	  	obj.arrow = 2;
  	  	drawBack();
  	  	drawObj(obj);
  	  	return true;
      }
      if(obj.arrow === 1) {
      	clearAll();
  	  	obj.arrow = 3;
  	  	drawBack();
  	  	drawObj(obj);
  	  	return true;
      }
      if(obj.arrow === 2) {
        clearAll();
  	  	obj.arrow = 0;
  	  	drawBack();
  	  	drawObj(obj);
  	  	return true;
      }
      if(obj.arrow === 3) {
      	clearAll();
  	  	obj.arrow = 1;
  	  	drawBack();
  	  	drawObj(obj);
  	  	return true;
      }
      break;
  	}
    case "tralef": {
      if(!testMove(obj,3,count)) {
        return false;
      } else {
        drawMoveDir(obj,sec,3,count);
        return true;
      }
      break;
    }
    case "tratop": {
      if(!testMove(obj,0,count)) {
        return false;
      } else {
        drawMoveDir(obj,sec,0,count);
        return true;
      }
      break;
    }
    case "trarig":{
      if(!testMove(obj,1,count)) {
        return false;
      } else {
        drawMoveDir(obj,sec,1,count);
        return true;
      }
      break;
    }
    case "trabot":{
      if(!testMove(obj,2,count)) {
        return false;
      } else {
        drawMoveDir(obj,sec,2,count);
        return true;
      }
      break;
    }
    case "movlef":{
      if(!testMove(obj,3,count)) {
        return false;
      } else {
        obj.arrow = 3;
        drawMoveDir(obj,sec,3,count);
        return true;
      }
      break;
    }
    case "movtop":{
      if(!testMove(obj,0,count)) {
        return false;
      } else {
        obj.arrow = 0;
        drawMoveDir(obj,sec,0,count);
        return true;
      }
      break;
    }
    case "movrig":{
      if(!testMove(obj,1,count)) {
        return false;
      } else {
        obj.arrow = 1;
        drawMoveDir(obj,sec,1,count);
        return true;
      }
      break;
    }
    case "movbot":{
      if(!testMove(obj,2,count)) {
        return false;
      } else {
        obj.arrow = 2;
        drawMoveDir(obj,sec,2,count);
        return true;
      }
      break;
    }
  	default:{
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

var test_btn = base.$("test_btn");
var textarea = base.$("input_order");
var index = 0;
base.addEventListener(test_btn,"click",function(event){
  var evt = event || window.event;
  var value = base.trim(textarea.value);
  var order_num = value.split('\n');
  var sec = parseInt(base.trim(base.$("min").value)); 
  var timer = setInterval(function(){
    var order = order_num.shift();

    /*move(obj,order,sec);*/
    if(order_num.length === 0) {
      clearInterval(timer);
    }
  },1000*sec);
  
});

base.addEventListener(textarea,"keyup",function(event){
  var evt = event || window.event;
      value = base.trim(event.target.value),
      num = value.replace(/[\n]+/g,"_").split("_"),
      result = "";
  for(var i = 0,len = num.length;i < len;i+=1) {
    result += '<div>' + i + '</div>';
  }
  base.$("left").innerHTML = result;

});

var reset = base.$("reset");
base.addEventListener(reset,"click",function(){
  textarea.value = "";
  base.$("left").innerHTML = "<div>0</div>";
});







});