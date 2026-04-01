# 版本规则说明

Buddy Web 的版本号采用 **SemVer**：

- `MAJOR.MINOR.PATCH`

当前规则以“功能里程碑”方式发版。

## 如何理解版本号

### Major

以下情况提升 `major`：

- 核心架构明显重做
- 公共接口发生不兼容变化
- 交互范式发生显著变化
- 需要用户或维护者改变使用/接入方式

示例：

- 从纯前端演示版切换为完整 API 驱动架构，且旧逻辑失效
- 完全重构回复系统，导致已有集成方式失效

### Minor

以下情况提升 `minor`：

- 新增明确功能模块
- 用户可感知的大块体验升级
- 新增重要页面、模式或能力层

示例：

- 新增更丰富的 Buddy 情绪系统
- 新增可插拔的真实 API 对话 adapter
- 新增主题系统或更完整的 companion 管理页

### Patch

以下情况提升 `patch`：

- 修 bug
- 小范围逻辑修正
- 文案、样式、结构微调
- 对已有功能的小幅增强，且不构成独立里程碑

示例：

- 修复聊天记录持久化问题
- 修复 re-hatch 后状态不同步
- 优化某个组件的视觉样式

## 发版节奏

- 不要求每次提交都发版
- 平时先把变更记到 `CHANGELOG.md` 的 `Unreleased`
- 到达功能里程碑时再统一切版本

## package.json 与日志一致性

发版时必须同时确认：

1. `package.json` 中的 `version`
2. `CHANGELOG.md` 的最新正式版本
3. `README.md` 的当前状态描述

这三者必须一致。

## Conventional Commits 约定

后续提交信息统一采用以下前缀：

- `feat:`
- `fix:`
- `refactor:`
- `docs:`
- `style:`
- `chore:`
- `build:`

建议写法：

```text
feat: add richer buddy reaction states
fix: persist chat history after re-hatch
docs: add release checklist for milestone versions
refactor: split reply generation from UI state updates
chore: ignore build artifacts and tsbuildinfo files
```

## 建议的实际执行规则

- 重要功能提交前，先想它未来会落在 `CHANGELOG.md` 的哪一类
- 如果一个改动很难归类，说明改动目标还不够清晰
- `feat` 和 `fix` 最好都能说明影响对象或结果
