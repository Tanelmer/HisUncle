/**
 * Created by lixinyi on 2015/7/30.
 */
window.onload = function(){
    imgLocal("container","box");
    //滚动到底后，加载的json数据
    var imgData={
        "data":[
            {"src":"images/bg3.jpg"},
            {"src":"images/bg11.jpg"},
            {"src":"images/bg10.jpg"},
            {"src":"images/pc1.jpg"},
            {"src":"images/pc2.jpg"},
            {"src":"images/pc3.jpg"},
            {"src":"images/bg4.jpg"},
            {"src":"images/pc5.jpg"},
            {"src":"images/bg8.jpg"}
        ]
    }
    //绑定滚动条事件
    window.onscroll =function(){
        if(checkFlag()){
            var _parent = document.getElementById("container");
            for(var i=0;i<imgData.data.length;i++){
                var ccontent = document.createElement("div");
                ccontent.className = "box";
                _parent.appendChild(ccontent);
                var boximg =document.createElement("div");
                boximg.className = "box_img";
                ccontent.appendChild(boximg);
                var img =document.createElement("img");
                img.src = imgData.data[i].src;
                boximg.appendChild(img);
            }
            imgLocal("container","box");
        }
    }
}
//检查高度，判断何时加载
function checkFlag() {
    var _parent = document.getElementById("container");
    var ccontent=getChildElement(_parent,"box");
    var lastContentHeight =ccontent[ccontent.length-1].offsetTop;
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;
    if(lastContentHeight<scrollTop+pageHeight){
        return true;
    }
}
//获取div，图片等节点
function imgLocal(parent,content){
    //将父元素下box取出
    var _parent=document.getElementById(parent);
    var ccontent=getChildElement(_parent,content);
    var imgWidth=ccontent[0].offsetWidth;
    var num=Math.floor(document.documentElement.clientWidth/imgWidth);//计算每一行放多少张图片
    _parent.style.cssText="width:"+imgWidth*num+"px;margin:0 auto;";//让所以图片居中显示
    var BoxHeightarr=[];
    for(var i=0;i<ccontent.length;i++){
        if(i<num){
        BoxHeightarr[i] =ccontent[i].offsetHeight;
        }else{
            var minheight =Math.min.apply(null,BoxHeightarr);
            var minIndex =getminheight(BoxHeightarr,minheight);
            ccontent[i].style.position ="absolute";
            ccontent[i].style.top =minheight+"px";
            ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";
            BoxHeightarr[minIndex] = BoxHeightarr[minIndex]+ccontent[i].offsetHeight;//定位在最矮的一张图片底下
        }
    }

}
//获取最矮的一张图片
function getminheight(BoxHeightArr,minHeight){
    for(var i in BoxHeightArr){
        if(BoxHeightArr[i] == minHeight){
            return i;
        }
    }
}
//获取子节点
function getChildElement(parent,content){
    var contentArr= [];
    var allcontent =parent.getElementsByTagName("*");
    for(var i=0;i<allcontent.length;i++){
        if(allcontent[i].className==content){
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}