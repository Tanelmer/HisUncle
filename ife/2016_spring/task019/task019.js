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

  var sort_btn = $('sort');
  addListenEvent(sort_btn,'click',function() {
    var len = num.length,
        i,
        j,
        temp;

    for(i = len -1;i >=1;i--) {
      for(j = 0;j <= i-1;j++) {
        if(num[j] > num[j+1]) {
          temp = num[j];
          num[j] = num[j+1];
          num[j+1] = temp; 
        }
      }

      renderNum(num);
    }
  });
