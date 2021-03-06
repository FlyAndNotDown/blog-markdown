> 发布自[Kindem的博客](http://www.kindemh.cn/)，欢迎大家转载，但是要注意注明出处

最近在做物联网课设，过程中需要用到Android的蓝牙API，奈何原生的蓝牙API使用有点麻烦。于是上网搜索看有没有好用的Android蓝牙库，然后发现了这个宝贝，给大家分享一下。

# FastBle VS 原生Android蓝牙API
原生Android的蓝牙API使用有点麻烦，要先获取设备的蓝牙适配器，接着注册广播来接受蓝牙设备信息，用完了还需要将广播给注销，相对来说有点麻烦。

不好封装，可以说是原生Android最让人痛苦的地方，这是因为原生Android的代码不是很独立，与Activity、广播等相杂糅。市面上的蓝牙库也是少之又少，先看了看BleLib，感觉还是换汤不换药，用起来一点也不简洁。

但是FastLib封装的就很技巧，基本上能把一个操作的粒度控制在一行内，另外，代码也无需与线程、通知之类的打交道，库中已经帮我们把这些复杂的东西都做完了。

FastBle的Github项目地址在这，大家可以看看：[FastBle - GitHub](https://github.com/Jasonchenlijian/FastBle

它的文档也相对比较完整，大家可以查看官方文档来使用它：[FastBle - Document](https://github.com/Jasonchenlijian/FastBle/wiki)

# FastBle的使用
## 0x00 申明权限
只要使用到了蓝牙，申明权限是必不可少的，FastBle需要的权限如下:
```java
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

这里要注意一点，如果Android版本高于6.0，用户还需要打开位置信息(不光要位置权限，还需要打开位置信息)才能通过蓝牙进行扫描。

## 0x01 初始化与全局配置
初始化需要在库中任何函数被调用前执行，由于库使用的是单例模式，只需要初始化一次，在哪里都能使用，建议在onCreate里执行初始化代码：
```java
BleManager.getInstance().init(getApplication());
```

全局配置可以紧跟初始化之后执行，当然如果不进行配置也没有任何关系，每一个选项都有默认值：
```java
BleManager.getInstance()
        .enableLog(true)
        .setReConnectCount(1, 5000)
        .setSplitWriteNum(20)
        .setConnectOverTime(10000)
        .setOperateTimeout(5000);
```
每一项的详细信息你都能在官方文档中找到说明

## 0x02 打开蓝牙
使用FastBle中的BleManager类有很多种方式来打开蓝牙，这里推荐使用下面这种方式，这种方式会使线程被阻塞，如果用户不选择是否打开蓝牙，线程将会暂停执行：
```java
BleManager.getInstance().enableBluetooth();
```

## 0x03 扫描设备
打开蓝牙之后即可扫描设备，在正式扫描之前，可以自定义扫描规则，像这样：
```java
BleScanRuleConfig scanRuleConfig = new BleScanRuleConfig.Builder()
  .setServiceUuids(serviceUuids)      // 只扫描指定的服务的设备，可选
  .setDeviceName(true, names)         // 只扫描指定广播名的设备，可选
  .setDeviceMac(mac)                  // 只扫描指定mac的设备，可选
  .setAutoConnect(isAutoConnect)      // 连接时的autoConnect参数，可选，默认false
  .setScanTimeOut(10000)              // 扫描超时时间，可选，默认10秒；小于等于0表示不限制扫描时间
  .build();

BleManager.getInstance().initScanRule(scanRuleConfig);
```

在设置规则后，即可开始扫描，像这样
```java
BleManager.getInstance().scan(new BleScanCallBack() {
    @Override
    public void onScanStarted(boolean success) {
        // 开始扫描的回调
    }

    @Override
    public void onScanning(BleDevice bleDevice) {
        // 扫描到一个之前没有扫到过的设备的回调
    }

    @Override
    public void onScanFinished(List<BleDevice> scanResultList) {
        // 扫描完成的回调，列表里将不会有重复的设备
    }
});
```
这几个回调都是安全的，将会自动返回主线程，所以可以放心使用。

当然，在任何地方，任何时候，你都可以直接使用取消扫描这个函数来停止扫描:
```java
BleManager.getInstance().cancelScan();
```

## 0x04 连接设备
在扫描之后，你已经获取到了一个或多个BleDevice对象，你可以直接使用这些对象向目标设备发起连接，像这样：
```java
BleManager.getInstance().connect(bleDevice, new BleGattCallback() {
    @Override
    public void onStartConnect() {
        // 开始连接
    }

    @Override
    public void onConnectFail(BleDevice bleDevice, BleException exception) {
			   // 连接失败
    }

    @Override
    public void onConnectSuccess(BleDevice bleDevice, BluetoothGatt gatt, int status) {
			   // 连接成功，BleDevice即为所连接的BLE设备
    }

    @Override
    public void onDisConnected(boolean isActiveDisConnected, BleDevice bleDevice, BluetoothGatt gatt, int status) {
			   // 连接中断，isActiveDisConnected表示是否是主动调用了断开连接方法
    }
});
```

当然，在官方文档中还有很多详细的说明，这里只是简单介绍了一下FastBle的基本使用，了解详情还请看官方文档。
