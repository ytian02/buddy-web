# Changelog

本项目的变更日志遵循 Keep a Changelog 思路，并结合功能里程碑发布节奏维护。

## [Unreleased]

### Added

- 新增维护文档体系：`README.md`、`VERSIONING.md`、`RELEASE_CHECKLIST.md`
- 新增 `docs/roadmap.md` 与 `docs/decisions.md`
- 新增 `npm run check:meta` 用于检查维护型文件是否齐全
- 新增 `.gitignore`，明确忽略依赖、构建产物和本地构建信息
- 新增首版界面预览截图，已同步到 `README.md`
- 新增 SVG 版 Buddy mascot，提供更稳定的主视觉轮廓与状态表达
- 新增 `docs/mascot-system.md`，固定 Buddy 的 rig / skin / stage / accessory 设计边界
- 新增 `docs/mascot-direction-history.md`，归档 Buddy 形象讨论过程和当前默认方向
- 新增 `speciesTemplate`、`themeSkin`、`growthStage`、`accessorySet` 等可扩展宠物系统接口

### Changed

- 明确后续版本号采用 SemVer
- 明确后续提交信息采用 Conventional Commits
- 明确后续发版节奏采用功能里程碑版，而不是每次小改动都升版本
- 调整 `README.md` 结构，使 GitHub 首页优先展示项目预览和快速开始
- 将 Buddy 展示区升级为终端桌宠风格的小舞台，强化 glow、扫描纹理与主角感
- 将 Buddy 可视状态收束为 `idle / happy / thinking`，并让发送消息先进入思考态
- 将宠物模型从“随机独立物种”升级为“单一主 mascot + 模板/皮肤/成长阶段”系统
- 将首页文案、资料卡和主视觉同步到新的 cyber pet mascot 方向
- 将默认 `cat + signal` 的显示层回溯到原始 Claude Code Buddy 风格，同时保留 mascot system 框架

### Fixed

- 补齐项目维护规范，避免未来迭代只能靠回忆和源码反推
- 降低未来做皮肤、成长和自定义时需要重做整只宠物的风险

### Removed

- 无

## [0.1.0] - 2026-04-01

### Added

- 初始化 Buddy Web 项目
- 实现 Buddy 孵化、状态展示、聊天交互与本地存储
- 提供基础网页 UI 与可构建的前端应用骨架

### Changed

- 无

### Fixed

- 无

### Removed

- 无
