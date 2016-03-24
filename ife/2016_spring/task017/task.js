function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}


function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

/*以上两个函数用于模拟数据*/

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

console.log(aqiSourceData["北京"]);
var charData = {};

var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}


function citySelectChange() {
	var select = $('city-select');
	var index = select.selectedIndex;
	pageState.nowSelectCity = index;
	renderChart();

}
/*读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项  
给select设置事件，当选项发生变化时调用函数citySelectChange*/
function initCitySelector(data) {

  var select = document.getElementById('city-select'),
      result = "",
      i      = 0;

  if(!data) {
    return false;
  }
  for(var city in data) {
  	result += '<option value='+ i++  +'>' + city + '</option>';
  }

  select.innerHTML = result;

  select.children[0].setAttribute('selected','selected');
  /*即使是默认的 我认为在修改city的时候  都有必要将默认值重新设置下*/

  pageState.nowSelectCity = 0;

  /*select.onchange = function() {
  	console.log(1);
  }*/

  addListenEvent(select,'change',citySelectChange);
}

/*图表渲染函数 在对日期的柱状条进行渲染的时候 我通过数据来设定高度  并对数据进行了一定比例的缩放来表示高度 */
function renderChart() {
  var city_num = [];
  for(var city in aqiSourceData) {
    city_num.push(city);
  }
  var time_type = pageState.nowGraTime,
      city_type = city_num[pageState.nowSelectCity],
      data = aqiSourceData[city_type],
      result = "",
      show_part = document.getElementsByClassName('aqi-chart-wrap')[0];
      
      
  if(time_type === "day") {
    for(var day in data) {
    	result += '<div class="day" style="height:'+ parseInt(data[day])+'px" title="'+ (day + ' ' +data[day]) + '">' + '</div>';
    }
    show_part.innerHTML = result;
    return;
  }

  if(time_type === "week") {
    var weeknum = 0;
    var count = 0;
    var temp = {
    	value:0,
    	count:0
    }
    for(var day in data) {
      
      count++;
      var date = new Date(day);
      switch(date.getDay()) {
        case 1: {
          temp["value"] += data[day]; /*题目要求是从从周一到周日  也就是 1-0  在0的时候重置数目*/
          break;
        }
        case 2: {
          temp["value"] +=  data[day];
          break;
        }
        case 3: {
          temp["value"] +=  data[day];
          break;
        }
        case 4: {
          temp["value"] +=  data[day];
          break;	
        }
        case 5: {
          temp["value"] +=  data[day];
          break;	
        }
        case 6: {
          temp["value"] +=  data[day];
          break;
        }
        case 0: {
          temp["value"] +=  data[day];
          temp["count"] = count;
          charData[weeknum] = parseInt(temp.value/temp.count);
          temp = {
          	value:0,
          	count:0
          };
          count = 0;
          weeknum++;
          break;
        }   
      }

    }
    
    var i = 0,
        result = "";


    for(var data in charData) {

    	result += '<div class="week" style="height:'+ charData[data]+'px" title="'+(i + ' ' + charData[data])+'">' + '</div>';
    	i++;
    }
    show_part.innerHTML = result;
    charData = {};/*对数据进行清零*/
    return;
  }

  if(time_type === "month") {

  	
  	var old_month = "";
  	for(var day in data) {
      var date = new Date(day);
      old_month = date.getMonth();
      break;
    }


    var monthnum = 0;
    var count = 0;
    var temp = {
      value:0,
      count:0
    };
  	for(var day in data) {
      
  	  var date = new Date(day);
  	  /*getMonth的返回值是实际的月份减去1  也就是2016-02-25 返回的是1  要区分今年的12月和去年的12月不是一个月*/
  	  if(date.getMonth() === old_month) {
        
        count++;
        temp["value"] += data[day];
        temp["count"] = count;
        
      } else {
        charData[monthnum] = parseInt(temp["value"]/temp["count"]);
        monthnum++;
        
        count = 1;
        var temp = {
          value:0,
          count:0
        }
        old_month = date.getMonth();
        temp["value"] += data[day];
        temp["count"] = count;
      }

  	}
    charData[monthnum] = parseInt(temp["value"]/temp["count"]);
    
    var result = "";
  	for(var data in charData) {
      result += '<div class="month" style="height:'+ charData[data] +'px;" title="'+(data + " " + charData[data])+'">' + '</div>';
    }
  	show_part.innerHTML = result;
    charData = {};/*对数据进行清零*/
    return;
  }



}

/*初始化日、周、月的radio事件，当点击时，调用函数graTimeChange*/
function initGraTimeForm() {
  var wrapper = $("form-gra-time");

  addListenEvent(wrapper,'click',function(event){
    graTimeChange(event.target.value);

  });

}

function graTimeChange(data) {
  // 确定是否选项发生了变化  没有发生改变的话 不进行操作
  if( data === pageState.nowGraTime) {
  	return false;   
  }

  pageState.nowGraTime = data;
  // 设置对应数据

  renderChart();
  // 调用图表渲染函数
}



function init() {
  initGraTimeForm();
  initCitySelector(aqiSourceData);
  renderChart();
}

addLoadEvent(init);




