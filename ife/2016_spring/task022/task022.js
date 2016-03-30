var root = $("root");
var timer = 100;
var queue = new Queue();
var draw = false;
function preOrder(node) {
  queue.enqueue(node);

  if(node.children[0]) {
    preOrder(node.children[0]);
  }
  if(node.children[1]) {
    preOrder(node.children[1]);
  }
}

function middleOrder(node) {
  if(node.children[0]) {
    middleOrder(node.children[0]);
  }
  queue.enqueue(node);
  if(node.children[1]) {
    middleOrder(node.children[1]);
  }
}

function backOrder(node) {
  if(node.children[0]) {
  	backOrder(node.children[0]);
  }
  if(node.children[1]) {
  	backOrder(node.children[1]);
  }
  queue.enqueue(node);

}


/*我这种方式的只能遍历2叉树  访问node.children.length*/
function render_queue(num) {
  var time = 0;
  var speed = parseInt(num); /*speed是规定绘制下一个节点的时间间隔*/
  draw = true;
  while(queue.size() >= 1) {
    var node = queue.dequeue();
	time += speed;	
	(function(node,time){
		setTimeout(function(){
			if(node.parentNode) {
				node.parentNode.style.background = "white"
			}
			node.style.background = "red";
			if(node.children[0] != null) {
				node.children[0].style.background = "white";
			}
			if(node.children[1] != null) {
				node.children[1].style.background = "white";
			}
			setTimeout(function(){
				node.style.background = "white";
			},parseInt(speed/2) );  /*这里设置当前节点颜色应该存在的时间*/
		},time);
	
	})(node,time);

  }
  setTimeout(function(){
  	draw = false;
  },time)


}



function bindEvent() {
  var start_btn = $("start"),
      middle_btn = $("middle"),
      end_btn = $("end");
  
  function get_input() {
    var interval = trim($("input_num").value);
    if(!test_num(interval)) {
    	alert("请输入正确的数值");
    	return false;
    } else {
    	return interval;
    }
  }
  addListenEvent(start_btn,"click",function(){
    var interval = get_input();
    /*有一个问题就是现在click之后 还是会开始新的绘制  通过在全局加入一个判断时候draw的属性来判断click的相应*/
    if(!draw) {
      var root = $("root");
      preOrder(root);
      render_queue(interval);
      queue = new Queue(); /*画完了重置queue*/
    } else {
      return false;
    }
  });

  addListenEvent(middle_btn,"click",function(){
    var interval = get_input();
    if(!draw) {
      var root = $("root");
      middleOrder(root);
      render_queue(interval);
      queue = new Queue();
    } else {
      return false;
    }
  });

  addListenEvent(end_btn,"click",function(){
    var interval = get_input();
    if(!draw) {
      var root = $("root");
      backOrder(root);
      render_queue(interval);
      queue = new Queue();
    } else {
      return false;
    }
  });


}


function init(){
	bindEvent();
}

init();

