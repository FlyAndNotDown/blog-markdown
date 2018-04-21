> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处

# axios是什么
axios是一个http库，可以在浏览器和node.js中使用。你大可在React和vue等框架中使用它，目前它是vue官方推荐的http库之一。

对于不太了解http库的前端人员，可以直接把它理解成一个ajax库，你可以使用它来发送ajax请求(当然功能不局限于此)，就像jQuery中集成的ajax请求那样简单。

# 安装
cdn:
```
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

npm:
```
npm install axios
```

yarn:
```
yarn add axios
```

# 使用axios发送异步请求
发送GET请求
```javascript
axios
  .get('/test?page=2')
  .then(function (response) {
    // 响应完成的钩子函数

    // 响应的body在response.data中，如果是以json格式传回，则可以直接使用，response中还有一些其他的响应内容
  })
  .catch(function (error)) {
    // 产生错误的钩子函数
  };

// get传递参数的另外一种方式
axios
  .get('/test', {
    params: {
      page: 2
    }
  })
  .then(function (response) {
    // ...
  })
  .catch(function (error) {
    // ...
  });
```

发送POST请求
```javascript
axios
  .post('/test', {
    page: 2
  })
  .then(function (response) {
    // ...
  })
  .catch(function (error) {
    // ...
  });
```
