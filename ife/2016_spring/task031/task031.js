define(function(require, exports, module) {
  require('../js/base.js');
  
  /*从数据库中得到的信息*/
  var citys = ['北京','上海','四川'];
  

  var index_select = 0,
      form = base.$("test"),
      radios = document.getElementsByName("status"),
      city_select = base.$("city");

  var ret = "";
  for(var i = 0,len = citys.length;i < len;i+=1) {
    ret += '<option value="'+i+'">' + citys[i] + '</option>'; 
  }
  city_select.innerHTML= ret;
  changeSchool(city_select.options.selectedIndex);

  base.addEventListener(city_select,"change",function(event){
  	var evt = event || window.event;
    changeSchool(city_select.options.selectedIndex);
  });
  /*刷新初始化的选择信息*/
  for(var i = 0,len = radios.length;i < len;i+=1) {
    (function(i){
      if(radios[i].checked) {
      	index_select = i;
      	tab(index_select);
      }
      base.addEventListener(radios[i],"click",function(){
      	index_select = i;
      	tab(index_select);
      });
    })(i);
  }

  function tab(index) {
    var tabs = base.getClass(form,"tab");
    for(var i = 0,len = tabs.length;i < len;i+=1) {
      if(i === index ) {
      	tabs[i].style.display = "block";
      } else {
      	tabs[i].style.display = "none";
      }
    }
  }

  function changeSchool(selectIndex){
    /*这里的逻辑是根据城市的id值 去数据库拉取schools*/

    var data = {
      "0":["清华大学","北京大学","北京工业大学"],
      "1":["复旦大学","同济大学","上海交通大学"],
      "2":["四川大学","西南财经大学","电子科技大学"]
    }
    var num = data[selectIndex],
        school_select = base.$("school"),
        ret = "";

    for(var i = 0,len = num.length;i < len;i+=1) {
      ret += '<option value="'+num[i]+'">' + num[i] + '</option>';
    }
    school_select.innerHTML = ret; 
    
  }


});

