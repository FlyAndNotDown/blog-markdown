![React-Logo](../../img/public/react-logo.png)

> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处

> 本文开始前，作者默认你已经拥有html,css,js和oo思想的基础知识，如果没有，请先学习以上内容。

# 初识`React`

`React`是`Facebook`推出的一个用于构建用户界面的`JavaScript`库，它相比传统的`html`+`css`+`js`构建`Web`应用的方式来说，拥有以下特点:



* 组件化：将页面元素组件化，代码可重用性高
* 声明式：采用声明范式，轻松描述页面
* 灵活：能够和已知库或框架很好地配合
* 高效：使用虚拟`DOM`的思想，大大减少与`DOM`的交互
* 面向对象化：封装组件内部的各类资源和数据流动，将其看成一个整体处理，而不是一个部分



说到这里可能你还是有点蒙，说白了`React`就是将已有的页面元素的资源(`html`,`css`,`js`,`json`,`img`)等整合到一起并且封装成可重用的组件的一个`JavaScript`框架。



# 一个例子了解`React`的作用

`React`最大的作用就是将页面元素组件化并且使之可重用，下面我们来用一个例子说明`React`的基本作用：



先假设我有一个页面中的`div`，里面放有一个简单的导航信息块和一个链接，并且当用户点击链接的时候，会自动跳转回主页，页面代码如下：

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>test</title>
</head>
<body>
    <!--我在这，我就是上面所说的div-->
    <div>
        <span>
            <a href="xxx.com">主页</a>/
            <a href="xxx.com/news">新闻</a>/
            <a href="xxx.com/news/257">重大消息!绝地求生发布信号枪!</a>
        </span>
        <span>
            <a href="xxx.com">回到主页</a>
        </span>
    </div>
</body>
</html>
```

运行的效果就像这样：

![Run-Screenshot](../../img/2018/3/3-30-0.png)



当然我就没有写`css`也没写`js`了，这小小的`div`可以写的很好看，也很花俏，但是我在这里为了演示`React`的功能就随意了，看起来好像没什么问题，但是仔细一想，当你写多了页面，总不能每一个页面都写一个这样的组件然后把里面的`a`标签改了吧，再者，如果你使用`js`来对`a`标签进行动态变化，就离不开对`DOM`的反复操作，即便你没有使用`jQuery`这一类的库而采用原生也是一样，而且当你一块小组件使用了这样那样的资源来让其美化、产生动态、添加源，都会导致代码的耦合性大大增加，可重用性大大降低。



总结一下，原生`html`,`css`,`js`编写页面的方法有着以下问题：



* 代码耦合性高复用性差：如果你需要重用组件，你需要将与之相关的资源都顺便也改了，并且还得手动复制
* 效率低下：因为原生`js`对`DOM`的操作过多而导致
* 数据流动不合理：原生`js`往往没有组件的生命周期，加载数据发送请求都很随意，无法使数据有序地传递



于是`React`就应运而生了，就好比`c`和`c++`，一个面向过程，一个面向对象，`React`的出现，将从前`Web`应用开发完全面向过程、开发碎片化的问题解决了，能将各个组件单独封装，使用的时候就方便了。



来吧，让我们来看一下如果是`React`，上面的代码会变成什么样子：

```javascript
import React from 'react';

class Test extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <span>
                    {this.props.locations.map((location, i) => (
                        <span>
                            <a key={i} href={location.path}>{location.name}</a>/
                        </span>
                    ))}
                </span>
                <span>
                    <button onClick={() => {
                        window.location.href = '/'
                    }}>返回主页</button>
                </span>
            </div>
        );
    }
}
```

当然这只是一个`demo`，你直接丢上去是跑不起来的，这里面还有一些`JS ES6`和`JSX`的新特性，`React`的开发是需要配置好环境的，代码的细节你看不懂暂时没关系，等到学习的深入，我会为大家详细介绍`ES6`、`JSX`和`React`的各个细节，现在就先不用在意。当你学到后面你会发现我这个范例其实很蠢，但是为了让初学的你明白`React`的作用，我这里就尽量少些一些复杂的东西，所以我就先这样写吧。



让我们来看一下上面的代码，学过`oo`的你很快就能发现这个所谓的`React`组件其实是一个继承自`React`组件基类的`JS ES6`类(后面的系列文章会给大家介绍到)，里面有几个方法，`constructor`当然是构造方法，而`render`方法则是负责`React`组件的`DOM`渲染的，当你在其他的类中用到了这个组件的时候这个方法会被`React`自动调用，从而根据里面的`JSX`(现在也不用了解)渲染出相应的`DOM`元素并且加载到`html`根节点中去。



里面还用到了之后会说到的`props`，这东西叫做`React`组件的属性，当`React`组件被其他组件或者方法调用的时候，需要使用`props`来规定`React`组件的一些内在因素，使之按照目的来正确加载，比如在这里，我就使用到了`locations`属性，在加载这个组件的时候，需要传入`locations`属性，来规定里面的导航块按照什么样的字符加载，就像这样：

```javascript
export class TestPage extends React.Component {
    render() {
        return (
            <Test locations={[{
                path: '/',
                name: '首页'
            }, {
                path: '/news',
                name: '新闻'
            }, {
                path: '/news/458',
                name: '重大新闻!绝地求生发布信号枪!'
            }]}/>
        );
    }
}
```



这样一下，当我写一个新页面的时候，我只需要调用这个组件，并且给它传入一个新的`locations`属性，他就能按照我给出的属性自动完成导航栏的`DOM`元素，这样一来，就大大提高了代码的可重用性，让组件真正完成了组件化。



所有元素皆组件，这就是`React`的核心思想，是不是感觉和`oo`中万物皆对象的思想很像？开始体会`React`的魅力吧！



# 搭建`React`的配置环境

还记得之前说的`ES6`、`JSX`等玩意吗，这些是`React`的必要环境，如果手动搭建`React`的环境会很麻烦，鉴于为了快速学习`React`的目的，我们可以使用`Facebook`官方给出的用于快速创建`React`项目的`JS`库，我自己有一篇关于这个工具的使用方法，教程链接在下面：

[使用create-react-app来创建react项目_Kindem的博客](http://www.kindemh.cn/post/15)

在配置完环境之后，就可以开始`React`的学习了，这篇文章到这里就差不多尾声了，在我的下一篇`React`教程文章中，我会带大家走进`React`的世界，欢迎关注！
