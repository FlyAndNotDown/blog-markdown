> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处

# 题目
给定一个非负整数numRows，生成杨辉三角的前numRows行。像这样：

```
    1
   1 1
  1 2 1
 1 3 3 1
1 4 6 4 1
```
在杨辉三角中，每个数字是他上方的两个数字的和。

# 解答
题目没什么难度，逐行生成即可。JavaScript代码如下：

```javascript
let generate = (numRows) => {
    if (numRows < 1) return [];
    let result = [];
    for (let i = 0; i < numRows; i++)
        result.push(i === 0 ? [1] : (() => {
            let temp = [];
            for (let j = 0; j < i + 1; j++) temp.push(j === 0 || j === i ? 1 : result[i - 1][j - 1] + result[i - 1][j]);
            return temp;
        })());
    return result;
};
```
