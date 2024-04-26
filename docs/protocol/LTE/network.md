---
article: false
title: 📶LTE网络
date: 2024-04-08
---

- [1. 网络制式](#1-网络制式)
  - [band配置](#band配置)
- [2. 网络参数](#2-网络参数)
  - [2.1. RSRP(Reference Signal Received Power)](#21-rsrpreference-signal-received-power)
  - [2.2. RSRQ(Reference Signal Received Quality)](#22-rsrqreference-signal-received-quality)
  - [2.3. RSSI(Reference Signal Strength Indicator)](#23-rssireference-signal-strength-indicator)
  - [2.4. SINR(Signal to Interference plus Noise Ratio)](#24-sinrsignal-to-interference-plus-noise-ratio)
  - [2.5. RSRP RSRQ SINR的评价标准](#25-rsrp-rsrq-sinr的评价标准)
  - [2.6. WCDMA下的RSCP(Received Signal Code Power)](#26-wcdma下的rscpreceived-signal-code-power)
  - [WCDMA下的Ec/Io](#wcdma下的ecio)
  - [2.7. GSM下的RSSI](#27-gsm下的rssi)
  - [2.8. GSM下的rx\_lev(signal level)](#28-gsm下的rx_levsignal-level)
  - [2.9. 基站定位](#29-基站定位)
  - [2.10. 测量数据参考文档](#210-测量数据参考文档)

## 1. 网络制式

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240412145147.png)

- 2G(GSM) 最常见的第二代蜂窝网络协议是GSM。
- 2.5G(GPRS) GSM的演进版本，基于GSM增加了PS域（packet-switched domain）。
- 2.75G(EDGE) 也被称之为Enhanced GPRS（EGPRS），在2.5G的基础上提升了速率。
- 3G(UMTS) 3GPP这边推出的是UMTS，最常用的接入网是WCDMA。3GPP2这边推出的是CDMA2000。
- 3.5G(HSDPA)(3GPP Release 5) 提高了下行速率
- - 3.5G(HSUPA)(3GPP Release 6) 提升了上行速率
- 3.75G(HSPA+)(3GPP Release 7)

HSDPA和HSUPA属于HSPA（High Speed Packet Access）协议家族。
HSPA+的全称是**Evolved** High Speed Packet Access

### band配置

**LTE下的band配置**：
lte下的band配置在36.101文档的Tables 5.5-1 "E-UTRA Operating Bands" and 5.6.1-1 "E-UTRA Channel Bandwidth"中定义有，从band1到目前最大band106。



## 2. 网络参数

### 2.1. RSRP(Reference Signal Received Power)

**参考信号接收功率**，在**某个Symbol内承载Reference Signal的所有RE上**接收到的信号功率的平均值。单位是dBm，报告值的范围从-17到97，對應测量值从-156dBm到-44dBm，步进为1dBm。

RSRP的报告值0对应测量值-140dBm。如果报告值要大于0，则测量值的范围是-140dBm到-44dBm。

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240411094909.png)

如上图，是一个RB pair中的参考符号所在RE的示例位置，RSRP就是上图中所有这些橙色块的线性平均功率。

> 这里的Symbol指的是时域上一个OFDM符号。

下图是报告值从0到97的测量值范围。

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240409153613.png)

### 2.2. RSRQ(Reference Signal Received Quality)

**参考信号接收质量**，单位是dB，报告值的范围从-30到46，对映测量值从-34dB到2.5dB，步进为0.5dB。

RSRQ并不是测量得出的，其通过下面的公式计算得出：

$$ RSRQ=\frac {N\times RSRP} {\, RSSI} $$

- N是整个测量带宽中的所有RB总数。

由于RSRQ是RSRP和RSSI的比值，所以它的单位是dB，并且RSRQ的值永远为负数，因为RSSI的值总会大于$ N\times RSRP $。

RSRQ的报告值0对应测量值为-19.5dB。

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240409154335.png)

### 2.3. RSSI(Reference Signal Strength Indicator)

代表接收带宽内的总功率，包括有用信号，干扰信号的。单位是dBm，报告值的范围从00到76， 对应测量值从-100到-25dBm，步进1dBm。

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240409160705.png)

### 2.4. SINR(Signal to Interference plus Noise Ratio)

信噪比，单位是dB，报告值的范围从00到127， 对应测量值从-23到40dB，步进0.5dB。

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240409161755.png)

### 2.5. RSRP RSRQ SINR的评价标准

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240409152938.png)


### 2.6. WCDMA下的RSCP(Received Signal Code Power)

导频信道的信号强度。基本可以类比为LTE下的RSRP，单位是dBm，报告值的范围从-5到91，对应测量值范围从-120到-25dBm，步进是1dBm。

| rscp | From | To   | Unit |
|------|------|------|------|
| -5   |      | -120 | dBm  |
| -4   | -120 | -119 | dBm  |
| -3   | -119 | -118 | dBm  |
| -2   | -118 | -117 | dBm  |
| -1   | -117 | -116 | dBm  |
| 0    | -116 | -115 | dBm  |
| 1    | -115 | -114 | dBm  |
| ...  | ...  | ...  | ...  |
| 89   | -27  | -26  | dBm  |
| 90   | -26  | -25  | dBm  |
| 91   | -25  |      | dBm  |

### WCDMA下的Ec/Io

Ec/Io的测量值范围从-24.0到0.0dB。对应的报告值范围从00到49， 步进是0.5dBm。

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240426110242.png)

### 2.7. GSM下的RSSI

来自27007文档的定义，received signal strength indication，同下面的rxlev相比，是signal level的不同表现形式，这里的步进是2dBm。

rssi用于`CSQ`指令，rxlev用于`CESQ`指令。

| rssi | From | To                          | Unit |
|------|------|-----------------------------|------|
| 0    |      | -113                        | dBm  |
| 1    | -113 | -111                        | dBm  |
| 2    | -111 | -109                        | dBm  |
| ...  | ...  | ...                         | ...  |
| 29   | -57  | -55                         | dBm  |
| 30   | -55  | -53                         | dBm  |
| 31   | -53  |                             | dBm  |
| 99   |      | not known or not detectable ||

### 2.8. GSM下的rx_lev(signal level)

RXLEV(the value of received signal strength)

2G下表示接收信号强度，单位是dBm，报告值的范围从0到63，对应测量值从-110dBm到-48dBm, 步进1dBm。

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240409165505.png)

| rxlev | From | To   | Unit |
|-------|------|------|------|
| 0     |      | -110 | dBm  |
| 1     | -110 | -109 | dBm  |
| 2     | -109 | -108 | dBm  |
| 3     | -108 | -107 | dBm  |
| ...   | ...  | ...  | ...  |
| 61    | -50  | -49  | dBm  |
| 62    | -49  | -48  | dBm  |
| 63    | -48  |      | dBm  |


### 2.9. 基站定位

基站定位使用到的参数有MCC，MNC，LAC，CellID, 这个网站👉🏼[基站定位查询](http://api.cellocation.com:84/cell.html) 可以用来测试基站定位。


### 2.10. 测量数据参考文档

- LTE下测量值和上报值的映射关系在36.133文档中，包含LTE相关的RSRP RSRQ RSSI SINR
- WCDMA下测量值和上报值的映射关系在25.133文档中，包含WCDMA相关的
- GSM下测量值和上报值的映射关系在45008文档中。
