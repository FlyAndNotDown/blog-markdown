![React](http://www.kindemh.cn/static/main/img/2018-3-30_19-25-35.png)

> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处

在上一节中，我们介绍了React组件的两大灵魂——props和state，这一节中，我们将学习React中的事件。

# 传统JavaScript中的事件
所谓事件，就是当一定条件(比如按键被点击、页面DOM元素的变化)被满足的时候触发的代码。在传统JavaScript中，如果需要添加一个事件，我们通常是先写一个钩子函数，里面写事件的具体代码，然后在相应的标签中绑定钩子函数，就像这样：
```html
<button onclick="showHello()">
    Click Me!
</button>

<script>
    function showHello() {
        alert('Hello!');
    }
</script>
```
这样，当用户点击那个按钮的时候，就会弹出一个警告框，向用户问好。

# React事件
但是在React中，事件就不是这样使用的了，其实原生html和JavaScript的事件绑定是使用字符串而不是真正的函数，很大程度上是因为html标签的属性是只能使用字符串的，但是在React中，属性是借助{}来传递的，而{}里面可以放任何JavaScript表达式、变量等，所以，首先，在React中，事件绑定是传递一个真正的函数而不是字符串。

在React中使用事件，你仍然需要像原生JavaScript一样先定义一个钩子函数，然后将钩子函数绑定到组件上去，就像这样：
```javascript
class Hello extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'show': false
        };

        this.showHello = this.showHello.bind(this);
    }

    showHello() {
        this.setState({
            'show': true
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.showHello}>
                    Click Me!
                </button>
                {this.state.show ? (<h1>Hello!</h1>):('')}
            </div>
        );
    }
}
```
显而易见，showHello则是我们定义的钩子函数，下面的render部分中的button则是事件的触发者。这里需要注意的地方是在React组件中设定事件钩子函数的时候，需要在构造中使用
```javascript
this.funtioncName = this.functionName.bind(this);
```
这句话的意思是将钩子函数中的this绑定到外部的this，如果你不这样做，钩子函数中的this将会指代钩子函数本身而不是组件类。

当然这一问题还有更简单的解决办法，不知道大家还记不记得以前讲ES6中提到的新特性——箭头函数，箭头函数的优点是匿名、this指代外部this，这样的特性不就是为了做事件响应而生的吗？于是你可以简单地这样写：
```javascript
class Hello extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'show': false
        };
    }

    render() {
        return (
            <div>
                <button onClick={() => {
                    this.setState({
                        'show': true
                    });
                }}>
                    Click Me!
                </button>
                {this.state.show ? (<h1>Hello!</h1>):('')}
            </div>
        );
    }
}
```

# 向事件钩子函数传递参数
如果需要向事件钩子函数传递参数，做法将会有一点特殊，先举个例子再详细讲解：
```javascript
class Hello extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'show': false,
            'name': ''
        };
    }

    showName = (name, e) => {
        this.setState({
            'show': true,
            'name': name
        });
    };

    render() {
        return (
            <div>
                <button onClick={(e) => this.showName('Kindem', e)}>
                    Kindem
                </button>
                <button onClick={(e) => this.showName('Dasy', e)}>
                    Dasy
                </button>
                {this.state.show ? (<h1>Hello! {this.state.name}</h1>):('')}
            </div>
        );
    }
}
```
这一个组件的功能是提供两个按钮，两个按钮对应两个人名，当一个按钮被按下的时候，下方自动弹出一行字向该人问好。这里可以看见我们的钩子处理函数showName就像一个正常的钩子函数一样，只不过多带了参数，但是在下方render中绑定钩子函数的时候却有些不同了。

这是因为onClick默认只会像负责处理的钩子函数传递一个参数e，这个参数e是W3C规定的合成事件，里面提供了一系列方便事件处理的功能，但是我们需要向我们自定义的钩子处理函数传递多个参数，我们的做法是使用一个钩子函数接受e参数，然后再在这个钩子函数中调用我们自定义的带参钩子函数。这样就完成了参数的传递。

这一节的React轻松入门到这里就结束了，如果觉得本文有帮助，可以关注我，我会为大家持续分享IT干货，谢谢！
