# 开发计划 - 台球球杆百科站

## 技术架构

```
┌─────────────────────────────────────────────────┐
│                    用户浏览器                      │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│            Cloudflare Pages (CDN)                │
│         免费托管 + 全球 CDN + SSL                 │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│              静态 HTML/CSS/JS                     │
│                                                  │
│  ┌────────────┐  ┌──────────┐  ┌────────────┐  │
│  │  模板引擎   │  │ 数据文件  │  │  构建脚本   │  │
│  │ (Nunjucks) │  │  (JSON)  │  │  (Node.js) │  │
│  └────────────┘  └──────────┘  └────────────┘  │
└─────────────────────────────────────────────────┘

图片存储：Cloudflare R2（免费 10GB）或 GitHub LFS
```

---

## 技术选型

| 层级 | 选择 | 理由 |
|------|------|------|
| 构建工具 | 11ty (Eleventy) | 最轻量的 SSG，纯模板驱动，学习成本低 |
| 模板语言 | Nunjucks | 支持继承/include/loop，适合数据驱动页面 |
| 样式 | TailwindCSS | 原子化，响应式方便，产出小 |
| 数据格式 | JSON/YAML 文件 | 每个品牌一个文件，Claude 可直接生成 |
| 图片处理 | eleventy-img | 自动生成 WebP + 多尺寸 |
| 部署 | Cloudflare Pages | 免费、快、Git 推送自动部署 |
| 域名 | Cloudflare Registrar | 便宜 $8-10/年 |
| 图片存储 | Cloudflare R2 | 免费 10GB，够用 |
| 搜索 | Pagefind | 纯静态站搜索方案，构建时索引 |

---

## 项目结构

```
pool-cue-site/
├── src/
│   ├── _data/                    # 数据文件
│   │   ├── brands/
│   │   │   ├── predator.json     # 品牌信息
│   │   │   ├── mezz.json
│   │   │   └── ...
│   │   ├── series/
│   │   │   ├── predator-ikon.json
│   │   │   ├── predator-revo.json
│   │   │   └── ...
│   │   ├── guides/
│   │   │   └── beginner.json
│   │   └── site.json             # 全局配置
│   ├── _includes/                # 模板组件
│   │   ├── layouts/
│   │   │   ├── base.njk          # 基础布局（head/nav/footer）
│   │   │   ├── brand.njk         # 品牌页布局
│   │   │   └── series.njk        # 系列页布局
│   │   ├── components/
│   │   │   ├── nav.njk
│   │   │   ├── brand-card.njk
│   │   │   ├── image-gallery.njk
│   │   │   ├── spec-table.njk
│   │   │   └── ad-slot.njk
│   │   └── seo/
│   │       ├── meta.njk
│   │       └── jsonld.njk
│   ├── zh/                       # 中文页面
│   │   ├── index.njk
│   │   ├── brands/
│   │   └── guides/
│   ├── en/                       # 英文页面
│   │   ├── index.njk
│   │   ├── brands/
│   │   └── guides/
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   │       └── brands/
│   │           ├── predator/
│   │           └── mezz/
│   ├── about.njk
│   ├── privacy.njk
│   └── sitemap.njk
├── scripts/
│   ├── fetch-data.js             # 数据采集辅助脚本
│   ├── process-images.js         # 图片批处理（压缩/WebP）
│   └── generate-sitemap.js
├── .eleventy.js                  # 11ty 配置
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 数据文件格式示例

### `src/_data/brands/predator.json`

```json
{
  "id": "predator",
  "name": {
    "zh": "美洲豹",
    "en": "Predator"
  },
  "country": "USA",
  "founded": 1994,
  "logo": "/assets/images/brands/predator/logo.webp",
  "tagline": {
    "zh": "竞技性能之巅",
    "en": "The Ultimate in Performance"
  },
  "description": {
    "zh": "Predator 创立于1994年，以低偏转前节技术闻名...",
    "en": "Founded in 1994, Predator is renowned for low-deflection shaft technology..."
  },
  "tier": "high-end",
  "series": ["ikon", "throne", "blak", "sport", "roadline"],
  "signature_tech": ["REVO shaft", "Uni-Loc joint", "V-Tek wrap"],
  "price_range": {
    "min": 300,
    "max": 5000,
    "currency": "USD"
  },
  "website": "https://www.predatorcues.com",
  "socials": {
    "instagram": "predatorcues",
    "youtube": "PredatorGroup"
  }
}
```

### `src/_data/series/predator-ikon.json`

```json
{
  "id": "predator-ikon",
  "brand": "predator",
  "name": {
    "zh": "Predator Ikon 系列",
    "en": "Predator Ikon Series"
  },
  "category": "playing-cue",
  "price_range": { "min": 800, "max": 3500, "currency": "USD" },
  "shaft_options": ["REVO 12.4", "REVO 12.9", "314-3"],
  "joint": "Uni-Loc",
  "wrap_options": ["Irish Linen", "No Wrap", "Leather"],
  "weight_range": "18-21 oz",
  "butt_materials": ["Hard Rock Maple", "Ebony inlays"],
  "images": [
    { "src": "/assets/images/brands/predator/ikon-full.webp", "alt": "Predator Ikon full view" },
    { "src": "/assets/images/brands/predator/ikon-joint.webp", "alt": "Ikon joint detail" }
  ],
  "highlights": {
    "zh": ["低偏转 REVO 前节", "12片拼接设计", "Uni-Loc 快拆接牙"],
    "en": ["Low-deflection REVO shaft", "12-piece spliced design", "Uni-Loc quick-release joint"]
  },
  "suitable_for": {
    "zh": "中高级竞技玩家，追求精准控球和稳定发力",
    "en": "Intermediate to advanced competitive players seeking precision and power"
  },
  "review": {
    "zh": "Ikon 系列是 Predator 的旗舰竞技线...",
    "en": "The Ikon series is Predator's flagship competition line..."
  },
  "buy_links": [
    { "platform": "Amazon", "url": "https://..." },
    { "platform": "PoolDawg", "url": "https://..." }
  ]
}
```

---

## 数据采集方案

### 数据来源

| 渠道 | 获取内容 | 方法 |
|------|----------|------|
| 品牌官网 | 产品参数、官方图片、系列列表 | 手动 + Claude 总结 |
| YouTube 评测视频 | 使用体验、优缺点、对比观点 | Whisper 转录 + Claude 提炼 |
| 抖音/B站 | 中文评测、开箱、实战体验 | 视频下载 + Whisper + Claude |
| Reddit r/billiards | 用户真实评价、对比讨论 | 手动搜集 + Claude 总结 |
| 电商平台 | 价格、用户评价、销量 | 定期人工更新 |
| 台球论坛 | 深度使用反馈 | 手动搜集 |

### 数据采集流程

```
1. 官网结构化数据 → 手动填 JSON
2. 视频评测 → Whisper 转录 → Claude 提炼要点 → 补充到 review 字段
3. 图片 → 官网下载/自拍 → 压缩为 WebP → 放入 assets/
4. 用户评价 → Reddit/论坛采集 → Claude 汇总共识观点
```

### 视频解析工具链（复用已有方案）

```bash
# 抖音视频 → 转录 → 要点提炼
python3 scripts/fetch-data.js --source douyin --url "分享链接"
# 输出：transcription.txt + key_points.json

