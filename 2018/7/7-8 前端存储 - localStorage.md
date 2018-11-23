> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处

# localStorage 介绍
在HTML5中，引入了两个新的前端存储特性：

* localStorage
* sessionStorage

这两者非常相似，都是用来在前端保存一定量的数据，称为前端存储，但是这两者仍然存在一定区别：

* 生命周期：
    * localStorage: localStorage的生命周期是永久的，即使关闭页面、浏览器，其中的内容也不会消失，除非手动删除localStorage中的内容
    * sessionStorage: sessionStorage的生命周期是一次浏览器窗口会话，浏览器窗口指的是一组同源页面(来自于一个域名)的浏览器页面集合，当这些窗口全部关闭之后，sessionStorage的内容将不会存在
* 存储大小：
    * 两者都为5MB/域名
* 存储位置：
    * 两者都保存在客户端，不与服务器进行交互
* 存储内容类型：
    * 两者都只能存储字符串，但是可以通过类型转换来存储各类数据
* 获取方式：
    * localStorage: window.localStorage
    * sessionStorage: sessionStorage

可见localStorage适合在前端存储长时间使用的数据， 而sessionStorage适合存储短期使用、一次性的数据

另外这里要提一句，sessionStorage并不是session：

* sessionStorage中的‘session’是指浏览器窗口会话，而后者的‘session’指的是服务器会话
* 前者是前端存储，与服务器无关，而后者的实现依赖于服务器

这里只介绍更加常用的localStorage的使用，而sessionStorage的使用其实也类似

# localStorage的使用
localStorage作为一个在HTML5中引入的特性，在IE6/7等一些低版本的浏览器中是无法被支持的，所以建议在使用localStorage之前先检查浏览器支持情况：

```javascript
if (!window.localStorage) {
    // 当浏览器不支持 localStorage ...
} else {
    // 浏览器支持 localStorage ...
}
```

localStorage的使用也很简单，在localStorage中，数据都是以键值对的形式存在，可以使用json对象的形式直接对localStorage中的键值对进行操作：

```javascript
// 设置数据
localStorage.a = 'hello';
localStorage.b = 'zero';
// 读取数据
console.log(localStorage.a);
console.log(localStorage.b);
```

就那么简单

但是这里要注意一点，存储在localStorage中的数据一定是以字符串形式存在的，所以当你存入/读取其他形式的数据时，需要进行类型转换才行：

```javascript
// 存入 json 数据
localStorage.jsonTest = JSON.stringify({
    a: 'hello',
    b: 'zero'
});

// 读取 json 数据
console.log(JSON.parse(localStorage.jsonTest).a);
console.log(JSON.parse(localStorage.jsonTest).b);
```

# 使用js库来操作localStorage
有很多js库提供了一系列简化localStorage并且提供跨平台操作的功能，使用它们可以更加轻易地使用localStorage，这里介绍一个js库——store.js

store.js 的一大优点就是他将为你自动进行类型转换，相当于你可以直接在 localStorage 中储存诸如 json 对象等类型的数据，这些对你来说是透明的

安装：

```shell
npm install store
```

API：

```javascript
// 引入
let store = require('store');

// 设置数据
store.set('user', {
    name: 'Kindem'
});

// 获取数据
let obj = store.get('user');

// 删除数据
store.remove('user');

// 删除所有数据
store.clearAll();

// 遍历键值对
store.each((value, key) => {
    // do something ...
});
```

# 参考

* [https://www.cnblogs.com/cencenyue/p/7604651.html](https://www.cnblogs.com/cencenyue/p/7604651.html)
* [https://www.cnblogs.com/st-leslie/p/5617130.html](https://www.cnblogs.com/st-leslie/p/5617130.html)
* [http://www.w3school.com.cn/html5/html_5_webstorage.asp](http://www.w3school.com.cn/html5/html_5_webstorage.asp)
* [https://www.npmjs.com/package/store](https://www.npmjs.com/package/store)
