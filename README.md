# 我的应用

自己做的几个小应用，都在这里：**https://reotho123-pixel.github.io/**

这是 GitHub 用户根站点，打开就是应用列表。比记每个 app 的长地址方便。

## 现役应用

| 应用 | 地址 | 做什么 |
| --- | --- | --- |
| 待会吃什么 | [/chishenme/](https://reotho123-pixel.github.io/chishenme/) | 两个人一起定今晚吃什么：随机选菜、双人投票、采购清单 |
| 坚持 | [/jianchi/](https://reotho123-pixel.github.io/jianchi/) | 英语 · 健身 · 戒撸，打卡与连续天数 |
| 极简 | [/digital-shelf/](https://reotho123-pixel.github.io/digital-shelf/) | 物品与软件归类，记录喜欢程度，极简进程 |
| 记账 | [/lazy-ledger/](https://reotho123-pixel.github.io/lazy-ledger/) | 快捷指令自动记账、手动记账、统计 |
| 熊记 | [/lazy-ledger/xiongji/](https://reotho123-pixel.github.io/lazy-ledger/xiongji/) | 手账风记账，自动记账，数据存自己的私有仓库 |
| 动效总表 | [/motion-catalog/](https://reotho123-pixel.github.io/motion-catalog/) | 交互动效图鉴，全部条目可上手试 |

## 页面结构

单文件 `index.html`，深色舞台 + 竖向卡片堆叠：

- `--pitch` 控制卡片节距，越小叠得越紧
- 缩放/透明度都是 `scrollTop` 的纯函数，所以反向滚动天然完全可逆
- 当前卡只显示标题，下方被压住的卡换成底部名字标签（否则只剩一块颜色认不出是哪个 app）
- `prefers-reduced-motion: reduce` 时不写 transform/opacity，退回普通滚动列表

`icons/` 里的素材由 `_mkhomeassets.ps1` 从各 app 仓库的 `icon-512.png` 生成（256px 圆角卡片图标 + 启动图标四件套）。
入口页自己的启动图标是深色方底 + 2×3 彩色小方块。

## 改列表 / 加应用

1. 把新 app 的图标加到 `icons/`（256×256 圆角 PNG）
2. 编辑 `index.html`，在 `.deckInner` 里加一张卡：

```html
<a class="card" href="<仓库名>/" data-nm="应用名"
   style="--c1:#浅色;--c2:#深色;--glow:#霓虹色">
  <img class="ico" src="icons/<名字>.png" alt="" width="256" height="256" decoding="async" loading="lazy">
  <span class="txt">
    <span class="nm">应用名</span>
    <span class="ds">一句话说明</span>
  </span>
  <span class="tag" aria-hidden="true">应用名</span>
  <span class="go" aria-hidden="true">↗</span>
</a>
```

3. 底部 `.dots` 里的圆点数量同步改
4. 重新部署：

```powershell
$env:GH_TOKEN = 'ghp_xxxx'
powershell -NoProfile -ExecutionPolicy Bypass -File _deploy-home.ps1
```

## 说明

- 纯静态，无构建、无依赖；离线可用（html + 图标都进了 SW 缓存）
- 卡片的 `--c1/--c2` 是该 app 的主色（渐变两端），`--glow` 是切到这张卡时背后的霓虹光
- 部署脚本用 `curl.exe` 而不是 `Invoke-RestMethod`：本机 PS 5.1 传大 JSON 会断连
