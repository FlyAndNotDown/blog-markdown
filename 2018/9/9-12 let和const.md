> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处。另外，该文章收纳在[Kindem的个人的 IT 知识整理仓库](https://github.com/FlyAndNotDown/it-knowledge-collection)，欢迎 Star、Fork、投稿

# let
let是在ES6加入的新的变量声明方法，let声明变量的方法和var类似:

```javascript
let a = 'hello';
var b = 'hello';
```

**let的功能是声明一个作用域被限制在块级的变量，而var声明的变量的作用域只能是全局的或者整个函数块的**

```javascript
function varTest() {
    var x = 1;
    if (true) {
        var x = 2;
        // 2
        console.log(x);
    }
    // 2
    console.log(x);
}

function letTest() {
    let x = 1;
    if (true) {
        let x = 2;
        // 2
        console.log(x);
    }
    // 1
    console.log(x);
}
```

再举一个例子:

```javascript
var a = 1;
var b = 2;

if (a === 1) {
    var a = 11;
    let b = 22;

    // 11
    console.log(a);
    // 22
    console.log(b);
}

// 11
console.log(a);
// 2
console.log(b);
```

另外，如果作用域位于程序的顶层，var会挂载到window上，而let不会:

```javascript
var a = 'a';
let b = 'b';

// this -> window
// a
console.log(this.a);
// undefined
console.log(this.b);
// a
console.log(window.a);
// undefined
console.log(window.b);
```

在相同的函数或块作用域内重新声明同一个变量会引发一个重复定义的SyntaxError

```javascript
if (x) {
    let foo;
    // SyntaxError
    let foo;
}
```

let和var都会在声明所在的作用域顶部被创建，这被称为变量提升，但是不同的是var的创建会伴随着一个undefined值，在赋值之后才会改变，而let没有被赋值之前是不会被初始化的，如果在这期间引用let声明的变量，会导致一个ReferenceError，直到初始化之前，该变量都处于暂存死区:

```javascript
function test() {
    // undefined
    console.log(bar);
    // ReferenceError
    console.log(foo);
    var bar = 1;
    let foo = 2;
}
test();
```

两个复杂一点的例子:

```javascript
function test(){
    var foo = 33;
    if (true) {
        // ReferenceError
        let foo = (foo + 55);
    }
}
test();
```

```javascript
function go(n) {
    // Object {a: [1,2,3]}
    console.log(n);

    // ReferenceError
    for (let n of n.a) {
        console.log(n);
    }
}
go({a: [1, 2, 3]});
```

# const
const的基本作用是**声明一个作用域被限制在块级的常量**，其作用域和let一样，基本使用也和let类似，但是const的特点是const声明的值一经创建无法被改变

使用const会创建一个值的只读引用，这意味着const声明的对象本省的引用是无法被改变的，但是其属性是可以被改变的，因为改变其属性并不会引起其引用的变化

下面给出const的一些特性的例子:

基本使用:

```javascript
const a = 'abc';
```

无法被重复定义:

```javascript
const a = 'abc';
// SyntaxError: Identifier 'a' has already been declared
const a = 'abc';
```

声明时就必须赋值:

```javascript
// SyntaxError: Missing initializer in const declaration
const a;
```

无法被修改:

```javascript
const a = 'a';
// TypeError: Assignment to constant variable
a = 'b';
```

块级作用域:

```javascript
if (true) {
    var a = 'a';
    const b = 'b';
    // a
    console.log(a);
    // b
    console.log(b);
}
// a
console.log(a);
// ReferenceError: not defined
console.log(b);
```

作用域在程序顶层时不会挂在window对象上:

```javascript
var a = 'a';
const b = 'b';

// this -> window
// a
console.log(this.a);
// undefined
console.log(this.b);
// a
console.log(window.a);
// undefined
console.log(window.b);
```
