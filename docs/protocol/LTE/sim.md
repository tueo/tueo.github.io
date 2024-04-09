---
article: false
title: 🎫SIM卡
icon: sim
date: 2024-03-25
---

# 🎫SIM卡

## DF name 和 AID

DF name就是AID🆔，可以是1~16个字节，在sim 卡中，每个AID应该是独一无二的。

下面是一个典型的AID示例，共16bytes。
```
A0000000871002FF86FFFF89FFFFFFFF
```

AID在7816-5文档中定义，但是可惜该文档收费😔。我在131110和101220文档中找到了相关结构示例如下：

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240327192035.png)

所以AID的结构如下：

- `RID` 占5个字节。
- `PIX` 小于11个字节。

RID的值如下：

- 'A000000009' for ETSI
- '**A000000087**' for the 3GPP
- 'A000000343' for the 3GPP2

PIX的结构如下
- Digits 1 to 4 Application code
- Digits 5 to 8 国家码(Country code)，上面的FF86就是中国，中国国家码是86，然后左边两位是补的ff.
- Digits 9 to 14 Application provider code，上面的FFFF89
- Digits 15 up to 22 Application provider field Optional. Up to 8 digits

## APDU到TPDU的映射

## command APDU的最小长度和最大长度

- **最小长度为4** 注意，TPDU最小为5个字节
- **最大长度为261**

这里的APDU协议指SIM中使用的APDU，按照102221文档内容分析。

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/sim_contents_of_command_apdu.png)

command APDU分为两个部分，分别是`Header`和Body，`Header`是一个command APDU必须具备的，占4个字节，`Body`则是可选内容。

从上面的结构看，命令APDU存在如下4种结构：

|Case|Structure|
|---|---|
|1|CLA INS P1 P2|
|2|CLA INS P1 P2 Le|
|3|CLA INS P1 P2 Lc Data|
|4|CLA INS P1 P2 Lc Data Le|

最短长度出现在case1中，只有`Header`部分，因此仅有4个字节；注意TPDU最小为5个字节，在case1的情况下，映射时，P3会填充为0。
最长长度出现在case4中，`261 = 4(首部) + 1(Lc) + 255(Data) + 1(Le)`， Lc只占用1个字节，因此Data最长仅为255 Bytes。

- Lc表示command APDU中data字段的数据size，如果Lc存在，Data的size范围在`1~255`字节。
- Le表示期待的response APDU的Data字段的最大size，如果Le缺失，表示不期待任何数据，如果Le为「00」，则允许接收256字节的数据，此时SIM卡侧可以返回1到256个字节的数据。

> 思考：这种特殊约定极易容易引发问题，从协议设定角度和工程实现角度，这种特殊约定越少越好。

## response APDU的最小长度和最大长度

- **最小长度为2**
- **最大长度为258**

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/sim_contents_of_response_apdu.png)

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

## 常见的SIM卡文件

### IMSI

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240328151528.png)

IMSI是国际移动用户识别码，是用于区分蜂窝网络中不同用户的、在所有蜂窝网络中不重复的识别码。

🧩**最大长度是多少？**

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240328151845.png)

IMSI遵循E.212文档的规范，最大长度为15位，部分运营商是14位的。

❔ **都是数字么**

根据规范要求，应该都是0~9的数字。

### ICCID

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240327131357.png)

ICCID文件ID是2EF2，在11.11文档中描述了它的结构。在该文件中使用BCD编码格式保存，占10个字节（20位）。

但是实际上ICCID是在E.118文档中定义的，称为primary account number。在该文档中，ICCID中应该是19位的digit串。

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240327132214.png)

因此在实践上，ICCID的长度可能是19位，也可能是20位。当为19位的时候，在EFiccid文件中存储时，会在最后一位补一个F进去，因此也将ICCID从纯数字变成了可能携带字符F的形式。

结构：

- **Major industry identifier** 首先是2位数字行业代码，89表示电信行业。
- **Country Code** 2到3位数字的国家码。
- **Issuer identifier** 1到4位的数字，一般会是MCC。
- **Individual account identification** 自定义的ID，但是一般是Mobile identification number。
- 最后一位数字的是校验位，校验算法是Luhn algorithm。

下面是一个携带F的ICCID的示例：

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240327133833.png)

ICCID按照一个19位或者20位的字符串（0~F）理解。在实际工程中，发现存在非89开头的ICCID，也存在`898600E1122115658504` 这种中间插入非0~9的ICCID。只要是19位或者20位，且满足BCD编码格式，都可以作为ICCID。

