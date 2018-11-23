> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处

# 题目
给定两个二叉树，编写一个函数来检验它们是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

示例 1:
```
输入:       1         1
          / \       / \
         2   3     2   3

        [1,2,3],   [1,2,3]

输出: true
```

示例 2:
```
输入:      1          1
          /           \
         2             2

        [1,2],     [1,null,2]

输出: false
```

示例 3:
```
输入:       1         1
          / \       / \
         2   1     1   2

        [1,2,1],   [1,1,2]

输出: false
```

# 题解
涉及到树的题目，使用递归会让题解变得更简单，这里说一下大概思想：

* 先判断根节点是否为空，如果两棵树的根节点都为空，则返回true
* 如果两棵树的根节点一棵为空一棵不为空，那么则返回false
* 如果两棵树的根节点都不为空，则判断节点的子节点，使用到递归来处理

Java代码：
```java
public class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        return p == null && q == null || p != null && q != null && p.val == q.val &&
                ((p.left == null && q.left == null || p.left != null && q.left != null && isSameTree(p.left, q.left)) &&
                (p.right == null && q.right == null || p.right != null && q.right != null && isSameTree(p.right, q.right)));
    }
}
```
一行写完了所有内容，逻辑有点复杂，仔细看就能看懂。
