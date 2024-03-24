---
article: false
title: Zigbee Routing
icon: note
---

> • Table Routing• Broadcast Routing• Multicast Routing• Many-to-One/Source Routing

• Table Routing  
• Broadcast Routing  
• Multicast Routing  
• Many-to-One/Source Routing

[](#1-1-Table-Routing "1.1. Table Routing")1.1. Table Routing
-------------------------------------------------------------

网络中的节点通过 route discover 来建立到达其他节点的路径，如果路径已经建立了，之后发送消息就遵循下面的步骤：

1.  消息的发送方在自己的路由表中找到发往接收方的下一跳的节点的地址，然后把消息发给这个节点。
2.  在发送方和接收方之间的节点在自己的路由表中找到通往接收方节点的下一跳节点的地址，向接力一样最终发往消息的接收方。
3.  如果中间路由失败了，那么会产生一个错误，送到消息的发送方，消息的发送方就可以重新发起 route discover 过程来重新建立路由。

### [](#1-1-1-Route-Discovery-路由发现 "1.1.1. Route Discovery 路由发现")1.1.1. Route Discovery 路由发现

当一个节点希望发送数据包到另外一个节点时，它先检查自己的 route table 中是否包含目的节点的 route。

*   如果包含，直接将数据发送给下一跳节点
*   如果不包含，它发起一个 **route discovery** 过程。  
    route discovery 的启动标志是源节点广播 **Route Request(RREQ)** 数据包。

RREQ 数据包包含几个组成部分：

1.  Route Request ID(AODV: sequence number)
2.  目标网络地址
3.  路径损耗
4.  源地址

目的节点接收到 RREQ 消息后单播一个 **Route Reply** 消息到源地址。之后源节点向目的节点发送消息就可以通过这个已经建立的 route 来进行，中转节点在 discovery 期间也会建立到达目的节点的 route。

### [](#1-1-2-Route-maintenance-路由维护 "1.1.2. Route maintenance 路由维护")1.1.2. Route maintenance 路由维护

节点为具有 **outgoing link** 的邻居保存一个错误计数器，计数器溢出了则判定 **Link Failure**。

要注意到 MTO 路由错误与普通的表路由错误在处理上的不同，MTO 路由中是可以假定你的邻居拥有回到中心节点的路径的，错误通知可以通过邻居发给中心节点，中心节点受到消息后在网络层之上做处理。

[](#1-2-Many-to-one-多对一路由 "1.2. Many-to-one 多对一路由")1.2. Many-to-one 多对一路由
-------------------------------------------------------------------------

MTO 路由是一种使网络中的其他路由设备拥有回到中心节点路径的路由机制。在实际的网络应用中，比较常见到这种情况，即大多数节点需要与一个单一节点进行通讯。这个单一节点一般称之为 collector 或者 concentrator。  
这种机制通过中心节点发送 many-to-one 广播消息在网络中的其他路由节点上建立反向路由。当路由节点接受到 many-to-one 路由请求后，它将回到中心节点的下一跳的信息存储在自己的路由表中。在路由表中有一个字段 Many-to-one，表示该条目的目的地址为中心节点。

![](https://tueo.github.io/images/many_to_one_routing_275x285.png)

建立 many-to-one 路由的流程：

1.  中心节点广播 many-to-one 路由请求消息。
2.  网络中的其他路由节点接收到请求后在路由表里存储一个反向的 many-to-one 路由表条目。
3.  zigbee 协议栈会根据每个邻居的链路质量选择一个最好的节点作为回到的中心节点的下一跳地址。
4.  many-to-one 路由请求应该周期性的广播，以刷新网络中的反向路由。

[](#1-3-Source-Routing-源路由 "1.3. Source Routing 源路由")1.3. Source Routing 源路由
----------------------------------------------------------------------------

Source Routing 可以让中心节点存储到网络中其他节点的完整路由。当中心节点拥有到达某个节点的完整路由时，之后可以为发往该节点的消息指定完整的路径。

![](https://tueo.github.io/images/source_routing.gif)

建立 Source Routing 的流程：

1.  中心节点周期性的发送 many-to-one 路由请求，网络中的其他设备拥有了回到中心节点的路径。
2.  当网络中的设备使用 many-to-one 路由向中心节点发送消息之前，它先发送一条路由记录 (Route Record) 消息到中心节点。
3.  路由记录消息沿着 many-to-one 路由单播到达中心节点。
4.  当路由记录经过 many-to-one 路由上的每个节点时，都会将这个节点的网络地址附加到路由记录消息中。
5.  当路由记录消息到达中心节点时，它就包含了这一路上的每一跳节点的网络地址。
6.  中心节点将这条路由反向存储在自己的路由记录表 (Route Record Table) 中。

### [](#1-3-3-High-Low-RAM-Concentrator-mode "1.3.3. High/Low RAM Concentrator mode")1.3.3. High/Low RAM Concentrator mode

1.  High RAM 模式表示中心节点具备存储网络中所有节点的路径的能力；网络中的节点只需要在收到 MTO 路由请求后发送第一条消息之前发送路由记录到中心节点。（NXP 有提到是当节点受到来自中心节点通过 RRT 发送过来的数据才停止这一行为）
2.  Low RAM 模式表示中心节点缺少 RAM 来存储所有的节点路径；网络中的路由节点在每次发送消息时都需要先发送路由记录。

TODO：网络中的设备是如何确认中心节点的 RAM 类型呢？

> When Many to One (MTO) requests are broadcast, DO = 40 (bit 6) determines if the concentrator is operating in high or low RAM mode.

[](#1-4-参考资料 "1.4. 参考资料")1.4. 参考资料
----------------------------------

[Source routing](https://www.digi.com/resources/documentation/Digidocs/90001942-13/concepts/c_source_routing.htm#_bookmark179)  
[浅谈 Many-to-One/Source Routing 机制](https://www.silabs.com/community/wireless/zigbee-and-thread/knowledge-base.entry.html/2017/12/18/_many-to-one_source-JRvm)