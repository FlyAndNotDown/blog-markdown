> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处

前几天去腾讯面试Web前端开发工程师，被问到了这个问题，之前有看过这一方面的内容，但是时间过久了就只记得要使用XMLHttpRequest了，回头赶紧补一补。

# 使用原生js封装ajax
```javascript
export class Ajax {
    static get(url, data, hook) {
        let xmlHttpRequest = new XMLHttpRequest();

        url += '?';
        let count = -1;
        for (let key in data) {
            count++;
            if (data.hasOwnProperty(key)) {
                url += count === 0 ? key + '=' + data[key] : '&' + key + '=' + data[key];
            }
        }

        xmlHttpRequest.open('GET', url, true);
        xmlHttpRequest.onreadystatechange = () => {
            if (xmlHttpRequest.readyState === 4 &&
                xmlHttpRequest.status === 200 ||
                xmlHttpRequest.status === 304) {
                hook(xmlHttpRequest.responseText)
            }
        };
        xmlHttpRequest.send();
    }

    static post(url, data, hook) {
        let xmlHttpRequest = new XMLHttpRequest();

        let formatData = '';
        let count = -1;
        for (let key in data) {
            count++;
            if (data.hasOwnProperty(key)) {
                formatData += count === 0 ? key + '=' + data[key] : '&' + key + '=' + data[key];
            }
        }

        xmlHttpRequest.open('POST', url, true);
        xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlHttpRequest.onreadystatechange = () => {
            if (xmlHttpRequest.readyState === 4 &&
                xmlHttpRequest.status === 200 ||
                xmlHttpRequest.status === 304) {
                hook(xmlHttpRequest.responseText)
            }
        };
        xmlHttpRequest.send(formatData);
    }
}
```

# 关于XMLHttpRequest
其实ajax无法就是异步网络请求而已，各种语言都有自己的http库，只要使用http库基本上都能自己实现ajax的功能，在js中的原生http库则是XMLHttpRequest，使用XMLHttpRequest发送一个请求有几个步骤，第一步是打开连接。
```javascript
let xmlHttpRequest = new XMLHttpRequest();
// 三个参数分别是请求类型，URL和是否异步
xmlHttpRequest.open(TYPE, URL, ASYNC);
```
如果是POST请求或是一些自定义的请求，则还需要添加头部内容
```javascript
// 两个参数分别是请求头键值
xmlHttpRequest.setRequestHeader(HEADER_KEY, HEADER_VALUE);
```
如果是异步请求，则需要设定完成相应之后的回调
```javascript
// 这个是指readystate变化的时候触发的事件，如果请求成功，会返回200或者304，所以我们在这里面调用回调，当然你也可以在这里设置出错的时候调用的回调函数
xmlHttpRequest.onreadystatechange = () => {
  if (xmlHttpRequest.readyState === 4 &&
      xmlHttpRequest.status === 200 ||
      xmlHttpRequest.status === 304) {
      hook(xmlHttpRequest.responseText)
  }
};
```
然后则可以发送请求
```javascript
// 如果是get，则数据以键值对的形式带在url中发送，如果是post，发送的data应该写在这里
xmlHttpRequest.send(DATA);
```
请求完成后悔自动调用之前设定的钩子函数
