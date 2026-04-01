# Buddy Web

Buddy Web 是一个从 `claude-code-source-code` 中 Buddy 概念提炼出来的独立网页项目。

它不是 Claude Code REPL 的完整复刻，而是一个更适合长期演进的浏览器 companion 应用：保留桌宠感、人格感、可孵化 companion 的设定，并逐步扩展交互、状态和未来的模型接入能力。

## 项目目标

- 保留 Buddy 的陪伴感和人格化体验
- 用 deterministic companion 机制支撑长期扩展
- 先用轻量前端体验跑通，再逐步接入更强的对话能力

## 当前已实现

- 基于 seed 的 Buddy 孵化
- 稀有度、物种、帽子、属性生成
- `localStorage` 持久化 companion 与聊天记录
- 基础聊天区与规则式回应
- `Pet buddy` / `Re-hatch` 交互
- 网页化 sprite 展示与轻量动画

## 当前不做什么

- 不追求复刻 Claude Code 的完整终端交互
- 不在第一版直接接真实 LLM API
- 不引入重型自动发布或 CI 流程

## 环境要求

- Node.js `>= 18.18.0`
- npm `>= 9`

建议先确认版本：

```bash
node --version
npm --version
```

## 快速开始

如果项目已经上传到 GitHub，用户可以直接 clone 后运行：

```bash
git clone <your-github-repo-url>
cd buddy-web
npm install
npm run start
```

启动后，Vite 会输出本地访问地址，通常是：

```text
http://localhost:5173
```

如果你只是本地开发，也可以用：

```bash
npm run dev
```

## 构建与检查

构建生产包：

```bash
npm run build
```

检查维护文档和版本元信息：

```bash
npm run check:meta
```

一键执行项目检查：

```bash
npm run check
```

## 常用脚本

- `npm run start`：以对外可访问方式启动开发服务器
- `npm run dev`：本地开发模式
- `npm run build`：构建生产包
- `npm run preview`：预览构建结果
- `npm run check:meta`：检查维护文档和版本信息
- `npm run check`：执行维护检查和构建检查

## 目录结构

```text
buddy-web/
  src/
    adapters/    # 浏览器存储等边界层
    domain/      # companion、回复、sprite、类型
    ui/          # 页面组件
  docs/          # 路线图、决策记录、归档
  scripts/       # 轻量维护脚本
```

## 版本与维护

- 版本号采用 SemVer
- 变更历史统一记录在 `CHANGELOG.md`
- 发布流程记录在 `RELEASE_CHECKLIST.md`
- 版本规则说明记录在 `VERSIONING.md`
- 提交信息采用 Conventional Commits

## 当前状态

- 当前版本：`0.1.0`
- 当前阶段：前端可演示版
- 当前重点：打磨体验、增强回复机制、准备后续 API 接入边界

## 下一阶段重点

- 优化 Buddy 的状态与情绪反馈
- 丰富回复策略，减少重复感
- 增强项目文档和发布节奏
- 为未来接真实模型预留更清晰的 adapter 层

## 上传到 GitHub 前建议检查

在准备公开仓库前，建议先执行：

```bash
npm run check
```

然后确认以下内容不需要进入版本控制：

- `node_modules/`
- `dist/`
- `*.tsbuildinfo`
- `vite.config.js`
- `vite.config.d.ts`

这些内容已经写进 `.gitignore`。

## 维护文档

- `CHANGELOG.md`：版本变更历史
- `VERSIONING.md`：版本号规则
- `RELEASE_CHECKLIST.md`：里程碑发版流程
- `docs/roadmap.md`：路线图
- `docs/decisions.md`：关键设计决策
