
- [1. RT-Thread网络设备框架](#1-rt-thread网络设备框架)
  - [1.1. netdev是如何获取到不同网络协议栈网卡信息的?](#11-netdev是如何获取到不同网络协议栈网卡信息的)
  - [1.2. netdev和协议栈网卡的绑定关系?](#12-netdev和协议栈网卡的绑定关系)
  - [1.3. netdev实例的创建](#13-netdev实例的创建)
    - [1.3.1. 共享资源保护](#131-共享资源保护)
  - [SAL层如何使用netdev?](#sal层如何使用netdev)
  - [netdev示例状态变换通知](#netdev示例状态变换通知)


# 1. RT-Thread网络设备框架

![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240806213013.png)

在rtthread中, netdev致力于解决不同网络协议簇的网络设备的统一问题. 用于统一管理各个网卡的信息与网络连接信息.

从架构图上可以看到, netdev对上向SAL套接字抽象层提供服务, 对下, 抽象封装了Lwip, AT Socket等不同网络协议簇的网络设备信息.

## 1.1. netdev是如何获取到不同网络协议栈网卡信息的?

netdev在接口上提供了`low_level`系列接口用于不同网络协议簇的网卡信息获取. 这些接口由网络协议栈的驱动程序调用, 比如底层网卡的ip地址变更, 就通过`netdev_low_level_set_ipaddr`
修改netdev中保存的对应的网卡的ip地址.


```c
/* Set network interface device status and address, this function can only be called in the network interface device driver */
void netdev_low_level_set_ipaddr(struct netdev *netdev, const ip_addr_t *ipaddr);
void netdev_low_level_set_netmask(struct netdev *netdev, const ip_addr_t *netmask);
void netdev_low_level_set_gw(struct netdev *netdev, const ip_addr_t *gw);
void netdev_low_level_set_dns_server(struct netdev *netdev, uint8_t dns_num, const ip_addr_t *dns_server);
void netdev_low_level_set_status(struct netdev *netdev, rt_bool_t is_up);
void netdev_low_level_set_link_status(struct netdev *netdev, rt_bool_t is_up);
void netdev_low_level_set_internet_status(struct netdev *netdev, rt_bool_t is_up);
void netdev_low_level_set_dhcp_status(struct netdev *netdev, rt_bool_t is_enable);
```

如下是在LWIP协议栈中, netif_set_ipaddr中嵌入了netdev_low_level_set_ipaddr的调用, 用于在LWIP协议栈网卡的IP地址变更的时候, 同步修改netdev中的IP地址.  


```c
void
netif_set_ipaddr(struct netif *netif, ip_addr_t *ipaddr)
{
  //...

#ifdef RT_USING_NETDEV
  /* rt-thread sal network interface device set IP address operations */
  netdev_low_level_set_ipaddr(netdev_get_by_name(netif->name), (ip_addr_t *)ipaddr);
#endif /* RT_USING_NETDEV */
}
```

## 1.2. netdev和协议栈网卡的绑定关系?

netdev和协议栈网卡的绑定关系是通过关联协议栈网卡`name`和netdev示例的`name`实现的. 如上面的示例中, netdev_get_by_name通过netif->name获取到LWIP协议栈网卡的netdev实例, 在rtthread中, 协议栈网卡中的`name`做了扩充, 增加到6个字节.

在netdev实例的创建接口(`netdev_register`)中, 也可以指定自定义数据, 通常可以将协议栈网卡的句柄传入, 这样也能实现从netdev示例反解出协议栈网卡的句柄.

## 1.3. netdev实例的创建

netdev的实例由使用方申请和释放, 可以通过`netdev_register`和`netdev_unregister`将netdev实例注册到netdev管理器中或者从netdev管理器中注销. netdev管理器中提供链表的方式串连这些netdev实例.

```c
int netdev_register(struct netdev *netdev, const char *name, void *user_data);
int netdev_unregister(struct netdev *netdev);
```

### 1.3.1. 共享资源保护

netdev管理器中, 通过自选锁的方式对全局链表handle进行保护.


## SAL层如何使用netdev?

1. 在SAL层的socket接口初始化时, 会首先尝试查找一个netdev def实例, 如果该实例不可用, 会回退尝试通过Address families匹配netdev实例. 如果匹配成功, 则将netdev实例和socket实例绑定, **将netdev示例的句柄赋值给socket实例的netdev成员变量**. 
2. socket bind时, 会通过IP地址在netdev管理器中查询匹配指定IP地址的netdev实例, 如果匹配成功, 则更新socket实例的netdev成员变量.

在SAL层的许多地方, 会直接通过socket实例的netdev成员变量访问netdev实例中保存的网络连接信息, 比如网卡是否可用等.

> 多线程安全性问题: 在示例从netdev管理器中被注销后, 会将该netdev memset为0, SAL层在使用前都会检查netdev的UP标记, 以确定是否可以访问该netdev实例. 但是SAL层能否感知到netdev示例被协议栈底层释放呢? 在SAL层代码汇总并没有看到该痕迹. 或者说协议栈层网卡被销毁前有机制通知到SAL层, SAL层先删除自己的句柄, 这样就不存在多线程问题了.

## netdev示例状态变换通知

```c
void netdev_set_register_callback(netdev_callback_fn status_callback);
void netdev_set_status_callback(struct netdev *netdev, netdev_callback_fn status_callback);
void netdev_set_addr_callback(struct netdev *netdev, netdev_callback_fn addr_callback);
```
