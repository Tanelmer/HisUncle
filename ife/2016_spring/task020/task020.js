  var num = [];
  function renderNum(num) {
    var result = "",
        show_part = $("show_part");
    
    for(var i = 0,len = num.length;i < len;i+=1) {
      result += '<div data-id="'+i+'" class="normal">' + num[i] + '</div>';
    }/*在js中应该更少的涉及样式的处理 比如这里 我生成的div 是添加class的  我感觉不大好 */
    show_part.innerHTML = result;

  }

  function split_text(value) {
    var str = value;
    var num = str.split(/[\n,，.．;； 　]+/);/*这里的+是匹配多个  也就是;;也就惊醒匹配拆分*/
    return num;
  }


  

  var left_in = $("left_in"),
      right_in = $("right_in"),
      left_out = $("left_out"),
      right_out = $("right_out"),
      search_input = $("search_input"),
      search_btn = $("search_btn");


  addListenEvent(search_btn,"click",function(){
    var text = trim(search_input.value);
    /*当不输入的时候 不进行选择*/
    if(!text) {
      return false;
    }
    var search_range = $("show_part").children;

    for(var i = 0,len = search_range.length;i < len;i++) {
      removeClass(search_range[i],"select");
      if(search_range[i].textContent.indexOf(text) != -1) {
        addClass(search_range[i],"select");
      }
      
    }
  });

  addListenEvent(left_in,"click",function(){

  	var text = trim($("test").value);
    
  	/*我试着要把取值这段话 封装成函数 但是因为需要利用它的返回值  在alert的时候 不返回值 是undefined 就是会插入一个undefined*/
  	if(test_input_null(text)) {
      var get_num =  split_text(text);
      for(var i =0,len = get_num.length;i < len;i+=1) {
        num.unshift(get_num[i]);
      }
      renderNum(num);
    }
    

  });

  addListenEvent(right_in,"click",function(){
    var text = trim($("test").value);
    if(test_input_null(text)) {
      var get_num =  split_text(text);
      for(var i =0,len = get_num.length;i < len;i+=1) {
        num.push(get_num[i]);
      }
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
