## 远程调试

在远程调试时，可能会遇到可执行文件需要 sudo 权限的情况，这时需要在 launch.json 中添加如下配置：

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "sudo myapp",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceFolder}/build/exe",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "externalConsole": false,
            "miDebuggerPath": "${workspaceFolder}/gdb_root.sh",
            "MIMode": "gdb"
        }
    ]
}
```

同时在项目文件夹根目录下增加`gdb_root.sh`

```bash
#!/bin/bash
SELF_PATH=$(realpath -s "$0")

if [[ "$SUDO_ASKPASS" = "$SELF_PATH" ]]; then
    zenity --password --title="$1"
else
    exec env SUDO_ASKPASS="$SELF_PATH" sudo -A /usr/bin/gdb $@
fi
```

## clangd 插件

微软提供的 c 插件智能感知能力有时存在问题，可以使用 clangd 替代，该插件依赖 cmake 构建提供的`compile_commands.json`文件。
该插件和微软的 c 插件存在冲突，可以通过如下配置关闭 c 插件的智能感知功能

```json
"C_Cpp.intelliSenseEngine": "disabled"
```
