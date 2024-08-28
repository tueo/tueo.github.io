## 选择 uboot

这里选择歪多拉的 u-boot，该版本支持 web 升级，项目说明也比较多，适合入门。

## 构建第一个 uboot 镜像

歪多拉的编译参考
[编译](https://widora.cn/compile)

- 源码下载

```bash
git clone https://github.com/widora/u-boot-mt7688.git
```

解压编译工具链到/opt/目录下

```bash
cd u-boot-mt7688
sudo tar xvfj buildroot-gcc342.tar.bz2 -C /opt/
```

安装 openjdk, 并保证系统语言为英文

```bash
sudo apt-get install openjdk-8-jdk
```

进入 u-boot-mt7688 源码，编译

```bash
cd u-boot-mt7688
make clean;make
```

生成的 uboot 固件文件为 `uboot.bin`, 从编译完的输出信息可以看到，生成的镜像大小为 110376 Bytes, 没有超出 bootloader 的大小限制。

```bash
Image Name:   SPI Flas
Created:      Sun Aug 25 20:05:45 2024
Image Type:   MIPS Linux Standalone Program (uncompressed)
Data Size:    110376 Bytes = 107.79 kB = 0.11 MB
Load Address: 0xBC000000
Entry Point:  0xBC000000
DRAM Parameter: 29 (Parm0=0 Parm1=0)

===============<<IMPORTANT>>==================
Notes:Uboot firmware is uboot.bin NOT uboot.img
================================================
```

## 调整 uboot 镜像

1. flash 大小需要为 16MB
2. RAM 的大小需要调整为 64MB

通过`make menuconfig` 进入配置界面，修改配置，将 DDR size 调整 512Mb, 也就是 64MB。
![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240826111036.png)

## uboot 下命令行方式更新固件方式

```
Please choose the operation:
   1: Load system code to SDRAM via TFTP.
   2: Load system code then write to Flash via TFTP.
   3: Boot system code via Flash (default).
   4: Entr boot command line interface.
   7: Load Boot Loader code then write to Flash via Serial.
   9: Load Boot Loader code then write to Flash via TFTP.
```