> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处



# 问题

将字符串"PAYPALISHIRING"以Z字形排列成给定的行数：（下面这样的形状）

```
P   A   H   N
A P L S I I G
Y   I   R
```

之后按逐行顺序依次排列："PAHNAPLSIIGYIR"



要求实现一个将字符串进行指定行数的转换的函数：

```
string convert(string text, int nRows);
```

convert("PAYPALISHIRING", 3)应当返回"PAHNAPLSIIGYIR"



# 解答

解题思路：

* 按照给定的行数申请一个String数组表示每一行
* 遍历原字符串，按照z字形的来回方向向每一行中添加字符
* 拼接String数组中的各个字符串，并且作为答案返回



下面给出Java代码：

```java
public class Solution {
    public String convert(String s, int numRows) {
        // 如果只有一行则不需要转换
        if (numRows == 1) return s;

        // 按照行数建立n个字符串用于存放结果
        String [] res = new String[numRows];
        for (int i = 0; i < numRows; i ++) res[i] = "";

        // 按照z字形开始往字符串中添加元素
        int p = 0, q = 0;
        boolean direction = false;
        while (p < s.length()) {
            res[q] += s.charAt(p);
            if (q == 0) direction = false;
            if (q == numRows - 1) direction = true;
            q = direction ? q - 1 : q + 1;
            p++;
        }

        StringBuffer ans = new StringBuffer("");
        for (String i : res) {
            ans.append(i);
        }

        return ans.toString();
    }
}
```

