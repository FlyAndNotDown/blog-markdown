> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处。另外，该文章收纳在[Kindem的个人的 IT 知识整理仓库](https://github.com/FlyAndNotDown/it-knowledge-collection)，欢迎 Star、Fork、投稿

# Promise
由于JavaScript是单线程的，所以回调是JavaScript中避免不了的，所有的网络请求、浏览器事件都需要使用回调的方式异步处理。

一旦请求、事件多了，就避免不了回调地狱，回调很可能容易一层接着一层。

Promise的意思是承诺，作用和回调函数相似，在未来的某个时刻执行某件事情。但是Promise的写法更加简约易用，更加符合我们平常的思维。

# Usage
Promise是一个对象，在ES6已经被规范成了原生JavaScript的一部分，但是在ES6之前，则需要使用第三方库来实现

Promise分为三个状态：

* pending: 执行中
* resolved: 已完成
* rejected: 已失败

Promise对象被实例化的那一刻，传入构造函数的方法将会被执行，并且进入pending状态，而一旦完成或者失败，则会进入相应的状态，这一过程是不可逆的

他的用法(ES6)如下：

```javascript
let promise = new Promise((resolve, reject) => {
    if (...) {
        // 如果成功了
        resolve(...);
    } else {
        // 如果失败了
        reject(...);
    }
});
```

这里的resolve和reject两个方法可以使用下面的方法来给与:

```javascript
promise
    .then(onSuccess)
    .catch(onFailed);
```

传递给then的方法将在承诺执行成功时被调用，传递给catch的方法将在承诺执行失败时被调用

更加方便的一点是，Promise往往可以嵌套使用，这样可以是多个任务有条不紊地进行，假设p1是一个Promise对象而p2、p3都是能够产生Promise对象的方法(如果直接new那么Promise将会被直接执行)，那么你可以这样写，使得他们按照顺序执行，并且可以一次性处理他们产生的错误

```javascript
p1
    .then(p2)
    .then(p3)
    .then(onSuccess)
    .catch(onFailed);
```

比如:

```javascript
let p1 = new Promise((resolve, reject) => {
    console.log('p1');
    setTimeout(() => {
        resolve('p2');
    }, 1000)
});

let p2 = (result) => new Promise((resolve, reject) => {
    console.log(result);
    setTimeout(() => {
        resolve('p3');
    }, 2000);
});

let p3 = (result) => new Promise((resolve, reject) => {
    console.log(result);
    setTimeout(() => {
        resolve('over');
    }, 3000);
});

p1
    .then(p2)
    .then(p3)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
```

运行可以看见:

```
p1
p2
p3
over
```
