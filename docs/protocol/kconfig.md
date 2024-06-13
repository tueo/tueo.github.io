
# kconfig文件

在调整项目编译结构时，需要使用python的 kconfiglib库来解析kconfig文件，但是调整的一个kconfig文件一直无法被感知到。

一开始怀疑是该kconfig文件没有使用menu的原因，但是从kconfig文档看，应该不存在该问题。

最终定位到是`source`语法的使用问题。

在项目中， top level的kconfig文件使用`orsource`包含了中间层的A kconfig文件（为项目调整编写的新的kconfig文件）。 A kconfig文件使用`osource`包含目标B kconfig文件。

测试发现一直无法生成B kconfig文件对应的cmake变量。最后才看到漏掉了`orsource`的`r`。


![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240522202629.png)
其间也怀疑过osource使用存在问题，使用gpt查询`osource`和`orsource`的差异，结果被gpt的错误答案误导了😭


在kconfiglib中有如下描述：

`source` 用来引入其他的kconfig文件。
`osource` 表示optional source，表示可选的，如果osource指定的kconfig文件不存在，编译不会报错，将继续下去。
`rsource` 表示relative source，后面应用的kconfig文件支持相对路径，路径相对于包含rsource语句的kconfig而言。
`orsource` 则是`osource`和`rsource`的接合。

osurce rsource orsource等其实是kconfiglib提供的kconfig的扩展。
