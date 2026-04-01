# Buddy Mascot Direction History

## Purpose

这份文档不是宣传稿，而是给未来继续改 Buddy 形象时快速恢复上下文用的。

目标是做到：

- 下次一读就知道我们已经讨论过什么
- 知道哪些方向已经明确不要了
- 知道哪些系统设计要保留
- 知道当前默认形象为什么先回到原始 Claude Code Buddy 气质

## Original source reference

Buddy 最开始参考自 `claude-code-source-code` 里的原始终端 companion。

原始 `cat` sprite 片段来自 `src/buddy/sprites.ts`：

```text
   /\_/\
  ( {E}   {E})
  (  ω  )
  (")_(")
```

原始轻微 fidget 帧包括：

```text
   /\_/\
  ( {E}   {E})
  (  ω  )
  (")_(")~
```

以及：

```text
   /\-/\
  ( {E}   {E})
  (  ω  )
  (")_(")
```

原始 `renderFace` 中，cat 的脸部签名是：

```text
={eye}ω{eye}=
```

这里真正值得保留的是：

- 终端感
- 简洁
- `ω` 嘴的记忆点
- 像“ lives beside the chat box ”的小 companion 气质

不值得机械复刻的是：

- 它本身不够像成熟网页 mascot
- 放大到网页主舞台后容易撑不住

## What went wrong in our recent explorations

在把 Buddy 往网页 mascot 方向推进时，我们连续遇到过几个问题：

### 1. 当前 cat 脸太长

- 头壳高度拉得太高
- visor 区块偏高
- 鼻口区到底边距离偏长
- 结果是“轮廓更清楚了，但还是看着不顺”

### 2. 太 plush / 太蠢萌

- 有一版虽然轮廓更像猫，但整体更像 plush toy
- 这种方向会削弱 Buddy 的终端来源感
- 用户反馈里的关键词更接近“蠢”“笨萌”，不是我们要的

### 3. 科技感只靠背景撑

- glow、grid、HUD 都在背景里
- 但角色本体没有真正长出科技结构
- 结果是背景很像 cyber pet，角色本体却不够像

### 4. 单纯往“更赛博”推会继续拉长脸

- 如果把 visor 和脸部科技结构继续堆在脸上
- 会让脸继续显长
- 所以后来我们把科技感重点转向身体和轮廓，而不是继续压在脸上

## Directions we discussed

### ASCII / terminal

优点：

- 最接近原始 Buddy
- 终端来源感最强
- 记忆点清楚

缺点：

- 放到网页主舞台容易显得像占位符
- 不够像成熟 mascot

### Pixel / terminal pixel

优点：

- 可以保留终端灵魂
- 比纯 ASCII 更容易做成网页角色

缺点：

- 如果网格和比例不稳，很容易又丑又土
- 当时还没有稳定到一个足够好的版本

### Cyber pet mascot

优点：

- 更适合长期做产品
- 更适合做皮肤、成长、主题扩展

缺点：

- 一旦控制不好，就会变成长脸、假科技或 plush 感

### Single flagship mascot

这是目前已经保留的产品方向：

- 先做一个主角 Buddy
- 再在它上面做模板、皮肤、成长
- 不从一开始做多物种图鉴

## Directions explicitly rejected

这些方向目前已经明确不要：

- 脸太长
- 太 plush / 太蠢萌
- 科技感主要靠背景而不是角色本体
- 高自由角色编辑器
- 一上来做大量并列物种、各自一套完全独立美术体系

## Directions explicitly kept

这些方向已经明确保留：

- 单一主 mascot
- `cat` 作为默认模板
- 主题皮肤层
- 外观阶段成长
- 长期支持扩展，但不推翻基础骨架
- mascot system 类型结构继续保留

## Current product-level decision

当前阶段的决定不是继续硬推新的 cat 审美实验，而是：

1. 保留已经建立的 mascot system 框架
2. 默认显示形象先回到原始 Claude Code Buddy 气质
3. 之后再在这个更稳的出发点上重新设计 cat 基础形象

换句话说：

- 系统设计继续往前
- 默认视觉气质先往回

## Current implementation rule

当前默认显示策略应理解为：

- `cat + signal + 默认展示`：优先使用原始 Buddy 风格显示
- 其他模板 / 皮肤 / 阶段：可以继续沿用 mascot system 的扩展方向

这不是撤销 mascot system，而是给默认展示建立一个“原始形象兼容模式”。

## What to remember next time

如果下一次继续设计 cat 基础形象，要记住：

- 不要从“长脸 SVG 猫”继续补丁
- 要从“已经恢复原始 Buddy 气质”的默认显示出发
- 先判断要保留原始 Buddy 的哪一部分：
  - 终端感
  - 轻怪可爱
  - `ω` 嘴
  - 小 companion 气质
- 再决定哪些部分需要重新设计成更成熟的网页 mascot

一句话总结：

**原始 Buddy 的价值在气质，不在造型准确度；当前阶段先回到它的气质，再重新做对 cat 的基础形象。**
