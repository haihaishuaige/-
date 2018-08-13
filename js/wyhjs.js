﻿// �ж�һ��ʵ�������� �Ƿ�������ԭ�Ͷ�������
function hasPrototypeProperty(obj, pro) {
    //  hasOwnProperty   in
    if (!obj.hasOwnProperty(pro) && (pro in obj)) {
        return true;
    }
    return false;
}

// js��ȡurl�Ĳ���
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

function returnNoSpace(str) {
    return str.replace(/\s+/g, ' ');
}



// 兼容性滚动条
document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
var arr = [{
        isb: false,
        name: "aaa"
    },
    {
        isb: true,
        name: "bbb"
    },
    {
        isb: false,
        name: "ccc"
    }
];

/*
filter:	检测数值元素，并返回符合条件所有元素的数组。
params:function(item 每一项  index 索引 thisArr 数组本身)
return:返回 function里的每一项的返回值为ture的新数组
*/
// var arr1=arr.filter(function(item,index,thisArr){
//     return item.isb;
// })

/*
every 检测数值元素的每个元素是否都符合条件
array.every(function(currentValue,index,arr), thisValue)
thisValue:可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。
如果省略了 thisValue ，"this" 的值为 "undefined"
*/
// var index=0;
// var arr1=arr.every(function(item,index){
//     index++;
//     console.log(index);
//     return item.isb;
// })

/*
map:方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
array.map(function(currentValue,index,arr), thisValue)
*/
// var arr1=arr.map(function(item,index){
//     return item.name+ " === ";
// });

// push 往屁股添加一个值 返回数组的长度 4= arr.push(d)  arr= [a, b, c, d]
// pop   从屁股移除一个值 返回被删除的值 c= arr.pop()   arr= [b, c]
// unshift 从头部添加一个值 返回数组的长度 4= arr.unshift(0) arr= [0, a, b, c]
// shift 从头部删除一个值 返回被删除的值  a= arr.shift() arr= [b, c]


function whatScreen() {
    var width = document.querySelector("html").offsetWidth;
    var title = document.querySelector("title");
    if (width <= 768) {
        title.innerHTML = "极小屏幕-" + width;
    } else if (width > 768 && width <= 992) {
        title.innerHTML = "小屏幕-" + width;
    } else if (width > 992 && width <= 1200) {
        title.innerHTML = "普通屏幕-" + width;
    } else if (width > 1200) {
        title.innerHTML = "大屏幕-" + width;
    }
}


// 将超出行数的部分 变成 ...
.line - 2 {
    display: -webkit-box;
    overflow: hidden;
    white-space: normal!important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical
}


// 分页逻辑
// (QueryObj.page-1)*QueryObj.pageSize+i+1)


function show() {
    let x = 1,
        up = !1;
    setInterval(() => {
        (75 === x || 1 === x) && (up = !up), up ? x++ : x--, console.log(`%c${`■`.repeat(x)}`, `color: hsl(${2*x}, 100%, 50%)`)
    }, 10);

}
// 多行溢出显示省略号
overflow: hidden;
text - overflow: ellipsis;
display: -webkit - box; -
webkit - line - clamp: 2; -
webkit - box - orient: vertical;


增大背景图片的响应区域
1 给元素添加 box - sizing: border - box;
2 给元素添加 背景原点和背景裁切 content - box
3 动态增大padding


function checkPhone(phone) {
    if (!(/^1[34578]\d{9}$/.test(phone))) {
        return false;
    } else {
        return true;
    }
}

function checkEmail(myemail) {　　
    var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    if (myReg.test(myemail)) {　　　　
        return true;　　
    } else {　　　　
        return false;
    }
}

  // 创建
  var evt = document.createEvent("HTMLEvents");
  // 初始化，事件类型，是否冒泡，是否阻止浏览器的默认行为
  evt.initEvent("tap", false, false);
  // 触发
  div.dispatchEvent(evt);