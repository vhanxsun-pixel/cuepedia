# PRD - 台球球杆品牌百科站

## 产品定位

**一句话描述：** 全球台球球杆品牌 & 系列产品的垂直百科站，中英双语，带配图与深度评测。

**目标用户：**
- 新手玩家：不知道怎么选杆，需要品牌科普
- 进阶玩家：想了解不同系列的差异，对比做决策
- 收藏爱好者：关注限量款、高端定制系列
- 海外 billiards 爱好者：英文长尾词搜索流量

**核心价值：** 解决"哪个品牌好？哪根杆适合我？"这个高频搜索问题。

---

## 功能模块

### P0 - 核心页面

| 页面 | 内容 | SEO 目标关键词示例 |
|------|------|-------------------|
| 首页 | 品牌导航 + 精选推荐 + 最新文章 | pool cue brands, 台球杆品牌 |
| 品牌详情页 | 品牌历史、产地、定位、全系列产品线概览 | Predator cues review, Mezz 球杆 |
| 系列产品页 | 某品牌某系列的详细参数、配图、价格区间 | Predator Ikon series, Mezz EC7 |
| 对比页 | 两款杆横向对比（材质/价格/适合人群） | Predator vs Mezz, 球杆对比 |
| 选购指南 | 新手选杆指南、预算分级推荐 | best pool cue for beginners |
| 关于/联系 | AdSense 必要页面 | - |
| 隐私政策 | AdSense 必要页面 | - |

### P1 - 增强功能

| 功能 | 说明 |
|------|------|
| 搜索 | 按品牌/价位/材质筛选球杆 |
| 多语言切换 | 中/英路由分离：`/zh/`, `/en/` |
| 图片画廊 | 每款杆高清大图 + 细节图轮播 |
| 价格追踪 | 对接电商平台显示实时价格（P2） |

### P2 - 商业化扩展

| 功能 | 说明 |
|------|------|
| Google AdSense | 文章内嵌广告位 |
| 联盟链接 | 京东/淘宝/Amazon 购买链接带佣金 |
| 付费咨询 | 1v1 选杆建议（微信/Discord） |

---

## 初期品牌清单（5-10个）

| 品牌 | 产地 | 定位 | 优先级 |
|------|------|------|--------|
| Predator | 美国 | 高端竞技 | P0 |
| Mezz | 日本 | 高端精工 | P0 |
| McDermott | 美国 | 中高端全线 | P0 |
| Lucasi | 美国 | 中端性价比 | P0 |
| OB Cues | 美国 | 前节专家 | P0 |
| Joss | 美国 | 经典手工 | P1 |
| Cuetec | 美国 | 科技流 | P1 |
| 环球/Universal | 中国 | 国产高端 | P1 |
| BS (百斯) | 中国 | 国产中端 | P1 |
| Pechauer | 美国 | 美式手工 | P2 |

---

## 页面信息架构

```
/                           首页
/zh/                        中文首页
/en/                        英文首页
/zh/brands/                 品牌列表
/zh/brands/predator/        Predator 品牌页
/zh/brands/predator/ikon/   Predator Ikon 系列
/zh/guides/                 选购指南列表
/zh/guides/beginner/        新手指南
/zh/compare/                对比工具
/en/brands/...              英文镜像结构
/about/                     关于
/privacy/                   隐私政策
/sitemap.xml                站点地图
```

---

## 每个球杆系列页需要的信息

```yaml
brand: Predator
series: Ikon
category: 竞技杆 / 花式杆 / 跳杆 / 冲杆
price_range: $800 - $2000
shaft_options: [REVO 12.4, REVO 12.9, 314-3]
joint_type: Uni-Loc
wrap: 爱尔兰亚麻 / 无包线 / 皮质
weight: 18-21 oz
butt_material: 枫木 + 乌木镶嵌
images: [正面全图, 接牙细节, 前节, 尾端]
highlights: 核心卖点 3-5 条
suitable_for: 适合人群描述
review_summary: 200-500字深度点评
```

---

## 非功能需求

| 维度 | 要求 |
|------|------|
| 性能 | Lighthouse > 90 分，首屏 < 1.5s |
| SEO | 每页独立 title/desc/OG/JSON-LD |
| 响应式 | 移动端优先，支持 Desktop/Tablet/Mobile |
| 图片 | WebP 格式，懒加载，CDN 缓存 |
| i18n | 中英文内容物理分离，hreflang 标签互指 |
| 可维护 | 数据驱动模板，新增品牌只需加数据文件 |
