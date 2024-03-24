---
article: false
title: Zigbee Table
icon: note
---


> age 字段每过一个 nwkLinkStatusPeriod，就会增加，当 age 字段超过 nwkRouterAgeLimit 时就会将 Outgoing Cost 字段设置为 0。

* * *

<table><thead><tr><th>Field Name</th><th>Field Type</th><th>Valid Range</th><th>Reference</th></tr></thead><tbody><tr><td>Network Address</td><td>Integer</td><td>0x0000- 0xfff7</td><td>route record 的目的网络地址</td></tr><tr><td>Relay Count</td><td>Integer</td><td>0x0000 - 0xffff</td><td>从集中器到目的节点的中继数量</td></tr><tr><td>Path</td><td>Set of Network Addresses</td><td></td><td>网络地址集合，表示从集中器到目的节点之间的节点地址集合</td></tr></tbody></table><table><thead><tr><th>Field Name</th><th>description</th></tr></thead><tbody><tr><td>Extended address</td><td>IEEE 地址</td></tr><tr><td>Network address</td><td>节点网络地址</td></tr><tr><td>Device type</td><td>节点类型 (coordinator router end device)</td></tr><tr><td>RxOnWhenIdle</td><td>idle 时是否可以接收 父节点和子节点必须 present</td></tr><tr><td>End Device Configuration</td><td>终端节点的配置</td></tr><tr><td>Timeout Counter</td><td>end device remaining time (sec)</td></tr><tr><td>Device timeout</td><td>end device child timeout(sec)</td></tr><tr><td>Relationship</td><td>与节点之间的关系</td></tr><tr><td>Transmit Failure</td><td>指示之前的数据通讯是否成功，数值越大，失败越多</td></tr><tr><td>LQI</td><td>该节点的链路质量</td></tr><tr><td>Outgoing Cost</td><td>传出损耗 0 表示无效</td></tr><tr><td>Age</td><td></td></tr><tr><td>Incoming beacon timestamp</td><td>从邻居接收到的最后一条 beacon 帧的时间戳</td></tr><tr><td>Beacon transmission tiem offset</td><td></td></tr><tr><td>Keepalive Received</td><td>表示自从 router 重启以来，至少接收到一条来自终端设备的数据？</td></tr><tr><td>Extended PAN ID</td><td>设备所属网络的 PAN ID</td></tr><tr><td>Logical channel</td><td>设备所在的信道</td></tr><tr><td>Depth</td><td>邻居节点的 tree depth</td></tr><tr><td>Beacon order</td><td>设备的 IEEE 802.15.4 信标顺序</td></tr><tr><td>Permit joining</td><td>设备是否正在允许 join</td></tr><tr><td>Potential parent</td><td>设备是否是潜在的父节点</td></tr></tbody></table>

[](#2-1-邻居表老化 "2.1. 邻居表老化")2.1. 邻居表老化
-------------------------------------

age 字段每过一个 nwkLinkStatusPeriod，就会增加，当 age 字段超过 nwkRouterAgeLimit 时就会将 Outgoing Cost 字段设置为 0。当有新的邻居节点时，这个邻居节点就可以被抛弃掉。  
end device 不会发出 link status, 所以这一机制不起作用。

<table><thead><tr><th>Field Name</th><th>size</th><th>Description</th></tr></thead><tbody><tr><td>Destination address</td><td>2 octets</td><td>网络地址或者 Group ID</td></tr><tr><td>Status</td><td>3 bits</td><td>route 的状态</td></tr><tr><td>No route cache</td><td>1 bit</td><td>标志位：目的地址没有存储源路由</td></tr><tr><td>Many-to-one</td><td>1 bit</td><td>标志位：目的地址是发出 MTO 路由请求的集中器</td></tr><tr><td>Route record required</td><td>1 bit</td><td>标志位：在下一个数据包发送到目的节点前应当先将 route record 发送到</td></tr><tr><td>GroupID flag</td><td>1 bit</td><td>标志位：目的地址是一个 Group ID</td></tr><tr><td>Next-hop address</td><td>2 octets</td><td>下一跳的网络地址</td></tr></tbody></table>

[](#3-2-路由表中end-device的Destination-address "3.2. 路由表中end device的Destination address")3.2. 路由表中 end device 的 Destination address
-------------------------------------------------------------------------------------------------------------------------------

根据地址分配方式的不同而不同，当 **nwkAddrAlloc** 等于 0 时表示使用分布式地址分配方式，等于 2 时表示使用随机地址分配方式。  
当使用随机地址分配方式时，路由表中 end device 的地址为该设备的实际地址。当使用分布式地址分配方式时，路由表中 end device 的地址为其父节点的地址。

[](#3-3-Status "3.3. Status")3.3. Status
----------------------------------------

路由表条目的 status 如下所示：

<table><thead><tr><th>num</th><th>status</th><th>状态</th></tr></thead><tbody><tr><td>0x0</td><td>active</td><td>有效的</td></tr><tr><td>0x1</td><td>discovery_underway</td><td>正在进行路由发现</td></tr><tr><td>0x2</td><td>discovery_failed</td><td>路由发现失败</td></tr><tr><td>0x3</td><td>inactive</td><td>无效的</td></tr><tr><td>0x4</td><td>validation_underway</td><td>正在核验有效性</td></tr></tbody></table><table><thead><tr><th>Field Name</th><th>size(octets)</th><th>Description</th></tr></thead><tbody><tr><td>Route request ID</td><td>1</td><td></td></tr><tr><td>Source address</td><td>route request 发起方的网络地址</td><td></td></tr><tr><td>Sender address</td><td>这条路由请求的最佳上家，之后的 route reply 会发给这个节点</td><td></td></tr><tr><td>Forward cost</td><td>从发起方到当前节点的累计路径损耗</td><td></td></tr><tr><td>Residual cost</td><td>从当前节点到目的节点的累计路径损耗</td><td></td></tr><tr><td>Expiration time</td><td>倒数计时器，指示路由发现截止时间</td><td></td></tr></tbody></table>