define(function(require,exports,module){
  require('../js/base.js');
  require('../js/queue.js');

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


function reset() {
  var list = [],
      root = base.$("root");
  traverseBF(root,list);
    for(var i = 0,len = list.length;i < len;i++) {
      if(list[i].nodeName !== "SPAN") {
        list[i].style.background = "white";
      }
    }
}

function add(nums) {
  var fragment = document.createDocumentFragment();
  for(var i = 0,len = nums.length;i < len;i+=1) {
    var div = document.createElement("div");
    div.setAttribute("class","son");
    div.innerHTML = "<span>" + nums[i] + "</span>";
    div.style.backgroundColor = "white";
    fragment.appendChild(div);
  }

  return fragment;

}
var deleteNode = null;
function bindEvent() {
  var root = base.$("root"),
      delete_btn = base.$("delete_btn"),
      add_btn = base.$("add_btn"),
      search_btn = base.$("search_btn"),
      add_text = base.$("add_text"),
      search_text = base.$("search_text");

 


  /*
  *委托  单击选中
  */
  base.addEventListener(root,"click",function(event){
    reset();
    var evt = event || window.event;
    if(evt.target.nodeName == "SPAN") {
      var parent = evt.target.parentNode;
      parent.style.backgroundColor = "blue";
      var children = parent.children;
      for(var i = 1,len = children.length;i < len;i+=1) {
        children[i].style.display = "none";
      }
    } else {
      evt.target.style.backgroundColor = "blue";
    }

    deleteNode = event.target;
  });
  /*
  *委托 双击取消
  */
  base.addEventListener(root,"dblclick",function(event){
    /*此处没有必要使用reset 操作太多*/
    var evt = event || window.event;
    if(evt.target.nodeName == "SPAN") {
      var parent = evt.target.parentNode;
      parent.style.backgroundColor = "white";
      var children = parent.children;
      for(var i = 1,len = children.length;i < len;i+=1) {
        children[i].style.display = "block";
      }

    } else {
      event.target.style.backgroundColor = "white";
    }
    deleteNode = null;
    
  });

  base.addEventListener(delete_btn,"click",function(){
    
    if(deleteNode === null) {
      alert("您没有选中节点");
      return false;
    }
    var parent = deleteNode.parentNode;
    root.removeChild(deleteNode);
    deleteNode = null;
  });
  
  base.addEventListener(add_btn,"click",function(){
    if(deleteNode === null) {
      alert("您没有选中节点");
      return false;
    }

    
    var get_text = base.trim(add_text.value);
    if(get_text == "") {
      alert("您没有输入内容");
      return false;
    }
    /*全角半角的逗号分隔*/
    var nums = get_text.split(/[,，]+/);
    var fragment = add(nums);
    deleteNode.appendChild(fragment);

  });

  base.addEventListener(search_btn,"click",function(){
    var get_text = base.trim(search_text.value);
    if(get_text == "") {
      alert("您没有输入内容");
      return false;
    }
    var list = []
    traverseBF(root,list);
    for(var i = 0,len = list.length;i < len;i+=1) {
      if(list[i].innerHTML == get_text) {
        var parent = list[i].parentNode;
        reset();
        parent.style.background = "blue";
        deleteNode = parent;
        var children = parent.children;
        for(var i = 1,len = children.length;i < len;i+=1) {
          children[i].style.display = "block";
        }
      }
    }
    list = [];
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



});