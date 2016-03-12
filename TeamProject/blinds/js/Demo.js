/**
 * Created by Tane on 2016/3/12.
 */
    //版本一
/*var h3Arr = document.getElementsByTagName("h3");
var mainDom = document.getElementById("main");
var liArr = mainDom.querySelectorAll("ul");
for(var i=0;i<h3Arr.length;i++){
    h3Arr[i].onclick=function(i){
        if(this.nextElementSibling.hasAttribute("class")){
            this.nextElementSibling.removeAttribute("class");//block
        }else{
            this.nextElementSibling.setAttribute("class","active");
        }
    }
}*/
//版本二
var h3Arr = document.getElementsByTagName("h3");
var mainDom = document.getElementById("main");
var liArr = mainDom.querySelectorAll("ul");
console.log(h3Arr)
console.log(mainDom)
console.log(liArr)
for(var i in h3Arr){
//    h3Arr[i].addEventListener('click',function(){
//        alert(i)
//    },true)
    h3Arr[i].onclick=function(){
        if(this.nextElementSibling.hasAttribute("class")){
            this.nextElementSibling.removeAttribute("class");//block
        }else{
            this.nextElementSibling.setAttribute("class","active");
        }
    }
}
//弄不出来了，GG好么。。补充知识去。。
