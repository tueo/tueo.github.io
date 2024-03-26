---
article: false
title: SIM
icon: sim
date: 2024-03-25
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

- Lc表示command APDU中data字段的数据size，如果Lc存在，Data的size范围在`1~255`字节。
- Le表示期待的response APDU的Data字段的最大size，如果Le缺失，表示不期待任何数据，如果Le为「00」，则允许接收256字节的数据，此时SIM卡侧可以返回1到256个字节的数据。

> 思考：这种特殊约定极易容易引发问题，从协议设定角度和工程实现角度，这种特殊约定越少越好。

## response APDU的最小长度和最大长度

- **最小长度为2**
- **最大长度为258**

![sim_contents_of_response_apdu.png](https://raw.githubusercontent.com/tueo/cloudimg/main/img/sim_contents_of_response_apdu.png)

## 常见command列表

|Command|Value(Hex)|Value(Dec)|
|---|---|---|
| SELECT  |  A4 | 164  |
| STATUS  |  F2 | 242  |
| READ BINARY  | B0  | 176  |
| UPDATE BINARY  | D6  | 214  |
| READ RECORD  | B2  | 178  |
| UPDATE RECORD  | DC  | 220  |
| GET RESPONSE  | C0  | 192  |
