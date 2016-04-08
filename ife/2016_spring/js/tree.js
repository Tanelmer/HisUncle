/*需要引入队列*/

function Node(data) {
  this.data = data;
  this.parent = null;
  this.children = [];
}

function Tree(data) {
  var node = new Node(data);
  this._root = node;
}
/*深度优先遍历树  递归*/
Tree.prototype.traverseDF = function(callback) {
  (function recurse(currentNode){
  	for(var i = 0,length = currentNode.children.length;i < length;i+=1) {
  	  recurse(currentNode.children[i]);
  	}

  	callback(currentNode);
  })(this._root);
}

/*var tree = new Tree("one");
tree._root.children.push(new Node("two"));
tree._root.children[0].parent = tree;
tree._root.children[0].children.push(new Node("three"));
tree._root.children[0].children[0].parent = tree._root.children[0];
tree._root.children[0].children.push(new Node("four"));
tree._root.children[0].children[1].parent = tree._root.children[0];*/

/*数据模拟*/

/*tree.traverseDF(function (node){
  console.log(node.data);
});*/
/*模拟深度优先*/



/*广度优先遍历*/
Tree.prototype.traverseBF = function(callback) {
  var queue = new Queue();

  queue.enqueue(this._root);
  currentTree = queue.dequeue();
  while(currentTree) {
  	for(var i = 0,length = currentTree.children.length;i < length;i+=1) {
  		queue.enqueue(currentTree.children[i]);
  	}
  	callback(currentTree);
  	currentTree = queue.dequeue();
  }
}

/*调用广度优先*/
/*tree.traverseBF(function(node){
	console.log(node.data);
});*/


/*查找方法 因为树有两种遍历的方式 所以提供了两种的查找方案*/
Tree.prototype.contains = function(callback,traversal) {
  traversal.call(this,callback);
};

/*tree.contains(function(node){
  if(node.data === "two") {
    console.log(1);		
  }
},tree.traverseBF);*/

/*add 方法 */
Tree.prototype.add = function(data,toData,traversal) {
  var child = new Node(data),
      parent = null,
      callback = function(node) {
      	if(node.data === toData) {
      	  parent = node;
      	}
      };
  this.contains(callback,traversal);
  if(parent) {
  	parent.children.push(child);
  	child.parent = parent;
  } else {
  	throw new Error("can not add a non-exist parent");
  }

}
/*模拟加入数据*/
/*var tree = new Tree("one");
tree.add("two","one",tree.traverseBF);
tree.add("three","one",tree.traverseBF);

tree.traverseBF(function(node){
  console.log(node.data);
});*/

function findIndex(arr,data) {
  var index;
  for(var i = 0;i < arr.length;i+=1) {
  	if(arr[i] === data) {
  		index = i;
  	}
  }

  return index;
}

Tree.prototype.remove = function(data,fromData,traversal) {
  var tree = this,
      parent = null,
      childToRemove = null,
      index;

  var callback = function(node) {
  	if(node.data === fromData) {
      parent = node;
  	}
  };
  this.contains(callback,traversal);

  if(parent) {
    index = findIndex(parent.children,data);
    if(index === undefined) {
      throw new Error("node to remove do not exist");
    } else {
    	childToRemove = parent.children.splice(index,1);
    }
  } else {
  	throw new Error("parent do not exist")
  }

  return childToRemove;
}