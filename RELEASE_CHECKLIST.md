# 发布检查清单

Buddy Web 当前采用“功能里程碑版”发布方式。

每次准备发版时，按下面的顺序执行。

## 发版前

1. 确认这次是否真的达到了一个功能里程碑
2. 整理 `CHANGELOG.md` 中的 `Unreleased`
3. 判断版本号应该提升 `major` / `minor` / `patch`
4. 更新 `package.json` 的 `version`
5. 确认 `README.md` 中的“当前状态”和“下一阶段重点”是否仍然正确
6. 运行：
   - `npm run check:meta`
   - `npm run build`

## 发版时

1. 把 `Unreleased` 中的内容切到正式版本号和日期下
2. 为这个版本补一句“这个版本主要解决了什么问题”
3. 检查版本变更是否和实际代码改动一致

## 发版后

1. 在 `CHANGELOG.md` 顶部重新创建新的 `Unreleased`
2. 更新 `docs/roadmap.md`
3. 如有重要设计变化，补写到 `docs/decisions.md`
4. 确认下一个里程碑要解决的问题已经写清楚

## 最低通过标准

如果以下任意一项没完成，就不要视为正式发版：

- `CHANGELOG.md` 未更新
- `package.json` 版本未同步
- `npm run build` 未通过
- 这次版本的目标和结果说不清楚

## 里程碑发布示例

示例：从 `0.1.0` 进入 `0.2.0`

- 目标：让 Buddy 回复逻辑从纯规则式提升为“规则 + 可扩展 adapter”
- 版本判断：属于新增明确能力，应提升 `minor`
- 发版动作：
  - `0.1.0` -> `0.2.0`
  - 把 `Unreleased` 中对应功能整理到 `0.2.0`
  - 更新 README 的当前状态
