![React](../../img/public/react-logo.png)

> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处

在上一节中，我们讲到了React组件，说了如何使用ES6类创建一个React组件并在其他的地方使用它。这一节我们将讲到React组件的两大灵魂——props和state。

# props
不知道大家还记不记得xml标签中的属性，就像这样：
```xml
<class id="1">
  <student id="1">John Kindem</student>
  <student id="2">Alick Ice</student>
</class>
```
这样一个xml文件表达的意思是1班有两个学生，学号为1的学生名字为John Kindem，学号为2的学生名字为Alick Ice，其中id就是属性，你可以把它看做一个常量，它是只读的。

html继承自xml，而JSX从莫种意义上又是html和js的扩展，属性的概念自然得到了传承。

在React中，我们使用props这一概念向React组件传递只读的值，就像这样：
```javascript
// 假设我们已经自定义了一个叫Hello的组件
ReactDom.render(
    <Hello firstName={'John'} lastName={'Kindem'}/>,
    document.getElementById('root')
);
```

在调用React组件的时候，我们可以像上面一样向组件传递一些常量，以便组件在内部调用。而调用的方法，就像下面这样：
```javascript
class Hello extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Hello, {this.props.firstName + ' ' + this.props.lastName}</h1>
            </div>
        );
    }
}

ReactDom.render(
    <Hello firstName={'John'} lastName={'Kindem'}/>,
    document.getElementById('root')
);
```
在组件内部获取传递过来的props，只需要使用this.props对象即可，但是在使用之前，记得复写组件的构造函数，并且接受props的值以调用父类构造。

当然，props也能够设置默认值，向下面这样：
```javascript
class Hello extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        firstName: 'John',
        lastName: 'Kindem'
    };

    render() {
        return (
            <div>
                <h1>Hello, {this.props.firstName + ' ' + this.props.lastName}</h1>
            </div>
        );
    }
}

ReactDom.render(
    <Hello/>,
    document.getElementById('root')
);
```
只需在ES6类中声明一个static的props默认值即可，运行效果和上面一样。

props没有多复杂，稍微练习即可习得。

# state、组件生命周期
你可能回想，如果我想在React组件中添加动态效果怎么办？目前学过的知识好像无法解决这一问题。

这一问题需要使用React组件的state来解决，state即状态的意思，在React中，所有会变化的控制变量都应该放入state，每当state中的内容变化时，页面的相应组件将会被重新渲染，另外，state完全是组件内部的东西，外部无法向内部传递state，也无法直接改变state的值。

先来举一个例子：
```javascript
import React from 'react';
import ReactDom from 'react-dom';

class Time extends React.Component {
    constructor(props) {
        super(props);

        // 初始化state
        this.state = {
            hour: 0,
            minute: 0,
            second: 0
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        // 计算新时间
        let newSecond, newMinute, newHour;
        let carryMinute = 0, carryHour = 0;
        newSecond = this.state.second + 1;
        if (newSecond > 59) {
            carryMinute = 1;
            newSecond -= 60;
        }
        newMinute = this.state.minute + carryMinute;
        if (newMinute > 59) {
            carryHour = 1;
            newMinute -= 60;
        }
        newHour = this.state.hour + carryHour;
        if (newHour > 59) newHour -= 60;

        // 设置新状态
        this.setState({
            hour: newHour,
            minute: newMinute,
            second: newSecond
        });
    }

    render() {
        return (
            <div>
                <h1>current time: {this.state.hour + ':' + this.state.minute + ':' + this.state.second}</h1>
            </div>
        );
    }
}

ReactDom.render(
    <Time/>,
    document.getElementById('root')
);
```
这样就完成了一个计数器，数值一秒钟变化一次，来讲解一下代码：首先，state的初始化是在构造函数中，像这样：
```javascript
constructor(props) {
    super(props);

    // 在这初始化state
    this.state = {
        ...
    }
}
```
而改变state是使用React组件基类中的一个自带函数：
```javascript
this.setState({
    ...
});
```
使用这个函数之前一定要注意this的作用域，箭头函数中的this指向外部this，而普通函数中的this指向函数本身。

另外，这里使用到了两个React组件的生命周期回调：
```javascript
componentDidMount() {
    // React组件被加载到dom中的时候被调用
    ...
}

componentWillUnmount() {
    // React组件从dom中卸载的时候被调用
    ...
}
```
所以这样一下上面的计时器代码应该就不是什么难事了，在React组件被加载到dom中的时候设置一个计时器，每秒钟更新一次state，state更新的同时页面中的组件将会被重新渲染，而当组件被卸载的时候，则需要清除定时器，就那么简单。

不过React对于state的更新频率，有一个最大的限度，超过这个限度则会导致页面渲染的性能下降，大家需要注意不要在高频函数中使用setState。

这一节React轻松入门就到这了，下一节，我将会为大家介绍React组件的事件处理。如果觉得文章有帮助，请关注我，我会持续更新，为大家献上更好更优质的文章！
