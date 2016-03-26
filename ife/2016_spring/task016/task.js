var aqiData = {},
	add_btn = document.getElementById('add-btn'),
	show_table = document.getElementById('aqi-table');

function addAqiData() {
	var city_name = document.getElementById('aqi-city-input').value,
		city_air = document.getElementById('aqi-value-input').value,
		city_name_trim = trim(city_name),
		city_air_trim = trim(city_air);

	/*[\u4E00-\u9FA5\uf900-\ufa2d] 匹配中文字符*/   /*^ 匹配开头 $ 匹配结尾 + 匹配子表达式一次或者多次 */
	/*var str = city_name.match(/^[\u4E00-\u9FA5\uf900-\ufa2d]+$/g);  */
	if(!city_name_trim.match(/^[A-Za-z\u4E00-\u9FA5\uf900-\ufa2d]+$/g)) {
		alert("您输入的城市名称必须是中英文字符");
		return false;
	}
	if(!city_air_trim.match(/^[0-9]+$/)) {
		alert("您输入的空气质量指数必须是整数");
		return false;
	}
	aqiData[city_name_trim] = city_air_trim; /*相同的城市的话 就是改写相同城市的值*/

}

function trim(str) {
	return str.replace(/^\s+|\s+$/g,'');  //去掉头尾的空格
}

function renderAqiList(data) {
	var result = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
	show_table.innerHTML = result;

	if(!data) {
		show_table.innerHTML = result;
	} else {
		for(var city in data) {
			result += '<tr><td>' + city + '</td><td>' + data[city] + '</td><td>' + '<button id=' + city + '>' +'删除' +'</button></td></tr>';
			show_table.innerHTML = result;
		}
	}
}

function addBtnHandle() {
		addAqiData();
		renderAqiList(aqiData);
		
}

function delBtnHandle(id) {
		delete aqiData[id];

		renderAqiList(aqiData);
}

function init() {
	add_btn.addEventListener('click',addBtnHandle,false);
	show_table.addEventListener('click',function(event){
		delBtnHandle(event.target.id);
	},false);
	/*event.target 是实际触发该事件的元素  event.currentTaget 是绑定事件处理的函数的元素*/
}

init();

function addLoadEvent(func) {
	var oldonload = window.onload;
	if(typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

addLoadEvent(init);  //在页面onload后执行事件  我将获取元素放在了函数的外边 这样将task.js 移动到页面的上面的时候还是会出错(解决就是讲获取元素的操作放置在函数中)



