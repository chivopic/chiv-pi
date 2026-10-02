<p align="center">
  <img src="packages/coding-agent/docs/images/chiv-pi/logo.svg" alt="chiv-pi 标识" width="128">
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@chivopic/chiv-pi"><img alt="npm 版本" src="https://img.shields.io/npm/v/@chivopic/chiv-pi?style=flat-square" /></a>
  <a href="LICENSE"><img alt="MIT 许可证" src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" /></a>
</p>
<p align="center">
  简体中文 | <a href="README.md">英文版</a>
</p>

> 基于 [Pi v1.0.0](https://github.com/earendil-works/pi/tree/v1.0.0) 改造。公开 npm 包、命令和配置目录使用 chiv-pi；内部源码包名及托管服务仍沿用上游名称。

# chiv-pi 智能体框架

这是 chiv-pi 终端 AI 编程助手的源码仓库。它可以读取和修改项目文件、运行命令、管理会话，并通过技能和扩展适配工作流。

* **[`@chivopic/chiv-pi`](https://www.npmjs.com/package/@chivopic/chiv-pi)**：公开发布的命令行工具和 SDK，运行命令为 `chiv-pi`
* **[@earendil-works/pi-agent-core](packages/agent)**：工具调用和状态管理运行时
* **[@earendil-works/pi-ai](packages/ai)**：多服务商模型接口

## 快速开始

通过 npm 安装并启动：

```bash
npm install -g --ignore-scripts @chivopic/chiv-pi
cd /path/to/your/project
chiv-pi
```

在终端中运行 `/login` 连接模型服务，用 `/model` 选择模型，然后输入任务。

## 界面预览

- 读取、修改项目文件，并运行命令验证结果。
- 切换模型，继续或分支会话。
- 通过技能、扩展和 MCP 定制工作流。
- 使用打印、JSON、RPC 模式或 TypeScript SDK 集成到脚本和应用。

以下是已发布的 `chiv-pi v1.0.0` 实际终端画面。点击图片可放大：

| 读取文件并解释代码 | 选择模型 |
|:---:|:---:|
| <a href="packages/coding-agent/docs/images/chiv-pi/interactive.png"><img src="packages/coding-agent/docs/images/chiv-pi/interactive.png" alt="chiv-pi 的工具输出和模型回复" width="420"></a> | <a href="packages/coding-agent/docs/images/chiv-pi/model-picker.png"><img src="packages/coding-agent/docs/images/chiv-pi/model-picker.png" alt="chiv-pi 模型选择器" width="420"></a> |

使用说明见[终端操作](packages/coding-agent/docs/usage.md)、[模型选择](packages/coding-agent/docs/models.md)和[会话管理](packages/coding-agent/docs/sessions.md)。发布流程见 [npm 发布说明](packages/coding-agent/docs/npm-release.md)。

## 从源码启动

需要 Node.js 22.19 或更新版本。在仓库根目录安装依赖并启动：

```bash
npm install --ignore-scripts
npm run hydrate:model-data
npm start
```

也可以从任意工作目录调用源码入口，它会保留调用时的工作目录：

```bash
/path/to/chiv-pi/chiv-pi
/path/to/chiv-pi/chiv-pi --help
```

启动后使用 `/login` 配置模型服务，或设置服务商对应的 API 密钥环境变量。

## 配置与会话

| 用途 | 路径或环境变量 |
|------|----------------|
| 用户配置、凭据和资源 | `~/.chiv-pi/agent/` |
| 项目配置和资源 | `<项目>/.chiv-pi/` |
| 用户配置目录覆盖 | `CHIV_PI_CODING_AGENT_DIR` |
| 会话目录覆盖 | `CHIV_PI_CODING_AGENT_SESSION_DIR` |
| 子进程标记 | `AI_AGENT=chiv-pi`、`CHIV_PI_CODING_AGENT=true` |

chiv-pi 使用独立配置目录，不会自动读取 `~/.pi/agent` 或项目中的 `.pi` 资源。需要的设置和扩展应放入对应的 `.chiv-pi` 目录。

内部编程助手源码包仍使用 [@earendil-works/pi-coding-agent](packages/coding-agent) 名称。上游 Pi 资料：

* [pi.dev](https://pi.dev)：包含演示的项目网站
* [上游文档](https://pi.dev/docs/latest)：也可以让助手解释自身功能

## 所有软件包

| 软件包 | 说明 |
|--------|------|
| **[@earendil-works/chord](packages/chord)** | 用于服务、复制状态、RPC 和插件的独立应用组合运行时 |
| **[@earendil-works/pi-telemetry](packages/telemetry)** | 与服务商无关的遥测协议、参考适配器、一致性测试和类型化模式 |
| **[@earendil-works/pi-ai](packages/ai)** | 统一的多服务商大语言模型接口，支持 OpenAI、Anthropic、Google 等 |
| **[@earendil-works/pi-durable](packages/durable)** | 持久化对话、任务和文档运行时 |
| **[@earendil-works/pi-agent-core](packages/agent)** | 支持工具调用和状态管理的智能体运行时 |
| **[@earendil-works/pi-coding-agent](packages/coding-agent)** | 交互式命令行编程助手 |
| **[@earendil-works/pi-tui](packages/tui)** | 支持差异渲染的终端界面库 |

有关 Slack、聊天自动化和工作流，请参阅 [earendil-works/pi-chat](https://github.com/earendil-works/pi-chat)。

## 权限与容器化

Pi 没有内置用于限制文件系统、进程、网络或凭据访问的权限系统。默认情况下，它使用启动用户和进程的权限运行。

如需更强的隔离，请在容器或沙箱中运行。参阅[容器化指南](packages/coding-agent/docs/containerization.md)中的三种方式：

- **Gondolin 扩展**：将 `pi` 和模型服务凭据保留在宿主机，把内置工具和 `!` 命令转发到本地 Linux 微型虚拟机。
- **普通 Docker**：在本地容器中运行整个 `pi` 进程。
- **OpenShell**：在受策略控制的沙箱中运行整个 `pi` 进程。

## 参与贡献

贡献指南见 [CONTRIBUTING.md](CONTRIBUTING.md)，项目专属规则见 [AGENTS.md](AGENTS.md)，两者均适用于人工和智能体贡献者。Pi 的长期计划见 [RFC 文档](https://rfc.earendil.com/keyword/pi/)。

## 开发

```bash
npm install --ignore-scripts  # 安装依赖，不运行生命周期脚本
npm run hydrate:model-data    # 获取从源码运行所需的模型目录
npm run build                 # 更新模型数据并构建所有软件包
npm run build:offline         # 使用现有模型数据离线构建
npm run check                 # 检查格式、静态规则和类型
./test.sh                     # 运行测试；没有 API 密钥时跳过依赖模型服务的测试
./pi-test.sh                  # 从源码运行 Pi，可在任意目录调用
```

## 从上游发布源码构建独立可执行文件

GitHub 上游发布包含版本化源码归档，校验和记录在对应的 `SHA256SUMS` 文件中。解压后运行官方独立可执行文件使用的构建脚本：

```bash
VERSION="<release-version>"
tar -xzf "pi-${VERSION}-source.tar.gz"
cd "pi-${VERSION}"
./scripts/build-binaries.sh --offline-model-data --platform linux-x64 --out "$PWD/out"
```

归档包含发布版模型数据和原生预构建文件。`--offline-model-data` 使用归档中的模型数据，不刷新服务商目录。脚本会安装依赖并构建包含运行时资源的可执行文件；如果已安装依赖，可传入 `--skip-install`。

## 供应链保护

我们将 npm 依赖变更视为需要审查的代码变更。

- 外部直接依赖固定到精确版本；内部工作区软件包保留版本范围。
- `.npmrc` 设置 `save-exact=true` 和 `min-release-age=2`，避免在 npm 解析时选用当天发布的依赖。
- `package-lock.json` 是依赖版本的依据。除非设置 `PI_ALLOW_LOCKFILE_CHANGE=1`，提交前检查会阻止意外提交锁文件。
- `npm run check` 会检查直接依赖版本、原生 TypeScript 导入兼容性以及生成的编程助手 shrinkwrap 文件。
- 发布的命令行软件包包含由根目录锁文件生成的 `packages/coding-agent/npm-shrinkwrap.json`，以固定 npm 用户的间接依赖。
- 发布冒烟测试使用 `npm run release:local`，在打标签前于仓库外构建、打包并建立隔离的 npm 和 Bun 安装。
- 支持的情况下，本地发布安装、文档中的 npm 安装，以及 `pi update --self` 均使用 `--ignore-scripts`。
- CI 使用 `npm ci --ignore-scripts` 安装依赖；定期运行的 GitHub 工作流执行 `npm audit --omit=dev` 和 `npm audit signatures --omit=dev`。
- shrinkwrap 生成脚本为依赖生命周期脚本设置了明确的允许列表；新增此类依赖必须经过审查才能通过检查。

## 分享开源编程助手会话

如果你使用 Pi 或其他编程助手开发开源项目，欢迎分享会话记录。

公开的开源会话数据包含真实任务中的工具使用、失败和修复过程，有助于改进编程助手。[这篇文章](https://x.com/badlogicgames/status/2037811643774652911)有详细说明。

发布会话可使用 [`badlogic/pi-share-hf`](https://github.com/badlogic/pi-share-hf)。设置方法见其 README；只需要 Hugging Face 账号、Hugging Face 命令行工具和 `pi-share-hf`。也可以观看[发布 `pi-mono` 会话的演示视频](https://x.com/badlogicgames/status/2041151967695634619)。作者公开的会话见 [Hugging Face 上的 `badlogicgames/pi-mono`](https://huggingface.co/datasets/badlogicgames/pi-mono)。

## 许可证

MIT。基于 [earendil-works/pi](https://github.com/earendil-works/pi)；原始版权声明见 [LICENSE](LICENSE)。

<p align="center">
  <a href="https://pi.dev">pi.dev</a> 域名由
  <br /><br />
  <a href="https://exe.dev"><img src="packages/coding-agent/docs/images/exy.png" alt="Exy 吉祥物" width="48" /><br />exe.dev</a> 友情捐赠
</p>
