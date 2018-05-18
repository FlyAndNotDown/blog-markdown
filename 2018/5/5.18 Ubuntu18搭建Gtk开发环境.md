> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处

gtk是在Linux下使用c语言构建图形界面的一个库，它构建的图形界面是基于gnome运行的。

Ubuntu18已经回归到了主流Linux桌面gnome上，所以我们搭建gtk开发环境的时候，不需要再额外安装gnome了。

你首先需要安装编译工具：
```
sudo apt-get install build-essential
```

gtk现在有两种版本，2和3，可以使用如下指令同时安装两个版本:
```
sudo apt-get install gnome-core-devel
```

接下来还要安装pkg-config用于自动查找gtk的头文件位置：
```
sudo apt-get install pkg-config
```

完成之后你可以使用官方给出的示例来测试是否能够运行，[Getting Started With GTK+](https://developer.gnome.org/gtk3/stable/gtk-getting-started.html)

编译指令如下：
```
gcc main.c -o main `pkg-config --cflags --libs gtk+-3.0`
```

完成之后即可打开可执行文件运行查看效果
