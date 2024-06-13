

## 编程中常用的IP地址数据接口与接口

数据结构：
`struct in_addr` 和 `ip4_addr_t`等价

线程安全型接口：
- **inet_pton** 转换字符串到网络字节序地址
- **inet_ntop** 将网络字节序地址转换为字符串

线程不安全接口：
**inet_addr** 将点分十进制IP地址（字符串）转换成网络字节序IP地址【返回网络字节序的地址】
**inet_aton** 同上【返回网络字节序的地址】
**inet_ntoa** 将网络字节序IP转化点分十进制IP（字符串）

## inet接口和ip4_addr以及ip6_addr接口的区别

ip地址数据接口差异：

inet接口定义：

```c
#if !defined(in_addr_t) && !defined(IN_ADDR_T_DEFINED)
typedef u32_t in_addr_t;
#endif

struct in_addr {
  in_addr_t s_addr;
};

struct in6_addr {
  union {
    u32_t u32_addr[4];
    u8_t  u8_addr[16];
  } un;
#define s6_addr  un.u8_addr
};
```

ip4_addr.h
```c
/** This is the aligned version of ip4_addr_t,
   used as local variable, on the stack, etc. */
struct ip4_addr {
  u32_t addr;
};

/** ip4_addr_t uses a struct for convenience only, so that the same defines can
 * operate both on ip4_addr_t as well as on ip4_addr_p_t. */
typedef struct ip4_addr ip4_addr_t;
```


ip6_addr.h
```c
/** This is the aligned version of ip6_addr_t,
    used as local variable, on the stack, etc. */
struct ip6_addr {
  u32_t addr[4];
#if LWIP_IPV6_SCOPES
  u8_t zone;
#endif /* LWIP_IPV6_SCOPES */
};

/** IPv6 address */
typedef struct ip6_addr ip6_addr_t;
```