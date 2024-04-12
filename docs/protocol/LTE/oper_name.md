---
article: false
title: 运营商名称
date: 2024-04-08
---

- [1. 运营商名称](#1-运营商名称)
  - [1.1. PLMN](#11-plmn)
  - [1.2. 从网络侧获取运营商名称](#12-从网络侧获取运营商名称)
  - [1.3. 读取SIM卡运营商名称](#13-读取sim卡运营商名称)

# 1. 运营商名称

## 1.1. PLMN

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240408151650.png)

PLMN由MCC和MNC构成，MCC是3位数字，MNC是2或者3位数字。

1. MCC：Mobile Country Code，移动国家代码，3位数字，表示移动国家代码，用于区分移动国家。
2. MNC：Mobile Network Code，移动网络代码，2或3位数字，表示移动网络代码，用于区分移动网络。

2或者3位数字的规定比较反人类，如`722	010`这种MNC为3位，但是首数字为0的，假如还存在`722 10`，就特别容易弄混，另外在编码时，需要标记这个PLMN的MNC是2位或者3位。




## 1.2. 从网络侧获取运营商名称

在注网成功后，网络侧会通过NITZ下发网络侧运营商名称。

```
				NAS Message: NET -> UE
				Protocol discriminator  <EPS Mobility management messages>
				Security header type  <plain NAS message>
				Message Type  <Emm information>
				Full Name
						IE Name  <Network Name>
						IE len  <11>
						Number of sparebits in last octet  <bits 6 to 8(inclusive) are spare and set to 0 in octet n>
						Add CI  <The MS not add the letters for the Country's Initials to the text string>
						Coding Scheme  <Cell Broadcast CS... defined in 3GPP TS 23.038 [8b>
						ext 1  <1>
						Text String  <f6 37 39 6c 7e bb cb 20 aa 14 >
				Short Name
						IE Name  <Network Name>
						IE len  <8>
						Number of sparebits in last octet  <this field carries no information about the number of spare bits in octet n>
						Add CI  <The MS not add the letters for the Country's Initials to the text string>
						Coding Scheme  <Cell Broadcast CS... defined in 3GPP TS 23.038 [8b>
						ext 1  <1>
						Text String  <f6 37 39 6c 7e bb cb >
				Local Time Zone
						IE Name  <Time Zone>
						Time Zone  <21 >
				Universal Time And Local Time Zone
						IE Name  <Time Zone And Time>
						Year  <50>
						Month  <17>
						Day  <2>
						Hour  <113>
						Minute  <83>
						Second  <131>
						Time zone  <33>
				Daylight Saving Time
						IE Name  <Daylight Saving Time>
						IE len  <1>
						value  <No adjustment for Daylight Saving Time>
						Spare  <0>
```


## 1.3. 读取SIM卡运营商名称


