
## 文件权限变化导致的git差异

最近有一个项目中，经常出现特定两个文件显示存在git差异，但是使用BCompare比较，其二进制完全相同。使用 `git diff` 查看，提示如下：
![](https://raw.githubusercontent.com/tueo/cloudimg/main/img/20240509155417.png)

从git信息看，存在文件权限变化，导致git认为文件内容有变化。

知道差异原因就好处理了，可以使用如下命令让git忽略文件权限差异。

```bash
git config --global core.fileMode false
```

## gerrit提交代码

提交代码到`my_branch`，需要审核

```bash
git push origin HEAD:refs/for/my_branch
```

提交代码到`my_branch`，不需要代码审核

```bash
git push origin HEAD:refs/heads/my_branch
git push origin HEAD:refs/for/my_branch%no-review
```
