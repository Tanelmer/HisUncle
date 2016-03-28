/*创建模块   整个页面分为两个调用  
var a = module_test()
var b = module_test() 分别管理上面和下面的区域
*/
function split_text(value) {
  var str = value;
  var num = str.split(/[\n,，.．;； 　]+/);/*这里的+是匹配多个  也就是;;也就惊醒匹配拆分*/
  return num;
}

var module_test = function(length,render) {  /*length是限制下面tag的值的  做了可变化的配置  render是需要输出值地方的id*/
  var limit = length,
      num = [],
      render_part = render;

  function push_num(nums) {
    if(!nums) {
      return false; /*不存在的情况下*/
    }

    for(var i =0,len = nums.length;i < len;i+=1) {
      if(num_exist(num,nums[i]) == false) {
        if(num.length + 1 <= length) {
          num.push(nums[i]);
        } else {
          num.shift();
          num.push(nums[i]);
        }
      } else {
        return false;
      }
    }

    $(render_part).innerHTML = render_html();
  }

  function render_html() {
    var result = "";
    for(var i = 0,len = num.length;i < len;i+=1) {
      result += '<div data-id="'+i+'" class="normal">' + num[i] + '</div>'; 
    }
    return result;
  }

  function delete_item(id) {
    if(!id) {
      return false;
    } /*应该创建一个判断是否存在值的函数*/

    /*应为id是根据数组生成的 所以数组中一定存在对应的数 直接操作就好*/


  }


  addListenEvent($(render_part),"click",function(event){
    var evt = event || window.event;
    var id = event.target.getAttribute("data-id");
    num.splice(id,1);
    $(render_part).innerHTML = render_html();
  });

  return {
    push_num:push_num
  }
}

var up = module_test(10,"up");
var input_up = $("input_up");

var down = module_test(10,"down");
var btn_down = $("add_btn");


addListenEvent(btn_down,"click",function(event){
  var evt = event || window.event;
  var num = [];

  var value = trim($("input_down").value);
  if(value.length > 0) {
    var get_value = trim(value.replace(/[\n,，．. 　;；]+/g," "));  /*我对连续输入两个都好的场景算作是出入一个逗号的处理*/
        num = get_value.split(" ");

    if(num.length == 1  && num[0] == "") {
      return false;
    } else {
      down.push_num(num);
      $("input_down").value = null;
    }
  } else {
    return false;
  }
  
  $("input_down").value = null;
  
});

addListenEvent(input_up,"keyup",function(event){
  var evt = event || window.event,
      num = [];
  /* \n = 13  space=32    逗号  需要判断全角 半角 keycode 值不一样 */
  /*console.log(evt.keyCode);*/
  var value = trim(evt.target.value);

  if(!value) {
    return false;
  }
  if(evt.keyCode === 13 || evt.keyCode === 32) {
    num.push(value);
    up.push_num(num);
    evt.target.value = null;
  }

  if(value.match(/[,，；;]+$/)) {
    var str = value.replace(/[,，;；]+$/,"");
    var get_value = trim(str);
    if(get_value.length > 0) {
      num.push(get_value);
      up.push_num(num);
      evt.target.value = null;
    } 
    
     evt.target.value = null;
  }

  
})
  

