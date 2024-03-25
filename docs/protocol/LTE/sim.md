---
article: false
title: SIM
icon: sim
---

# SIM

## command APDU的最小长度和最大长度

- **最小长度为4**
- **最大长度为261**

这里的APDU协议指SIM中使用的APDU，按照102221文档内容分析。

![sim_contents_of_command_apdu.png](https://raw.githubusercontent.com/tueo/cloudimg/main/img/sim_contents_of_command_apdu.png)

command APDU分为两个部分，分别是`Header`和Body，`Header`是一个command APDU必须具备的，占4个字节，`Body`则是可选内容。

从上面的结构看，命令APDU存在如下4种结构：

|Case|Structure|
|---|---|
|1|CLA INS P1 P2|
|2|CLA INS P1 P2 Le|
|3|CLA INS P1 P2 Lc Data|
|4|CLA INS P1 P2 Lc Data Le|

最短长度出现在case1中，只有`Header`部分，因此仅有4个字节。
最长长度出现在case4中，`261 = 4(首部) + 1(Lc) + 255(Data) + 1(Le)`， Lc只占用1个字节，因此Data最长仅为255 Bytes。


## response APDU的最小长度和最大长度

- **最小长度为2**
- **最大长度为258**

![sim_contents_of_response_apdu.png](https://raw.githubusercontent.com/tueo/cloudimg/main/img/sim_contents_of_response_apdu.png)

