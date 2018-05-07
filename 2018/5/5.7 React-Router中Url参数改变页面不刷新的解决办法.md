> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处

# 问题
今天在写页面的时候发现一个问题，就是在React Router中使用了Url传参的功能，像这样:
```javascript
export class MainRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    ...
                    <Route exact path={'/channel/:channelId'} component={ChannelPerPage}/>
                    ...
                </Switch>
            </BrowserRouter>
        );
    }
}
```

按照官方文档的说法，可以在ChannelPerPage这个组件中使用
```javascript
this.props.match.params
```
来获取url参数的值，但是我发现如果你在这个url下只将url中的参数部分改变，比如channelId从1变成2的时候，页面并不会刷新。

# 解决办法
查阅资料后发现这样的根本原因是props的改变并不会引起组件的重新渲染，只有state的变化才会引起组件的重新渲染，而url参数属于props，故改变url参数并不会引起组件的重新渲染。

后来发现React的组件中有一个可复写的方法
```javascript
componentWillReceiveProps(nextProps) {
  ...
}
```
这个方法可以在React组件中被复写，这个方法将会在props改变的时候被调用，所以你可以使用这个方法将nextProps获取到，并且在这个方法里面修改state的内容，这样就可以让组件重新被渲染。
