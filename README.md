# 我的应用

自己做的几个小应用，都在这里：**https://reotho123-pixel.github.io/**

这是 GitHub 用户根站点，打开就是应用列表。比记每个 app 的长地址方便。

## 现役应用

| 应用 | 地址 | 做什么 |
| --- | --- | --- |
| 待会吃什么 | [/chishenme/](https://reotho123-pixel.github.io/chishenme/) | 两个人一起定今晚吃什么：随机选菜、双人投票、采购清单 |
| 坚持 | [/jianchi/](https://reotho123-pixel.github.io/jianchi/) | 英语 · 健身 · 戒撸，打卡与连续天数 |
| 电子收纳 | [/digital-shelf/](https://reotho123-pixel.github.io/digital-shelf/) | 物品与软件归类，记录喜欢程度，极简进程 |
| 懒人记账 | [/lazy-ledger/](https://reotho123-pixel.github.io/lazy-ledger/) | 快捷指令自动记账、手动记账、统计 |
| 极简清单 | [/minimal-list/](https://reotho123-pixel.github.io/minimal-list/) | 物品清单、数字极简、30 天冷静期购物清单 |
| 每日计划总表 | [/daily-plan/](https://reotho123-pixel.github.io/daily-plan/) | 英语 · 健身 · 打卡日历（「坚持」的前身） |

## 旧版本（列表页里折叠起来了）

| 应用 | 说明 |
| --- | --- |
| auto-ledger | 旧版记账，已被懒人记账取代 |
| plan90 | 旧版 90 天计划 |
| minimalism-checklist | 极简清单 v1，已废弃 |
| minimal-items | 极简清单 v2（旧），已废弃 |

## 加新应用 / 改列表

1. 部署新应用到 `https://reotho123-pixel.github.io/<名字>/`
2. 编辑 `index.html`，在 `.grid` 里加一张卡：

```html
<a class="app" href="<仓库名>/" style="--c:#e6dfd3">
  <span class="blob"></span>
  <span class="new">新</span>          <!-- 可选角标 -->
  <span class="ico">🙂</span>          <!-- emoji，卡片配色由 --c 决定 -->
  <span class="nm">应用名</span>
  <span class="ds">一句话说明<br>第二行</span>
</a>
```

3. 重新部署：

```powershell
$env:GH_TOKEN = 'ghp_xxxx'
powershell -NoProfile -ExecutionPolicy Bypass -File _deploy-home.ps1
```

## 说明

- 纯静态单文件，无构建、无依赖
- 卡片配色靠 `--c` 变量传该 app 的主题色（取近似值即可，只用它做图标底色和右上角的淡色圆）
- 设计上刻意做得中性（米白底 + 白卡 + 柔和阴影），14 个 app 各有自己的配色，列表页太花会互相打架
- 每个 app 的地址是 `/<仓库名>/`，因为 GitHub Pages 项目站点的路径就是仓库名