# YouTube 视频 → 字幕提取
yt-dlp --write-auto-sub --sub-lang en --skip-download "YouTube URL"
# 输出：字幕文件 → Claude 提炼
```

---

## 图片策略

| 来源 | 用途 | 版权风险 |
|------|------|----------|
| 官网产品图 | 产品展示 | 中（需注明来源或获取授权） |
| 自拍实物图 | 细节展示 | 无 |
| AI 生成图 | 辅助配图/Banner | 无 |
| 用户投稿 | UGC 内容 | 需授权声明 |

**图片处理流程：**
```
原图 → sharp/eleventy-img → WebP + 多尺寸（400w/800w/1200w）→ CDN
```

---

## 部署方案

### 开发环境

```bash
# 本地开发
npm run dev          # 11ty --serve + tailwind --watch
# 构建
npm run build        # 输出到 _site/
```

### 生产部署

```
GitHub 仓库 → Push to main → Cloudflare Pages 自动构建 → 全球 CDN 分发
```

**Cloudflare Pages 配置：**
- Build command: `npm run build`
- Output directory: `_site`
- Node version: 18+

### 域名规划

- 主域名：`poolcueguide.com` 或 `cuepedia.com`（待查注册）
- 备选：`billiardscue.guide`

---

## SEO 策略

### 站内 SEO

- 每页独立 `<title>` + `<meta description>`
- hreflang 中英互指：`<link rel="alternate" hreflang="zh" href="/zh/...">`
- JSON-LD: Article / Product / BreadcrumbList schema
- 图片 alt 全填
- URL 语义化：`/en/brands/predator/ikon/`
- sitemap.xml 自动生成
- robots.txt 配置

### 站外 SEO

- Google Search Console 提交
- 百度站长平台提交（中文版）
- Reddit r/billiards 自然分享
- 台球论坛签名链接
- YouTube 评测视频描述区放链接

---

## 商业化路径

### Phase 1: 流量积累（Month 1-3）
- 无广告，专注内容质量和 SEO
- 目标：20+ 内容页，Google 开始收录

### Phase 2: AdSense 接入（Month 3-4）
- 申请 Google AdSense
- 广告位：文章顶部 + 中间 + 底部
- 预期：日均 100-500 UV → $1-5/天

### Phase 3: 联盟营销（Month 4-6）
- 接入 Amazon Associates / PoolDawg Affiliate
- 每篇产品页加"在哪买"按钮
- 佣金 4-8%

### Phase 4: 扩展变现（Month 6+）
- Ezoic 升级广告（需 10k UV/月）
- 品牌赞助合作
- 付费选杆咨询
