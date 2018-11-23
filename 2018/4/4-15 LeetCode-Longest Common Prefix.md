> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处

# 问题
编写一个函数来查找字符串数组中的最长公共前缀。

# 解答
这一题没什么难度，双指针移动，一个指针指向当前判断到的位置，一个指针指向字符串数组中的索引。

java代码：
```java
public class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs.length == 0) return "";
        int p = 0;
        char tmp;
        boolean end = false;
        while (true) {
            if (p >= strs[0].length()) break;
            tmp = strs[0].charAt(p);
            for (int i = 1; i < strs.length; i++) {
                if (p >= strs[i].length() || tmp != strs[i].charAt(p)) {
                    end = true;
                    break;
                }
            }
            if (end) break; else p++;
        }
        return strs[0].substring(0, p);
    }
}
```
