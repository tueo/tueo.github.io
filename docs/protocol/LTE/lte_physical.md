---
article: false
title: LTE网络物理层
icon: network
date: 2024-04-08
---

- [1. LTE带宽的划分](#1-lte带宽的划分)
- [2. 时域帧格式](#2-时域帧格式)
- [3. 信号的时频表示](#3-信号的时频表示)
- [4. 参考资料](#4-参考资料)

## 1. LTE带宽的划分

在LTE系统中，带宽是以**RB**为单位划分的，1个RB占用的带宽是180kHz。每个RB有12个子载波，每个子载波的宽度是15kHz。`180kHz=15kHz*12`。LTE规范一共定义了6种带宽，分别是1.4MHz、3MHz、5MHz、10MHz、15MHz和20MHz。

|带宽|对应的RB数|
|---|---|
|1.4MHz|6|
|3MHz|15|
|5MHz|25|
|10MHz|50|
|15MHz|75|
|20MHz|100|


## 2. 时域帧格式

- 时域上，一帧为`10ms`。
- 每个帧又可以划分为10个子帧，每个`子帧为1ms`。
- 每个子帧有两个时隙，每个`时隙为0.5ms`。
- 每个时隙又包含`6或者7个OFDM符号`，具体是6或者7个OFDM符号取决于循环前缀的长度。

时域帧格式如下图所示。

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240410205812.png)

## 3. 信号的时频表示

>LTE空口的一个显著特征是其信号的时频映射。原始信息比特经过编码与调制，映射为复数信号，最终按照一定的规则映射到时频资源栅格上。

需要理解原始信息被映射为复数信号，然后映射到时频资源网格上。

在资源网格中，横轴表示时域，纵轴表示频域。时频网格中最小的单位是`RE`(resource element),横轴上占用一个OFDM符号，纵轴上占用一个子载波（15kHz）。`RB`(resource block)是资源调度的最小单位，在时域上占用0.5ms，即一个slot，可能是6或者7个OFDM符号，在频域上占用12个子载波，即180kHz。

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240410212716.png)

**每个RE可以传输多少信息呢？**

RE是LTE中的最小物理资源。一个RE可存放一个调制符号（modulationsymbol），该调制符号可使用QPSK（对应一个RE存放**2比特数据**）、16QAM（对应一个RE存放**4比特数据**）或64QAM（对应一个RE存放**6比特数据**）调制。

|调制方式|每个符号存放的比特数|
|---|---|
|QPSK|2|
|16QAM|4|
|64QAM|6|

**调度的最小单位与RB pair**

虽然RB是基于一个slot（0.5ms）定义的，但LTE中调度的基本时间单位是一个子帧（1ms，对应2个slot），称为一个`TTI`。一个TTI内的调度（调度PDSCH和PUSCH资源）的最小单位实际上由同一子帧上时间上相连的2个RB（每个slot对应一个RB）组成，并被称为`RB pair`。

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240410212407.png)

## 4. 参考资料

- [A. 4G/LTE - Frame Structure / Downlink](https://www.sharetechnote.com/html/FrameStructure_DL.html)
- [B. LTE 物理层技术概要](https://zlearning.netlify.app/lte/physical/lte-physical-overview.html)