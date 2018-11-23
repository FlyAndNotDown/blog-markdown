> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处。另外，该文章收纳在[Kindem的个人的 IT 知识整理仓库](https://github.com/FlyAndNotDown/it-knowledge-collection)，欢迎 Star、Fork、投稿

# Ajax跨域简介

所谓Ajax跨域指的是Ajax请求从其他的域获取数据或者传输数据

所谓域同源，指的是两个服务器资源的根url的域名、端口、协议三者完全相同，只要三者中任何一个不同，则说明产生了跨域

给一个例子，对于第一个服务器资源，其他一些url的同源情况如下:

```
http://www.test.com/index.html

http://www.test.com/index.js            同源
http://www.test.com/login/login.js      同源
https://www.test.com/index.html         跨域(协议)
http://www.a.com/index.html             跨域(域名)
http://a.com/index.html                 跨域(不同子域)
http://www.test.com:8080/index.html     跨域(端口)
```

# 常用跨域方法
## CORS

CORS是一个W3C标准，其全称为Cross-Origin Resource Sharing，即跨域资源共享。它允许浏览器向跨域服务器发送XMLHttpRequest请求，从而克服了Ajax只能同源使用的限制

CORS需要浏览器和服务器同时支持，目前主流浏览器都支持这个标准(IE>=10)，所以CORS的关键主要在于服务器，要支持这个功能，往往开发者需要在服务器端进行额外设置

另外，CORS标准对用户来说是透明的，用户感知不到CORS的存在，一切都是浏览器自动完成。当浏览器检测到跨域的Ajax请求时，就会自动做出一些处理，使得请求能够跨域

跨域的Ajax请求分为两种：

* 简单请求:
    * 请求方法为HEAD、POST、GET之一
    * HTTP头字段只有Accept、Accept-Language、Content-Language、Last-Event-ID、Content-Type中的一种或多种
    * HTTP头字段中的Content-Type字段的取值为application/x-www-form-urlencoded、multipart/form-data、text/plain之一
* 非简单请求: 所有不满足上述规则的请求

CORS对于两种不同的请求的处理是不同的

对于简单请求，一个跨域Ajax请求的处理流程如下:

1. 浏览器自动在本次请求的HTTP头中添加Origin字段，表示这次请求来自的域
2. 服务器根据Origin字段判断这一次请求是否在许可范围内：
    * 如果不在，返回一个正常的HTTP响应，只不过响应的HTTP头中没有Access-Control-Allow-Origin字段，浏览器将认为这一次跨域Ajax没能成功
    * 如果在，服务器会在响应HTTP头中添加这几个字段
        * Access-Control-Allow-Origin: 这个字段标识服务器认同的Origin，这个Origin为*时标识服务器认同所有源。只有请求的HTTP头的Origin与该字段同源时，浏览器才会认为这一次跨域Ajax请求成功了
        * Access-Control-Allow-Credentials: 这个字段标识服务器允许Cookie，如果设置为true则标识允许，默认为不允许
        * Access-Control-Expose-Headers: 允许XMLHttpRequest获取的额外字段名

对于非简单请求，一个跨域Ajax请求的处理流程如下:

1. 浏览器在发送正式的Ajax请求之前，会提前发送一次OPTIONS请求，头信息中有:
    * Origin: 请求的源
    * Access-Control-Request-Method: 浏览器会用的的HTTP方法
    * Access-Control-Request-Headers: 浏览器会额外发送的头信息字段
2. 收到这个请求之后，服务器将会返回一些控制信息，最重要的仍然是上面说到的判定是否允许跨域的Access-Control-Allow-Origin
3. 如果服务器返回了一个正常的HTTP响应，则浏览器会认为OPTIONS请求成功，接下来则会进行真正的的请求
4. 服务器正常处理真正的请求，并且在返回的HTTP响应中也带上Access-Control-Allow-Origin，浏览器会再一次校验这一字段

可见CORS标准本身并不复杂，其核心是**服务器和浏览器验证域是否被允许**

## JSONP

JSONP的全称为JSON with Padding，是JSON数据的一种使用模式，JSONP同样是为了支持跨域Ajax请求而生的，但是它相对CORS来说对古老的浏览器兼容性较好，也更加简单。

JSONP的原理是JavaScript注入，在html中使用script标签引入JavaScript脚本是不会受到同源限制的，这意味着可以通过script标签引入来自跨域的脚本，像这样:

```html
// origin:  http://www.test.com

<script>
    function dealData(jsonData) {
        // do something with jsonData
    }
</script>
<script src="http://www.a.com/data.js"></script>
```

想象一下如果引入的脚本是这样的:

```javascript
dealData({
    username: 'kindem',
    age: 15,
    // ...
});
```

不是就相当于从服务器拿到一段数据并且进行处理了吗?

接下来可以设想一下，假设服务器对于`src`指向的`url`的处理并不是返回一个静态文件，而是动态地组合出一段文本，这段文本一上面给的形式返回，里面的参数由服务器动态生成，而调用的函数则是前端约定好的函数，则相当于变相地返回了一段跨域的数据，这就是JSONP的核心思想
