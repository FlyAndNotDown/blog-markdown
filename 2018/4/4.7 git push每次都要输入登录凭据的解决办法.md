> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处

# 问题
每一次使用git push命令都需要重新输入一次用户名和密码，这是一个很烦人的小问题。Google之，找到了解决办法。

# 解决办法
在git bash中输入：
```
git config --global credential.helper store
```
下一次你再在你的项目中使用
```
git push
```
命令的时候，你的登录凭据将会被记住，这样就不用每次push都重新输入一次用户名和密码了。
