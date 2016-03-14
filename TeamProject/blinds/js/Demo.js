/**
 * Created by Tane on 2016/3/12.
 */
    //版本一
//在数组中剔除本身并不可行，必须在循环中剔除，所以就会造成数组长度变短。
Array.prototype.remove = function (dx) {
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
            this[n++] = this[i];
        }
    }
    this.length -= 1;
}

var h3Arr = document.getElementsByTagName("h3");
var mainDom = document.getElementById("main");
var liArr = mainDom.querySelectorAll("ul");
var arr = [];
for (var i = 0; i < h3Arr.length; i++) {
    h3Arr[i].index = i;
    arr.push(h3Arr[i].index);
    h3Arr[i].onclick = function () {
        if (h3Arr[this.index].nextElementSibling.hasAttribute("class")) {//block
            h3Arr[this.index].nextElementSibling.removeAttribute("class");
        } else {
            h3Arr[this.index].nextElementSibling.setAttribute("class", "active");
        }
    }
}

////版本二
//var h3Arr = document.getElementsByTagName("h3");
//var mainDom = document.getElementById("main");
//var liArr = mainDom.querySelectorAll("ul");
//console.log(h3Arr)
//console.log(mainDom)
//console.log(liArr)
//for(var i in h3Arr){
////    h3Arr[i].addEventListener('click',function(){
////        alert(i)
////    },true)
//    h3Arr[i].onclick=function(){
//        if(this.nextElementSibling.hasAttribute("class")){
//            this.nextElementSibling.removeAttribute("class");//block
//        }else{
//            this.nextElementSibling.setAttribute("class","active");
//        }
//    }
//}
//弄不出来了，GG好么。。补充知识去。。
