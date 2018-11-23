> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处

# quick-shell.js简介
一直想自己发布一个npm包试试，正巧刚刚学完操作系统，写了很多shell类型的小程序，就想着要不在nodejs上封装一套用于快速创建简单shell类应用的库，于是quick-shell.js就诞生了

使用quick-shell你可以快速构建一个shell类型的简单应用，非常适合使用js做课设或者一些小demo

# 安装
该包已经发布在npm上了，可以直接使用npm安装到项目依赖

```
npm install quick-shell
```

# 基本使用
```javascript
let shell = require('quick-shell');

shell
    .welcome('welcome to my shell program')
    .prompt('$ ')
    .listen('echo', (params) => {
        console.log(params);
    })
    .listen('add', (params) => {
        let temp = params.split(' ');
        console.log(
            (parseInt(temp[0]) + parseInt(temp[1])).toString()
        );
    })
    .start();
```

像这样间可以简单地构建一个shell类型应用，上面的代码运行时会像这样：

```
welcome to my shell program
$
```

当你输入 'echo hello world'：

```javascript
welcome to my shell program
$ echo hello world
hello world
```

当你输入 'add 7 9'：

```javascript
welcome to my shell program
$ add 7 9
16
```

就像这样，每当你想要为你自己的shell应用添加一条指令，只需要添加它的响应即可

# API
安装：

```
npm install quick-shell
```

链式调用：

```javascript
shell
    .//...
    .//...
    .start();
```

设置欢迎文字：

```javascript
shell
    .welcome('your welcome text');
```

设置提示符：

```javascript
shell
    .prompt('# ');
```

自定义错误提示：

```javascript
shell
    .error({
        inputNothing: 'you input nothing',
        noMatchedInstruction: 'have no matched instruction'
    });
```

创建一个指令监听器：

```javascript
// 这里的 params 以 'param param param' 的形式存在
shell
    .listen('echo', (params) => {
        console.log(params);
    });
```

如果你还是不满足于现有的功能，你可以使用内部定义的事件来进行自定义操作：

```javascript
shell
    .onStart(() => {
        // do something on shell start
    })
    .onExit(() => {
        // do something on shell exit
    })
    .onLine((line) => {
        // do something when a line inputed
    })
    .onCaught((instruction, params) => {
        // do something when a instruction was caught
    });
```

开始运行程序：

```javascript
shell
    .start();
```

# 参考

* GitHub: [FlyAndNotDown - quick-shell](https://github.com/FlyAndNotDown/quick-shell)
* npm: [npm - quick-shell](https://www.npmjs.com/package/quick-shell)
