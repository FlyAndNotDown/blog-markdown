> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处。另外，该文章收纳在[Kindem的个人的 IT 知识整理仓库](https://github.com/FlyAndNotDown/it-knowledge-collection)，欢迎 Star、Fork、投稿

# 介绍
变量提升Hoisting是人们对JavaScript执行上下文工作方式的一种认识，并不是官方给出的改变

从字面上理解，变量提升的意思是变量和函数的声明会在物理层移动到作用域的最前面。但是这样理解并不准确，效果是相同的，但是实际的实现方式是JavaScript的变量和函数的声明会在编译阶段放入内存

这意味着使用者在正式声明一个函数或者变量之前就能够使用它

# 函数的提升
在JavaScript中，在声明一个函数前，我们就能够使用它，大家应该都体验过，像这样:

```javascript
test();

function test() {
    // do something
}
```

在正常的使用情况下，应该需要先声明函数才能调用，但是这种方法仍然能够运行，这是因为JavaScript自动将函数声明事先存入了内存的原因，看起来就像JavaScript自动把函数声明提升到了最前面

# 变量的提升
对于变量，JavaScript使用类似的方法，但是要注意一点的是，对于变量的提升，JavaScript只会将变量声明提升，但是不会把初始化提升，如果在变量初始化之前使用，则会得到undefined

```javascript
// undefined
console.log(a);
// ReferenceError: b is not defined
console.log(b);
var a = 10;
```

```javascript
// undefined
console.log(num);
num = 6;
// 6
console.log(num);
num += 7;
// 13
console.log(num);
var num;
```

```javascript
// undefined
console.log(num);
num = 1;
// 1
console.log(num);
var num = 2;
// 2
console.log(num);
```

这里要注意，JavaScript的**变量提升是针对var的，而let和const不存在变量提升这一特性**

```javascript
// ReferenceError: a is not defined
console.log(a);
let a = 10;
```

# 一个复杂一点的例子

```javascript
var a = 100;
function fn() {
    // undefined
    console.log(a);
    var a = 200;
    // 200
    console.log(a);
}
fn();
// 100
console.log(a);
var a;
// 100
console.log(a);
// 300
var a = 300;
console.log(a);
```
