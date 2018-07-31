> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处

# 题目
给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。

注意你不能在买入股票前卖出股票。

示例 1:

```
输入: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
```

示例 2:

```
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

# 解答
这里要注意的一点就是不能直接求出最大的和最小的然后相减得出结果，因为买和卖是由顺序关系的，买必须在卖之前，JavaScript代码如下：

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
let maxProfit = (prices) => {

    let ans = 0;

    for (let i = 0 ; i < prices.length; i++) {

        let arr = [];

        for (let j = i + 1; j < prices.length; j++)
            arr.push(prices[j] - prices[i]);

        let max = 0;

        for (let j = 0; j < arr.length; j++)
            if (arr[j] > max) max = arr[j];

        ans = max > ans ? max : ans;

    }

    return ans;

};
```
