## feed

```bash
./scripts/feeds update -a
./scripts/feeds install -a
```

## 下载依赖包

```
make download
make download V=s
```

后者可以显示详细的下载过程 LOG, 如果出现下载失败时，使用后者查看具体是哪个包下载失败。
如果有包下载失败，有两种方式可以解决：

1. 可以通过网络资源下载下来缺少的包，然后放入`dl`文件夹。
2. 搭建科学上网环境。

> a. 我这里是在 VPS 环境中编译，搭建科学上网参考的 [clash-for-linux-backup](https://github.com/Elegycloud/clash-for-linux-backup), 在 vps 环境访问 Clash Dashboard 是一个麻烦的问题，这里可以使用 vscode, 首先 vscode 通过 remote 连接到 VPS, 然后通过 PORTS 中增加一个 port forward, 将 VPS 的 dashboard 端口转发到本地，这样就可以通过本地访问 VPS 的 dashboard 了。
> b. 下载过程中如果出现 `fatal: unable to connect to github.com:github.com[0:20.205.243.166]: errno=Unknown error`, 则需要发送 `git config --global url."https://github.com".insteadOf git://github.com`

## 分区

## 编译生成文件

编译生成的文件在`bin/ramips/`路径下

```
md5sums                              openwrt-ramips-mt7688-vmlinux.bin                         packages
openwrt-ramips-mt7688-root.squashfs  openwrt-ramips-mt7688-vmlinux.elf                         sha256sums
openwrt-ramips-mt7688-uImage.bin     openwrt-ramips-mt7688-WIDORA1664-squashfs-sysupgrade.bin
```

- **squashfs-sysupgrade.bin**: sysupgrade 替换 linux 内核和 squash 文件系统，擦除整个 jffs2 部分。能保留配置文件，但不能保留二进制安装文件。
