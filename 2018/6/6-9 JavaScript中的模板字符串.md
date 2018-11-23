> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处

模板字符串是可以使用内嵌表达式的字符串，不少高级语言中都有这一特性，如python、kotlin，JavaScript也在ES5规范中加入了这一特性。

# 语法

```javascript
`text`

`lin1
lin2`

`text ${expr}`

tag `text ${expr}`
```

# 详解
JavaScript中的模板字符串使用反引号来包裹字符串内容而不是单引号或双引号。

### 转义
因为模板字符串使用反引号来包裹字符串内容，所以在模板字符串内部使用反引号时需要转义，如下：

```javascript
`\`` === '`' // true
```

### 多行字符串
如果使用模板字符串，任何被包裹在两个反引号之间的字符都会被认为是有效的字符串内容，包括换行字符。所以。

```javascript
`line1
line2`

//等价于

'line1\n' + 'line2'
```

### 内嵌表达式
使用模板字符串的最大优势在于不必再使用繁琐的字符串连接操作来连接普通字符串与表达式，而是可以直接在字符串内部写表达式。

```javascript
let a = 10;
let b = 20;

// '10 + 20 = 30'
console.log(`${a} + ${b} = ${a + b}`);
```

### 带标签的模板字符串
更高级的形式的模板字符串是带标签的模板字符串。标签使您可以用函数解析模板字符串。标签函数的第一个参数包含一个字符串值的数组。其余的参数与表达式相关。最后，你的函数可以返回处理好的的字符串（或者它可以返回完全不同的东西 , 如下个例子所述）。用于该标签的函数的名称可以被命名为任何名字。

```javascript
var person = 'Mike';
var age = 28;

function myTag(strings, personExp, ageExp) {

  var str0 = strings[0]; // "that "
  var str1 = strings[1]; // " is a "

  // There is technically a string after
  // the final expression (in our example),
  // but it is empty (""), so disregard.
  // var str2 = strings[2];

  var ageStr;
  if (ageExp > 99){
    ageStr = 'centenarian';
  } else {
    ageStr = 'youngster';
  }

  return str0 + personExp + str1 + ageStr;

}

var output = myTag`that ${ person } is a ${ age }`;

console.log(output);
// that Mike is a youngster
```

正如下面例子所展示的，标签函数并不一定需要返回一个字符串。

```javascript
function template(strings, ...keys) {
  return (function(...values) {
    var dict = values[values.length - 1] || {};
    var result = [strings[0]];
    keys.forEach(function(key, i) {
      var value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  });
}

var t1Closure = template`${0}${1}${0}!`;
t1Closure('Y', 'A');  // "YAY!"
var t2Closure = template`${0} ${'foo'}!`;
t2Closure('Hello', {foo: 'World'});  // "Hello World!"
```

### 原始字符串
在标签函数的第一个参数中，存在一个特殊的属性raw ，我们可以通过它来访问模板字符串的原始字符串，而不经过特殊字符的替换。

```javascript
function tag(strings) {
  console.log(strings.raw[0]);
}

tag`string text line 1 \n string text line 2`;
// logs "string text line 1 \n string text line 2" ,
// including the two characters '\' and 'n'
```

另外，使用String.raw() 方法创建原始字符串和使用默认模板函数和字符串连接创建是一样的。

```javascript
var str = String.raw`Hi\n${2+3}!`;
// "Hi\n5!"

str.length;
// 6

str.split('').join(',');
// "H,i,\,n,5,!"
```
