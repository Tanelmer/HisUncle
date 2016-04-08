
/*
深度优先遍历
*/
function traverseDF(node,list) {
  (function recurse(currentNode){
  	for(var i = 0,length = currentNode.children.length;i < length;i+=1) {
  	  recurse(currentNode.children[i]);
  	}

  	list.push(currentNode);
  })(node);
}
/*
广度优先遍历
*/
function traverseBF(node,list) {
  var queue = new Queue();
  queue.enqueue(node);
  currentTree = queue.dequeue();
  while(currentTree) {
  	for(var i = 0,length = currentTree.children.length;i < length;i+=1) {
  		queue.enqueue(currentTree.children[i]);
  	}
  	list.push(currentTree);
  	currentTree = queue.dequeue();
  }
}
var draw = false;
var find = false;
function render(list,text,speed) {
  var i = 0,
      length = list.length,
      timer = null;
  
  timer = setInterval(function(){
  	draw = true;
  	if(i < length) {
  		var temp = i;
  		if(i > 0) {
  			list[temp-1].style.background = "white";
  		}
  		list[i].style.background = "red";
  		if(list[i].firstChild.textContent.indexOf(text) != -1  && text != "") {
  		  clearInterval(timer);
  		  list[i].style.background = "green";
  		  find = true;
  		  draw = false;
  		}
  		i++;
  	} else {
  		clearInterval(timer);
  		list[length-1].style.background = "white";
  		draw = false;
  		if(find == false && text != "") {
  		  alert("没有找到");
  		}

  	}
  },speed);
  
}

function reset() {
  var list = [],
  	  root = base.$("root");
  traverseBF(root,list);
    for(var i = 0,len = list.length;i < len;i++) {
      list[i].style.background = "white";
  	}
}

function bindEvent() {
  var root = base.$("root"),
      DF_btn = base.$("DF"),
      BF_btn = base.$("BF"),
      DF_search = base.$("DF_search"),
      BF_search = base.$("BF_search");
  /*代码需要优化 多余的必须  这部分有很多重复性的代码 优化 */
  base.addEventListener(DF_btn,"click",function(event){
  	var list = [];
  	var speed = base.trim(base.$("input_num").value);
  	if(!base.test_num(speed)) {
      alert("请输入正确的数字");
      return false;
  	}
  	if(!draw) {
  	  traverseDF(root,list);
      render(list,"",speed);	

  	} else {
  	  alert("动画中");
  	  return false;
  	}
    
  });
  base.addEventListener(BF_btn,"click",function(){
  	var list = [];
  	var speed = base.trim(base.$("input_num").value);
  	if(!base.test_num(speed)) {
      alert("请输入正确的数字");
      return false;
  	}
    if(!draw) {
  	  traverseBF(root,list);
      render(list,"",speed);	
  	} else {
  	  alert("动画中");
      return false;
  	}
  });
  base.addEventListener(DF_search,"click",function(){
  	reset();
  	var list = [];
  	var speed = base.trim(base.$("input_num").value);
  	var input_search = base.trim(base.$("input_text").value);
  	if(!base.test_num(speed)) {
  	  alert("请输入正确的数字");
      return false;  
  	}
  	if(!draw) {
  	  traverseDF(root,list);
      render(list,input_search,speed);	
  	} else {
  		alert("正在动画");
  		return false;
  	}
  });

  base.addEventListener(BF_search,"click",function(){
  	reset();
    var list = [];
  	var speed = base.trim(base.$("input_num").value);
  	var input_search = base.trim(base.$("input_text").value);
  	if(!base.test_num(speed)) {
  	  alert("请输入正确的数字");
      return false;  
  	}
  	if(!draw) {
  	  traverseBF(root,list);
      render(list,input_search,speed);	
  	} else {
      alert("正在动画");
      return false;
  	}	
  });

}



bindEvent();




/*var tree = new Tree("root");
tree.add("1","root",tree.traverseDF);
tree.add("2","root",tree.traverseDF);
tree.add("3","1",tree.traverseDF);
tree.add("4","1",tree.traverseDF);
tree.traverseDF(function(node){
  console.log(node.data);
});*/
