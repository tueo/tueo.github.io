## feed

## 分区

## 编译生成文件

```
md5sums                              openwrt-ramips-mt7688-vmlinux.bin                         packages
openwrt-ramips-mt7688-root.squashfs  openwrt-ramips-mt7688-vmlinux.elf                         sha256sums
openwrt-ramips-mt7688-uImage.bin     openwrt-ramips-mt7688-WIDORA1664-squashfs-sysupgrade.bin
```

- **squashfs-sysupgrade.bin**: sysupgrade 替换 linux 内核和 squash 文件系统，擦除整个 jffs2 部分。能保留配置文件，但不能保留二进制安装文件。