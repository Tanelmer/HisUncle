  var num = [];
      length_limit = 60;

  function createNum(num,length) {
    var temp = [];
    for(var i = 0;i <= length;i+=1) {
      var random_num = Math.ceil(Math.random()*100);
      temp.push(random_num);
    }
    return temp;
  }

  var num = createNum(num,20);    
  function renderNum(num) {
    var result = "",
        show_part = $("show_part");
    
    for(var i = 0,len = num.length;i < len;i+=1) {
      result += '<div title="'+num[i]+'"  data-id="'+i+'" style="height:'+ num[i]+'px;">' + num[i] + '</div>';
    }
    show_part.innerHTML = result;

  }
  renderNum(num);

  var left_in = $("left_in"),
      right_in = $("right_in"),
      left_out = $("left_out"),
      right_out = $("right_out");

  addListenEvent(left_in,"click",function(){

  	var text = $("test").value;
  	if(!test_num(text)) {
  		alert("请输入数字");
  		return false;
  	}
  	/*我试着要把取值这段话 封装成函数 但是因为需要利用它的返回值  在alert的时候 不返回值 是undefined 就是会插入一个undefined*/
  	var insert = parseInt(trim(text));
    if( (num.length + 1)  > length_limit) {
      alert("超出最长的限制");
      return false;
    } 

    if(!num_range(insert,10,100)) {
      alert("请输入10-100之间的数字");
      return false;
    } else {
      num.unshift(insert);
      renderNum(num);
    }
  });

  addListenEvent(right_in,"click",function(){
    var text = $("test").value;
    console.log(typeof text);
  	if(!test_num(text)) {
  		alert("请输入数字");
  		return false;
  	}
  	var insert = parseInt(trim(text));
    if( (num.length +1) > length_limit ) {
      alert("超出最长的限制");
      return false;
    } 
    if(!num_range(insert,10,100)) {
      alert("请输入10-100之前的数字");
      return false;
    } else {
      num.unshift(insert);
      renderNum(num);
    }  
  	
  })

  addListenEvent(right_out,'click',function(){
  	var get_num = num.pop();
  	alert("您从右侧删除了" + get_num);
  	renderNum(num);
  });

  addListenEvent(left_out,'click',function(){
  	var get_num = num.shift();
  	alert("您从左侧删除了" + get_num);
  	renderNum(num);
  });

  var container = $("show_part");
  addListenEvent(container,'click',function(event){
  	var get_num = event.target.getAttribute("data-id");
  	num.splice(get_num,1);
  	renderNum(num);
  })

  
  var flag = 0;  /*排序的动画展示部分 自己的确没有想好  抄袭了使命必达组*/
  function sortAqiData() {
    var i = num.length - 1;
    var t;
    sortAqiData.moveOne = function() {
      renderNum(num);
      var temp = num[i];
      var index = i;
      for(var j = 0;j < i;j+=1) {
        if(flag === 0 && num[j] > temp) {
          temp = num[j];
          index = j;
        } else if(flag === 1 && num[j] < temp) {
          temp = num[j];
          index = j;
        }
      }
      /*先从前面找到第一个比最后一个数大的位置和数字的大小*/
      document.getElementById("show_part").children[index].style.backgroundColor = "green";
      num.splice(index,1);
      num.push(temp);
      i--;

      if(i < 0) {
        clearInterval(t);
        renderNum(num);
        if(flag === 0) {
          flag = 1;
        } else if(flag === 1) {
          flag = 0;
        }
      }
    }
    t = setInterval("sortAqiData.moveOne()",50);
  }

  var sort_btn = $("sort");
  addListenEvent(sort_btn,"click",function(){
    sortAqiData();
  });
  
