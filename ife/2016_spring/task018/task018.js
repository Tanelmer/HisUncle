  var num = [1,2,100,50];
  function renderNum(num) {
    var result = "",
        show_part = $("show_part");
    
    for(var i = 0,len = num.length;i < len;i+=1) {
      result += '<div data-id="'+i+'">' + num[i] + '</div>';
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
  	num.unshift(insert);
  	renderNum(num);

  });

  addListenEvent(right_in,"click",function(){
    var text = $("test").value;
  	if(!test_num(text)) {
  		alert("请输入数字");
  		return false;
  	}

  	var insert = parseInt(trim(text));
  	num.push(insert);
  	renderNum(num);
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
