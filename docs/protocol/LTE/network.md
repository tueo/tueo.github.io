
## 网络参数

#### RSRP(Reference Signal Received Power)

**参考信号接收功率**，单位是dBm，报告值的范围从-17到97，对映测量值从-156dBm到-44dBm，步进为1dBm。

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240409153613.png)

#### RSRQ(Reference Signal Received Quality)

**参考信号接收质量**，单位是dB，报告值的范围从-30到46，对映测量值从-34dB到2.5dB，步进为0.5dB。

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240409154335.png)

#### RSSI(Reference Signal Strength Indicator)

代表接收带宽内的总功率， 包括有用信号，干扰信号的。单位是dBm，报告值的范围从00到76， 对应测量值从-100到-25dBm，步进1dBm。
![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240409160705.png)

#### SINR(Signal to Interference plus Noise Ratio)

信噪比，单位是dB，报告值的范围从00到127， 对应测量值从-23到40dB，步进0.5dB。

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240409161755.png)

#### RSRP RSRQ SINR的评价标准

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240409152938.png)

#### RXLEV(the value of received signal strength)

2G下表示接收信号强度，单位是dBm，报告值的范围从0到63，对应测量值从-110dBm到-48dBm, 步进1dBm。

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240409165505.png)

### 基站定位

基站定位使用到的参数有MCC，MNC，LAC，CellID, 这个网站👉🏼[基站定位查询](http://api.cellocation.com:84/cell.html) 可以用来测试基站定位。
