# GlobalTradeHub 产品需求文档（优化版）

| 产品名称：GlobalTradeHub（原 melitoolhub）<br>产品定位：跨境电商卖家专属在线工具箱<br>文档版本：v2\.0<br>更新日期：2026 年 8月 |
| ------------------------------------------------------------------------------------------------------------------------------- |

---

## 目录

1. \[产品概述\]\(\#一产品概述\)

2. \[目标用户\]\(\#二目标用户\)

3. \[核心功能清单\]\(\#三核心功能清单\)

4. \[页面结构\]\(\#四页面结构\)

5. \[SEO 架构设计\]\(\#五seo\-架构设计\)

6. \[技术栈说明\]\(\#六技术栈说明\)

7. \[产品 DEMO 展示规范\]\(\#七产品\-demo\-展示规范\)

8. \[管理后台权限强约束\]\(\#八管理后台权限强约束\)

9. \[全站访客数据监控系统\]\(\#九全站访客数据监控系统\)

---

## 一、产品概述

**GlobalTradeHub 是一款专为跨境电商卖家打造的在线工具箱网站，提供选品分析、汇率换算、费用计算、Listing 优化等一站式运营工具\*\***，帮助卖家提升运营效率、降低决策成本、解决日常工作中的各类计算和数据处理问题。\*\*

### 产品价值

- **效率提升**：卖家无需下载安装软件，在线即可使用各类运营工具，节省时间

- **成本降低**：全部工具免费使用，降低卖家工具采购成本

- **数据安全**：所有工具均在浏览器本地运行，数据不上传服务器，保护商业隐私

- **流量获取**：通过 SEO 优化，获取谷歌、百度等搜索引擎的自然搜索流量，实现冷启动

---

## 二、目标用户

### 2\.1 主要用户群体（按区域分类）

#### 一、拉美区域（核心重点赛道）

| 用户群体                 | 占比预估 | 核心需求                                     |
| ------------------------ | -------- | -------------------------------------------- |
| Mercado Libre 美客多卖家 | 25%      | 费用核算、Listing 优化、关键词工具 |
| Americanas 巴西本土卖家  | 5%       | 费用计算、物流运费、汇率换算                 |

#### 二、俄罗斯 \& 东欧区域（第二重点赛道）

| 用户群体             | 占比预估 | 核心需求                           |
| -------------------- | -------- | ---------------------------------- |
| Ozon 卖家            | 15%      | 费用计算、物流运费计算、汇率换算   |
| Wildberries 野莓卖家 | 10%      | 鞋服母婴类定价、佣金计算、物流核算 |
| Yandex Market 卖家   | 5%       | 3C 家电定价、比价分析、费用计算    |

#### 三、东南亚区域

| 用户群体             | 占比预估 | 核心需求                     |
| -------------------- | -------- | ---------------------------- |
| Shopee 虾皮卖家      | 12%      | 佣金计算、运费计算、定价工具 |
| Lazada 来赞达卖家    | 5%       | 费用核算、平台费用计算       |
| Tokopedia 印尼卖家   | 3%       | 费用计算、本地运营工具       |
| Tiki 越南卖家        | 2%       | 定价工具、费用计算           |
| Akulaku 分期电商卖家 | 2%       | 分期费率计算、费用核算       |

#### 四、欧美成熟综合平台

| 用户群体           | 占比预估 | 核心需求                             |
| ------------------ | -------- | ------------------------------------ |
| Amazon 亚马逊卖家  | 8%       | FBA 费用计算、费用核算、Listing 优化 |
| Walmart 沃尔玛卖家 | 3%       | 费用计算、平台费用核算               |
| eBay 卖家          | 2%       | 拍卖定价、佣金计算、费用核算         |

#### 五、内容电商 \& 全托管平台

| 用户群体              | 占比预估 | 核心需求                         |
| --------------------- | -------- | -------------------------------- |
| TikTok Shop 卖家      | 8%       | 达人佣金计算、选品工具、数据分析 |
| AliExpress 速卖通卖家 | 5%       | 全托管费用核算、物流费用计算     |
| TEMU 拼多多出海卖家   | 3%       | 全托管定价、成本核算             |
| SHEIN 供应商          | 2%       | 供货费用核算、成本计算           |

#### 六、B2B 批发跨境平台

| 用户群体                       | 占比预估 | 核心需求                     |
| ------------------------------ | -------- | ---------------------------- |
| 阿里巴巴国际站卖家             | 3%       | 报价计算、费用核算、汇率换算 |
| 敦煌网 DHgate 卖家             | 1%       | 批发定价、费用计算           |
| Made\-in\-China 中国制造网卖家 | 1%       | 报价工具、费用核算           |

### 2\.2 用户画像

#### 画像一：新手卖家（入行 0\-1 年）

- **身份**：个人卖家、小团队创业者

- **痛点**：不懂怎么核算费用、不知道 FBA 费用构成、定价全凭感觉

- **需求场景**：上架新品前核算费用、核算成本、对比不同物流渠道价格

#### 画像二：成熟卖家（入行 1\-3 年）

- **身份**：中小卖家，团队 3\-10 人

- **痛点**：工具分散、数据来回切换麻烦、需要批量处理数据

- **需求场景**：日常运营数据处理、批量计算、Listing 优化

#### 画像三：大卖运营（入行 3 年以上）

- **身份**：专业运营人员、运营主管

- **痛点**：需要专业工具提升效率、关注数据准确性

- **需求场景**：精细化运营、数据分析、竞品调研

### 2\.3 使用场景

1. 选品阶段：用市场调研工具分析产品竞争力

2. **上架阶段**：用 Listing 优化工具优化标题和关键词

3. **日常运营**：用汇率换算工具核算回款、用费用计算器核算成本

4. **数据处理**：用文本 / JSON 工具处理运营数据

5. **学习提升**：浏览跨境干货文章、政策合规信息

---

## 三、核心功能清单

### P0（核心必做・产品基础可用）

| 功能模块                                                                                                                                                                                                                                             | 功能点            | 说明                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | -------------------------------------------- |
| **选品分析类市场调研工具分析目标市场需求规模、竞争格局、品类趋势竞品分析工具对比竞品价格、销量、评价、卖点，输出分析报告关键词选品工具分析搜索热度、竞争度、长尾词挖掘，辅助选品决策选品数据查询查询品类销售数据、卖家数量、市场空间预估汇率换算类** | 实时汇率换算      | 支持美元、欧元、英镑、日元等主流币种实时换算 |
|                                                                                                                                                                                                                                                      | 多币种转换        | 批量多币种汇率转换                           |
|                                                                                                                                                                                                                                                      | 历史汇率查询      | 查询历史汇率数据                             |
|                                                                                                                                                                                                                                                      | 物流运费计算器    | 国际物流运费估算                             |
|                                                                                                                                                                                                                                                      | 广告成本计算器    | PPC 广告投入产出比计算                       |
| **Listing 优化类**                                                                                                                                                                                                                                   | 标题字符数统计    | 统计标题长度，符合平台限制                   |
|                                                                                                                                                                                                                                                      | 关键词密度分析    | 分析关键词出现频率和密度                     |
|                                                                                                                                                                                                                                                      | 字符数 / 字数统计 | 通用文本统计工具                             |
| **数据处理类**                                                                                                                                                                                                                                       | JSON 格式化工具   | JSON 美化、压缩、校验                        |
|                                                                                                                                                                                                                                                      | Base64 编解码     | 文本和图片 Base64 转换                       |
|                                                                                                                                                                                                                                                      | URL 编码解码      | URL 编解码转换                               |
|                                                                                                                                                                                                                                                      | 时间戳转换        | Unix 时间戳与日期互转                        |
| **基础架构**                                                                                                                                                                                                                                         | 工具分类导航      | 按功能分类展示所有工具                       |
|                                                                                                                                                                                                                                                      | 工具详情页        | 每个工具独立页面，含介绍、教程、FAQ          |
|                                                                                                                                                                                                                                                      | 面包屑导航        | 页面层级导航，提升用户体验和 SEO             |
|                                                                                                                                                                                                                                                      | 相关工具推荐      | 同类型工具互相推荐，增加站内停留             |

### P1（重要功能・提升体验）

| 功能模块     | 功能点                 | 说明                                   |
| ------------ | ---------------------- | -------------------------------------- |
| **平台专区** | 美客多工具专区         | 聚合 Mercado Libre 美客多卖家常用工具  |
|              | Americanas 工具专区    | 聚合巴西 Americanas 卖家工具           |
|              | Ozon 工具专区          | 聚合 Ozon 俄罗斯卖家常用工具           |
|              | Wildberries 工具专区   | 聚合 Wildberries 野莓卖家工具          |
|              | Yandex Market 工具专区 | 聚合 Yandex Market 卖家工具            |
|              | Shopee 工具专区        | 聚合 Shopee 虾皮卖家常用工具           |
|              | Lazada 工具专区        | 聚合 Lazada 来赞达卖家工具             |
|              | Tokopedia 工具专区     | 聚合印尼 Tokopedia 卖家工具            |
|              | Tiki 工具专区          | 聚合越南 Tiki 卖家工具                 |
|              | Akulaku 工具专区       | 聚合 Akulaku 分期电商卖家工具          |
|              | 亚马逊工具专区         | 聚合 Amazon 亚马逊卖家常用工具         |
|              | 沃尔玛工具专区         | 聚合 Walmart 沃尔玛卖家工具            |
|              | eBay 工具专区          | 聚合 eBay 卖家常用工具                 |
|              | TikTok Shop 工具专区   | 聚合 TikTok Shop 卖家常用工具          |
|              | 速卖通工具专区         | 聚合 AliExpress 速卖通全托管卖家工具   |
|              | TEMU 工具专区          | 聚合 TEMU 拼多多出海卖家工具           |
|              | SHEIN 工具专区         | 聚合 SHEIN 供应商工具                  |
|              | 阿里国际站工具专区     | 聚合阿里巴巴国际站 B2B 卖家工具        |
|              | 敦煌网工具专区         | 聚合 DHgate 敦煌网卖家工具             |
|              | 中国制造网工具专区     | 聚合 Made\-in\-China 卖家工具          |
| **搜索功能** | 全站工具搜索           | 关键词搜索快速找到目标工具             |
|              | 搜索联想               | 输入时自动联想工具名称                 |
| **用户系统** | 工具收藏               | 收藏常用工具，下次快速访问             |
|              | 使用历史               | 记录最近使用的工具                     |
| **体验优化** | 深色 / 浅色主题        | 支持主题切换，护眼                     |
|              | 多语言支持             | 中文 / 英文双语切换                    |
|              | 响应式布局             | 适配 PC、平板、手机                    |
| **内容板块** | 跨境干货               | 运营技巧、选品方法等干货文章           |
|              | 政策合规               | 各平台政策、合规要求汇总               |
| **数据监控** | 访客数据总览           | 访问量、来源、国别统计（仅管理员可见） |
|              | 留联台账管理           | 访客联系方式归集与跟进（仅管理员可见） |

### P2（迭代优化・长期规划）

| 功能模块     | 功能点         | 说明                                           |
| ------------ | -------------- | ---------------------------------------------- |
| **采购代办** | 供应商对接     | 对接国内供应商资源                             |
|              | 代采购服务     | 提供一站式采购代办服务                         |
| **联盟工具** | 联盟链接生成   | 美客多联盟、亚马逊联盟等多平台推广链接生成工具 |
|              | 佣金估算       | 估算各平台联盟推广佣金收益                     |
|              | 多平台联盟管理 | 统一管理各平台联盟账号和数据                   |
| **用户交流** | 卖家社区       | 卖家交流问答社区                               |
|              | 经验分享       | 运营经验、干货分享                             |
| **增值服务** | 云端数据同步   | 登录后数据多端同步                             |
|              | 会员高级功能   | 批量处理、高级工具等会员权益                   |
| **商业化**   | 广告位         | 精准广告投放                                   |
|              | 工具 API       | 开放工具 API 接口                              |

---

## 四、页面结构

### 4\.1 页面总览

```plaintext
GlobalTradeHub 网站
├── 前台用户端（所有访客可见）
│   ├── 首页（/）
│   ├── 工具分类列表页（/category/[category-slug]）
│   ├── 工具详情页（/tool/[tool-slug]）【SEO核心】
│   ├── 平台专区页（/platform/[platform-slug]）
│   ├── 跨境干货页（/blog）
│   ├── 政策合规章（/policy）
│   ├── 采购代办页（/sourcing）
│   ├── 联盟工具页（/affiliate）
│   ├── 用户交流页（/community）
│   └── 关于我们页（/about）
└── 管理后台（仅管理员可见，前台无入口）
    ├── 管理员登录页（/admin/login）
    ├── 访客总览（/admin/dashboard）
    ├── 来源分析（/admin/source）
    ├── 国别监控（/admin/country）
    ├── 机构/个人标签（/admin/tags）
    ├── 留联台账（/admin/leads）
    └── 系统设置（/admin/settings）
```

---

### 4\.2 首页（/）

#### 页面框架图

```plaintext
首页
├── 顶部导航栏
│   ├── Logo（GlobalTradeHub）
│   ├── 主导航：首页、跨境干货、政策合规、实用工具、采购代办、联盟工具、用户交流
│   └── 右侧功能区：搜索、语言切换、登录、注册
├── 首屏Banner区
│   ├── H1主标题：跨境电商卖家专属在线工具箱
│   ├── 副标题：一站式解决美客多/OZON/Shopee/亚马逊等全球跨境平台运营效率问题
│   ├── 卖点标签：免费 · 在线即用 · 数据安全
│   └── 右侧3D工具箱插画
├── 核心工具分类区
│   ├── 标题：工具分类
│   └── 6个分类卡片（1行6列）
│       ├── 选品分析
│       ├── 风险应对
│       ├── 汇率换算
│       ├── Listing优化
│       ├── 物流运费
│       └── 数据处理
├── 热门工具推荐区
│   ├── 标题：热门工具
│   └── 6个工具卡片（2行3列）
│       ├── 工具名称
│       ├── 一句话描述// src/app/category/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ToolCard from '@/components/ToolCard';
import { tools, categories } from '@/config/tools';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  const categoryTools = tools.filter(t => t.category === params.slug);

  const breadcrumbItems = [
    { name: '首页', href: '/' },
    { name: category.name }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}工具大全</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        {/* Tools Grid */}
        {categoryTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <span className="text-6xl mb-4 block">🔧</span>
            <p className="text-gray-600">该分类下暂无工具</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    return {
      title: '分类未找到 | GlobalTradeHub',
      description: '分类未找到'
    };
  }

  return {
    title: `${category.name}工具大全 - 跨境电商工具 |
// src/app/category/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ToolCard from '@/components/ToolCard';
import { tools, categories } from '@/config/tools';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  const categoryTools = tools.filter(t => t.category === params.slug);

  const breadcrumbItems = [
    { name: '首页', href: '/' },
    { name: category.name }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}工具大全</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        {/* Tools Grid */}
        {categoryTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <span className="text-6xl mb-4 block">🔧</span>
            <p className="text-gray-600">该分类下暂无工具</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    return {
      title: '分类未找到 | GlobalTradeHub',
      description: '分类未找到'
    };
  }

  return {
    title: `${category.name}工具大全 - 跨境电商工具 |
// src/app/category/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ToolCard from '@/components/ToolCard';
import { tools, categories } from '@/config/tools';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  const categoryTools = tools.filter(t => t.category === params.slug);

  const breadcrumbItems = [
    { name: '首页', href: '/' },
    { name: category.name }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}工具大全</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        {/* Tools Grid */}
        {categoryTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <span className="text-6xl mb-4 block">🔧</span>
            <p className="text-gray-600">该分类下暂无工具</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    return {
      title: '分类未找到 | GlobalTradeHub',
      description: '分类未找到'
    };
  }

  return {
    title: `${category.name}工具大全 - 跨境电商工具 |
// src/app/category/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ToolCard from '@/components/ToolCard';
import { tools, categories } from '@/config/tools';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  const categoryTools = tools.filter(t => t.category === params.slug);

  const breadcrumbItems = [
    { name: '首页', href: '/' },
    { name: category.name }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}工具大全</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        {/* Tools Grid */}
        {categoryTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <span className="text-6xl mb-4 block">🔧</span>
            <p className="text-gray-600">该分类下暂无工具</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    return {
      title: '分类未找到 | GlobalTradeHub',
      description: '分类未找到'
    };
  }

  return {
    title: `${category.name}工具大全 - 跨境电商工具 |
// src/app/category/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ToolCard from '@/components/ToolCard';
import { tools, categories } from '@/config/tools';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  const categoryTools = tools.filter(t => t.category === params.slug);

  const breadcrumbItems = [
    { name: '首页', href: '/' },
    { name: category.name }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}工具大全</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        {/* Tools Grid */}
        {categoryTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <span className="text-6xl mb-4 block">🔧</span>
            <p className="text-gray-600">该分类下暂无工具</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    return {
      title: '分类未找到 | GlobalTradeHub',
      description: '分类未找到'
    };
  }

  return {
    title: `${category.name}工具大全 - 跨境电商工具 |
// src/app/category/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ToolCard from '@/components/ToolCard';
import { tools, categories } from '@/config/tools';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  const categoryTools = tools.filter(t => t.category === params.slug);

  const breadcrumbItems = [
    { name: '首页', href: '/' },
    { name: category.name }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}工具大全</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        {/* Tools Grid */}
        {categoryTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <span className="text-6xl mb-4 block">🔧</span>
            <p className="text-gray-600">该分类下暂无工具</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    return {
      title: '分类未找到 | GlobalTradeHub',
      description: '分类未找到'
    };
  }

  return {
    title: `${category.name}工具大全 - 跨境电商工具 |
// src/app/category/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ToolCard from '@/components/ToolCard';
import { tools, categories } from '@/config/tools';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  const categoryTools = tools.filter(t => t.category === params.slug);

  const breadcrumbItems = [
    { name: '首页', href: '/' },
    { name: category.name }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}工具大全</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        {/* Tools Grid */}
        {categoryTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <span className="text-6xl mb-4 block">🔧</span>
            <p className="text-gray-600">该分类下暂无工具</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    return {
      title: '分类未找到 | GlobalTradeHub',
      description: '分类未找到'
    };
  }

  return {
    title: `${category.name}工具大全 - 跨境电商工具 |
// src/app/category/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ToolCard from '@/components/ToolCard';
import { tools, categories } from '@/config/tools';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  const categoryTools = tools.filter(t => t.category === params.slug);

  const breadcrumbItems = [
    { name: '首页', href: '/' },
    { name: category.name }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}工具大全</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        {/* Tools Grid */}
        {categoryTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <span className="text-6xl mb-4 block">🔧</span>
            <p className="text-gray-600">该分类下暂无工具</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    return {
      title: '分类未找到 | GlobalTradeHub',
      description: '分类未找到'
    };
  }

  return {
    title: `${category.name}工具大全 - 跨境电商工具 |
// src/app/category/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ToolCard from '@/components/ToolCard';
import { tools, categories } from '@/config/tools';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  const categoryTools = tools.filter(t => t.category === params.slug);

  const breadcrumbItems = [
    { name: '首页', href: '/' },
    { name: category.name }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}工具大全</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        {/* Tools Grid */}
        {categoryTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <span className="text-6xl mb-4 block">🔧</span>
            <p className="text-gray-600">该分类下暂无工具</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    return {
      title: '分类未找到 | GlobalTradeHub',
      description: '分类未找到'
    };
  }

  return {
    title: `${category.name}工具大全 - 跨境电商工具 |
// src/app/category/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ToolCard from '@/components/ToolCard';
import { tools, categories } from '@/config/tools';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  const categoryTools = tools.filter(t => t.category === params.slug);

  const breadcrumbItems = [
    { name: '首页', href: '/' },
    { name: category.name }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}工具大全</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        {/* Tools Grid */}
        {categoryTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <span className="text-6xl mb-4 block">🔧</span>
            <p className="text-gray-600">该分类下暂无工具</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    return {
      title: '分类未找到 | GlobalTradeHub',
      description: '分类未找到'
    };
  }

  return {
    title: `${category.name}工具大全 - 跨境电商工具 |
// src/app/category/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ToolCard from '@/components/ToolCard';
import { tools, categories } from '@/config/tools';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  const categoryTools = tools.filter(t => t.category === params.slug);

  const breadcrumbItems = [
    { name: '首页', href: '/' },
    { name: category.name }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}工具大全</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        {/* Tools Grid */}
        {categoryTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <span className="text-6xl mb-4 block">🔧</span>
            <p className="text-gray-600">该分类下暂无工具</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    return {
      title: '分类未找到 | GlobalTradeHub',
      description: '分类未找到'
    };
  }

  return {
    title: `${category.name}工具大全 - 跨境电商工具 |
// src/app/page.tsx
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { categories, tools, platforms } from '@/config/tools';

export default function Home() {
  const hotTools = tools.slice(0, 6);
  const regionalPlatforms = [
    { region: '拉美区域', platforms: platforms.filter(p => p.region === '拉美') },
    { region: '俄罗斯 & 东欧', platforms: platforms.filter(p => p.region === '俄罗斯') },
    { region: '东南亚', platforms: platforms.filter(p => p.region === '东南亚') },
    { region: '欧美综合', platforms: platforms.filter(p => p.region === '欧美') },
    { region: '全球', platforms: platforms.filter(p => p.region === '全球') },
  ];

  const faqs = [
    {
      question: '所有工具都是免费的吗？',
      answer: '是的，GlobalTradeHub 提供的所有工具均完全免费使用，无需注册或付费。'
    },
    {
      question: '数据安全吗？',
      answer: '非常安全！所有工具均在浏览器本地运行，数据不上传服务器，保护您的商业隐私。'
    },
    {
      question: '支持哪些平台？',
      answer: '目前支持美客多、Ozon、Shopee、亚马逊、TikTok Shop、Wildberries等20+跨境平台。'
    },
    {
      question: '如何获取帮助？',
      answer: '您可以通过页脚的联系方式与我们取得联系，或查看帮助中心获取使用指南。'
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                跨境电商卖家专属
                <span className="text-primary block mt-2">在线工具箱</span>
              </h1>
              <p className="text-lg text-text-secondary mb-8 max-w-xl">
                一站式解决美客多/OZON/Shopee/亚马逊等全球跨境平台运营效率问题
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                <span className="px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium">
                  ✅ 免费使用
                </span>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  🚀 在线即用
                </span>
                <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                  🔒 数据安全
                </span>
              </div>
              <Link 
                href="/category/product-analysis"
                className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
              >
                立即开始使用
                <span className="ml-2">→</span>
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🛠️</div>
                    <p className="text-text-secondary">20+ 实用工具</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-success/20 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-xl">📊</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">工具分类</h2>
            <p className="text-text-secondary">根据您的需求选择工具类别</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group p-4 bg-bg-light rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
              >
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-xs text-text-light group-hover:text-white/70">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Tools Section */}
      <section className="py-16 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">热门工具</h2>
            <p className="text-text-secondary">最受欢迎的跨境电商工具</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tool/${tool.slug}`}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-border hover:border-primary"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="text-2xl">{tool.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                      {tool.content.intro.substring(0, 60)}...
                    </p>
                    <span className="inline-flex items-center text-sm text-primary">
                      立即使用
                      <span className="ml-1">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Zones Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">按平台选择</h2>
            <p className="text-text-secondary">根据您运营的平台选择专属工具</p>
          </div>
          {regionalPlatforms.map((regionGroup) => (
            <div key={regionGroup.region} className="mb-8">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full"></span>
                {regionGroup.region}
              </h3>
              <div className="flex flex-wrap gap-3">
                {regionGroup.platforms.map((platform) => (
                  <Link
                    key={platform.slug}
                    href={`/platform/${platform.slug}`}
                    className="px-4 py-2 bg-bg-light rounded-lg hover:bg-primary hover:text-white transition-all duration-300 text-sm"
                  >
                    {platform.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-bg-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">卖家常见问题</h2>
            <p className="text-text-secondary">解答您最关心的问题</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-bg-light transition-colors">
                    <span className="font-medium text-text-primary">{faq.question}</span>
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-open:rotate-180 transition-transform">
                      <span className="text-primary">▼</span>
                    </span>
                  </summary>
                  <div className="px-4 pb-4 text-text-secondary">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

│       └── 立即使用按钮
├── 平台专区入口
│   ├── 标题：按平台选择
│   ├── 拉美区域（2个）
│   │   ├── Mercado Libre 美客多
│   │   └── Americanas
│   ├── 俄罗斯 & 东欧区域（3个）
│   │   ├── Ozon
│   │   ├── Wildberries 野莓
│   │   └── Yandex Market
│   ├── 东南亚区域（5个）
│   │   ├── Shopee 虾皮
│   │   ├── Lazada 来赞达
│   │   ├── Tokopedia
│   │   ├── Tiki
│   │   └── Akulaku
│   ├── 欧美综合平台（3个）
│   │   ├── Amazon 亚马逊
│   │   ├── Walmart 沃尔玛
│   │   └── eBay
│   ├── 内容 & 全托管平台（4个）
│   │   ├── TikTok Shop
│   │   ├── AliExpress 速卖通
│   │   ├── TEMU 拼多多
│   │   └── SHEIN
│   └── B2B 批发平台（3个）
│       ├── 阿里巴巴国际站
│       ├── 敦煌网 DHgate
│       └── Made-in-China 中国制造网
├── 卖家常见问题FAQ
│   ├── 标题：卖家常见问题
│   └── 3-5个问答折叠面板
└── 页脚
    ├── 关于我们
    ├── 快速链接
    ├── 联系方式
    └── 版权信息
```

#### 页面功能说明

- 网站入口页，承担品牌展示和导航分流作用

- 通过工具分类、热门工具、平台专区三个维度引导用户找到目标工具

- FAQ 板块承接问答型搜索流量，提升 SEO 效果

- 首屏突出核心价值主张，降低用户跳出率

- **前台页面不展示任何管理后台入口**

---

### 4\.3 工具分类列表页（/category/\[category\-slug\]）

#### 页面框架图

```plaintext
工具分类列表页
├── 顶部导航栏（同首页）
├── 面包屑导航：首页 > 分类名称
├── 分类标题区
│   ├── H1：XX工具大全
│   └── 分类描述文字
├── 工具列表区
│   └── 工具卡片网格（3列）
│       ├── 工具图标
│       ├── 工具名称
│       ├── 工具简介
│       └── 立即使用按钮
└── 页脚
```

#### 页面功能说明

- 按功能分类聚合工具，方便用户按类别浏览

- 承担分类关键词排名的 SEO 作用

- 每个分类独立 URL、独立 TDK，提升收录和排名

---

### 4\.4 工具详情页（/tool/\[tool\-slug\]）【SEO 核心页面】

#### 页面框架图

```plaintext
工具详情页
├── 顶部导航栏（同首页）
├── 面包屑导航：首页 > 分类名称 > 工具名称
├── H1主标题：工具全称
├── 工具介绍段落（100-200字）
├── 工具功能面板区
│   └── 具体工具的交互操作区域
├── 使用教程板块
│   ├── H2：XX使用教程
│   └── 分步图文说明
├── 常见问题FAQ板块
│   ├── H2：常见问题
│   └── 3-5个问答
├── 相关工具推荐
│   ├── H2：相关工具推荐
│   └── 4个同类型工具卡片
└── 页脚
```

#### 页面功能说明

- **SEO 核心页面**：每个工具独立 URL、独立 TDK、独立内容

- 承担长尾关键词排名作用，是自然搜索流量的主要来源

- 页面内容丰富（介绍 \+ 教程 \+ FAQ），提升搜索引擎收录权重

- 相关工具推荐增加站内链接密度，提升用户停留时间

---

### 4\.5 平台专区页（/platform/\[platform\-slug\]）

#### 页面框架图

```plaintext
平台专区页
├── 顶部导航栏（同首页）
├── 面包屑导航：首页 > 平台名称
├── 平台标题区
│   ├── H1：XX卖家工具大全
│   ├── 平台介绍
│   └── 平台Logo
├── 平台专属工具区
│   └── 该平台常用工具卡片列表
├── 平台运营干货
│   └── 相关运营文章推荐
└── 页脚
```

#### 页面功能说明

- 按平台维度聚合工具，精准匹配不同平台卖家需求

- 覆盖拉美、俄罗斯东欧、东南亚、欧美、内容电商、B2B 批发六大区域共 20 \+ 跨境平台

- 承担平台类关键词排名（如 "美客多卖家工具"、"Ozon 运营工具"）

- 平台 \+ 工具的组合，提升用户转化率

- 每个平台独立专区页，独立 TDK，独立 SEO 优化

---

### 4\.6 跨境干货页（/blog）

#### 页面框架图

```plaintext
跨境干货页
├── 顶部导航栏（同首页）
├── 面包屑导航：首页 > 跨境干货
├── H1：跨境电商运营干货
├── 文章分类标签
├── 文章列表
│   └── 文章卡片
│       ├── 封面图
│       ├── 文章标题
│       ├── 摘要
│       ├── 发布时间
│       └── 阅读量
├── 分页
└── 页脚
```

#### 页面功能说明

- 内容营销板块，通过干货文章吸引流量

- 提升网站内容丰富度，增加搜索引擎收录

- 建立专业形象，提升用户信任度

---

### 4\.7 政策合规章（/policy）

#### 页面框架图

```plaintext
政策合规章
├── 顶部导航栏（同首页）
├── 面包屑导航：首页 > 政策合规
├── H1：跨境电商政策合规指南
├── 政策分类导航
│   ├── 拉美平台政策
│   │   ├── 美客多政策
│   │   └── Americanas 政策
│   ├── 俄罗斯 & 东欧平台政策
│   │   ├── Ozon 政策
│   │   ├── Wildberries 政策
│   │   └── Yandex Market 政策
│   ├── 东南亚平台政策
│   │   ├── Shopee 政策
│   │   ├── Lazada 政策
│   │   ├── Tokopedia 政策
│   │   ├── Tiki 政策
│   │   └── Akulaku 政策
│   ├── 欧美平台政策
│   │   ├── 亚马逊政策
│   │   ├── 沃尔玛政策
│   │   └── eBay 政策
│   ├── 内容 & 全托管平台政策
│   │   ├── TikTok Shop 政策
│   │   ├── 速卖通政策
│   │   ├── TEMU 政策
│   │   └── SHEIN 政策
│   ├── B2B 平台政策
│   │   ├── 阿里国际站政策
│   │   ├── 敦煌网政策
│   │   └── 中国制造网政策
│   ├── 税务合规
│   └── 知识产权
├── 政策内容列表
└── 页脚
```

#### 页面功能说明

- 汇总各平台政策和合规要求

- 吸引政策类搜索流量

- 提升网站专业度和实用性

---

### 4\.8 采购代办页（/sourcing）

#### 页面框架图

```plaintext
采购代办页
├── 顶部导航栏（同首页）
├── 面包屑导航：首页 > 采购代办
├── H1：跨境电商采购代办服务
├── 服务介绍区
├── 服务流程
├── 服务优势
├── 咨询表单/联系方式
└── 页脚
```

#### 页面功能说明

- 增值服务页面，对接采购需求

- B 端转化入口，提升客单价

- 丰富网站服务矩阵

---

### 4\.9 联盟工具页（/affiliate）

#### 页面框架图

```plaintext
联盟工具页
├── 顶部导航栏（同首页）
├── 面包屑导航：首页 > 联盟工具
├── H1：跨境电商联盟营销工具
├── 联盟平台介绍
├── 联盟工具列表
├── 联盟营销教程
└── 页脚
```

#### 页面功能说明

- 联盟营销相关工具和教程聚合

- 对接美客多联盟、亚马逊联盟等多平台变现渠道

- 吸引联盟营销从业者流量

---

### 4\.10 用户交流页（/community）

#### 页面框架图

```plaintext
用户交流页
├── 顶部导航栏（同首页）
├── 面包屑导航：首页 > 用户交流
├── H1：跨境卖家交流社区
├── 板块分类
│   ├── 运营交流
│   ├── 选品讨论
│   ├── 问题求助
│   └── 经验分享
├── 帖子列表
├── 发帖按钮（需登录）
└── 页脚
```

#### 页面功能说明

- 卖家交流社区，提升用户粘性

- UGC 内容，持续增加网站内容

- 提升用户留存和回访率

---

### 4\.11 关于我们页（/about）

#### 页面框架图

```plaintext
关于我们页
├── 顶部导航栏（同首页）
├── 面包屑导航：首页 > 关于我们
├── H1：关于 GlobalTradeHub
├── 网站介绍
├── 我们的优势
├── 联系我们
├── 友情链接
└── 页脚
```

#### 页面功能说明

- 提升网站可信度和专业形象

- 友情链接交换入口

- 联系方式展示

---

## 五、SEO 架构设计

### 5\.1 核心原则

**一个工具 = 独立 URL \+ 独立 TDK \+ 独立关键词 \+ 独立内容**

对标 \[tool\.lu\]\(tool\.lu\) 流量逻辑，靠海量工具长尾关键词获取自然搜索流量。

### 5\.2 路由结构

```plaintext
/                          # 首页（核心词排名）
/category/[category-slug]  # 分类列表页（分类词排名）
/tool/[tool-slug]          # 工具详情页（长尾词排名，SEO核心）
/platform/[platform-slug]  # 平台专区页（平台词排名）
/blog                      # 干货文章页（内容流量）
/about                     # 关于页（可信度）
/sitemap.xml               # 站点地图（爬虫入口）
/robots.txt                # 爬虫规则
```

### 5\.3 TDK 规范

| 页面类型 | Title 格式                 | 示例                                         |                |
| -------- | -------------------------- | -------------------------------------------- | -------------- |
| 首页     | 品牌名 \+ 核心定位         | GlobalTradeHub \- 跨境电商卖家专属在线工具箱 |                |
| 分类页   | 分类名 \+ 大全 \+ 品牌     | 费用计算工具大全 \- 跨境电商费用计算器       | GlobalTradeHub |
| 工具页   | 工具名 \+ 功能描述 \+ 品牌 | 美客多费用计算器 \- 在线费用核算             | GlobalTradeHub |
| 平台页   | 平台名 \+ 卖家工具 \+ 品牌 | 美客多卖家工具大全 \- 跨境运营工具箱         | GlobalTradeHub |

### 5\.4 页面内容 SEO 规范

每个工具详情页必须包含：

1. **唯一 H1 标题**：包含核心关键词

2. **首段介绍**：100\-200 字，自然出现核心词 2\-3 次

3. **H2 小标题**：使用教程、常见问题等，植入长尾词

4. **FAQ 问答**：3\-5 条，承接问答型搜索流量

5. **相关工具内链**：4 个同类型工具，增加内链密度

6. **面包屑导航**：配合 Schema 结构化数据

### 5\.5 技术 SEO 配置

1. **sitemap\.xml**：自动生成，包含所有工具、分类、平台、文章页面

2. **robots\.txt**：配置抓取规则，指向 sitemap

3. **canonical 标签**：每个页面设置规范链接，防止重复内容

4. **结构化数据**：面包屑、工具页 Schema，提升搜索结果展示

5. **页面性能**：Lighthouse 跑分 ≥ 90 分，Core Web Vitals 达标

6. **移动端适配**：响应式设计，满足移动端优先索引

### 5\.6 内链体系

```plaintext
首页 → 分类页 → 工具详情页
  ↓       ↓          ↓
平台页 → 工具页 ← 相关工具推荐
  ↑                ↑
  └──── 文章页 ────┘
```

- 首页链接到所有分类和热门工具

- 分类页链接到该分类下所有工具

- 工具页互相链接（相关工具推荐）

- 文章页链接到对应工具和分类

- 所有页面链回首页

---

## 六、技术栈说明

### 6\.1 前端技术栈

| 技术 | 选型                                        | 说明                   |
| ---- | ------------------------------------------- | ---------------------- |
| 框架 | Next\.js 14\+ App Router                    | 支持 SSR/SSG，SEO 友好 |
| 语言 | TypeScript                                  | 类型安全，提升开发效率 |
| 样式 | Tailwind CSS                                | 快速开发，响应式友好   |
| 部署 | Cloudflare Pages                            | 全球 CDN，访问速度快   |
| 域名 | [melitoolhub\.com](https://melitoolhub.com) | 主域名                 |

### 6\.2 目录结构

```plaintext
src/
├── app/
│   ├── page.tsx                  # 首页
│   ├── layout.tsx                # 全局布局
│   ├── sitemap.ts                # 站点地图
│   ├── robots.ts                 # 爬虫规则
│   ├── category/[slug]/page.tsx  # 分类列表页
│   ├── tool/[slug]/page.tsx      # 工具详情页
│   ├── platform/[slug]/page.tsx  # 平台专区页
│   ├── blog/page.tsx             # 跨境干货
│   ├── policy/page.tsx           # 政策合规
│   ├── sourcing/page.tsx         # 采购代办
│   ├── affiliate/page.tsx        # 联盟工具
│   ├── community/page.tsx        # 用户交流
│   ├── about/page.tsx            # 关于我们
│   └── admin/                    # 管理后台（仅管理员可访问）
│       ├── login/page.tsx        # 管理员登录
│       ├── dashboard/page.tsx    # 访客总览
│       ├── source/page.tsx       # 来源分析
│       ├── country/page.tsx      # 国别监控
│       ├── tags/page.tsx         # 机构/个人标签
│       ├── leads/page.tsx        # 留联台账
│       └── settings/page.tsx     # 系统设置
├── config/
│   └── tools.ts                  # 工具配置（含SEO字段）
├── components/
│   ├── Navbar.tsx                # 导航栏
│   ├── Footer.tsx                # 页脚
│   ├── Breadcrumb.tsx            # 面包屑
│   ├── ToolCard.tsx              # 工具卡片
│   ├── CategoryCard.tsx          # 分类卡片
│   ├── RelatedTools.tsx          # 相关工具
│   └── admin/                    # 后台专属组件
│       ├── AdminLayout.tsx       # 后台布局
│       ├── AdminSidebar.tsx      # 后台侧边栏
│       └── DataChart.tsx         # 数据图表组件
├── types/
│   └── tool.ts                   # 类型定义
├── hooks/
│   └── useAuth.ts                # 管理员权限校验
└── tools/                        # 具体工具组件
    ├── profit-calculator/
    ├── rate-converter/
    └── ...
```

### 6\.3 工具配置数据结构

```typescript
interface ToolItem {
  slug: string; // 路由唯一标识
  name: string; // 工具名称
  category: string; // 分类slug
  categoryName: string; // 分类名称
  platform?: string[]; // 适用平台
  seo: {
    title: string; // 页面标题
    keywords: string; // 关键词
    description: string; // 页面描述
    h1Text: string; // H1标题
  };
  content: {
    intro: string; // 工具介绍
    tutorial: string[]; // 使用教程
    faq: {
      // 常见问题
      question: string;
      answer: string;
    }[];
  };
}
```

---

## 七、产品 DEMO 展示规范

### 7\.1 DEMO 整体结构

```plaintext
GlobalTradeHub 产品 DEMO
├── 前台用户端（6个页面，普通访客可见）
│   ├── 首页
│   ├── 工具详情页
│   ├── 平台专区
│   ├── 跨境干货
│   ├── 政策合规
│   └── 联盟工具
└── 管理后台（6个页面，仅管理员可见，前台无入口）
    ├── 访客总览
    ├── 来源分析
    ├── 国别监控
    ├── 机构/个人标签
    ├── 留联台账
    └── 系统设置
```

### 7\.2 DEMO 视觉规范

#### 7\.2\.1 前台用户端视觉风格

- **主色调**：深海蓝 \#0F52BA

- **辅助色**：浅蓝、白色卡片、浅灰分割线

- **整体风格**：跨境商务极简风、干净留白、国际化外贸工具网站质感

- **卡片样式**：圆角卡片、简约线性图标、轻微阴影

- **适用场景**：工具使用、内容浏览、用户操作

#### 7\.2\.2 管理后台视觉风格

- **主色调**：深灰 \+ 深蓝深色看板底色

- **数据色**：浅蓝、绿色、橙色数据图表

- **整体风格**：专业数据看板、深色商务风

- **布局**：左侧固定侧边导航 \+ 右侧内容区

- **适用场景**：数据监控、访客分析、台账管理

- **权限标识**：后台页面顶部标注「仅管理员可见」

### 7\.3 前台用户端 DEMO 页面说明

#### 页面 1：首页 DEMO

```plaintext
首页 DEMO 展示要点
├── 顶部导航栏完整展示
├── 首屏Banner（H1 + 副标题 + 卖点标签）
├── 6大工具分类卡片
├── 热门工具6宫格
├── 六大区域平台专区入口
├── 卖家FAQ折叠面板
└── 标准页脚
```

**展示目的**：呈现网站整体品牌调性、导航结构、核心功能入口

#### 页面 2：工具详情页 DEMO

```plaintext
工具详情页 DEMO 展示要点
├── 面包屑导航
├── H1主标题
├── 工具介绍段落
├── 工具操作面板（静态展示）
├── 使用教程板块
├── FAQ问答板块
└── 相关工具推荐
```

**展示目的**：呈现 SEO 核心页面结构、工具交互区域、内容丰富度

#### 页面 3：平台专区页 DEMO

```plaintext
平台专区页 DEMO 展示要点
├── 平台标题区（名称 + 简介 + Logo）
├── 平台专属工具卡片列表
└── 平台运营干货推荐
```

**展示目的**：呈现平台维度工具聚合方式、精准匹配卖家需求

#### 页面 4：跨境干货页 DEMO

```plaintext
跨境干货页 DEMO 展示要点
├── 文章分类标签栏
├── 多列文章卡片（封面 + 标题 + 摘要）
└── 分页控件
```

**展示目的**：呈现内容营销板块、文章列表布局

#### 页面 5：政策合规章 DEMO

```plaintext
政策合规页 DEMO 展示要点
├── 左侧政策分类树
└── 右侧政策内容卡片
```

**展示目的**：呈现多平台政策聚合、专业合规形象

#### 页面 6：联盟工具页 DEMO

```plaintext
联盟工具页 DEMO 展示要点
├── 联盟营销介绍板块
├── 多平台联盟工具卡片
└── 联盟收益说明
```

**展示目的**：呈现联盟变现工具、商业化路径

### 7\.4 管理后台 DEMO 页面说明

> **重要**：以下所有后台页面 DEMO 仅用于内部演示，前台用户完全不可见

#### 后台 1：访客总览 DEMO

```plaintext
访客总览 DEMO 展示要点
├── 左侧后台导航菜单
├── 顶部管理员信息栏
├── 核心指标卡片（4个）
│   ├── 总访问UV
│   ├── 机构访客占比
│   ├── 个人访客占比
│   └── 线索留联总量
├── 近30天访问趋势折线图
└── 全球访客分布热力图
```

**展示目的**：呈现全局数据概览、核心指标可视化

#### 后台 2：来源分析 DEMO

```plaintext
来源分析 DEMO 展示要点
├── 渠道来源饼图
│   ├── 谷歌
│   ├── Yandex
│   ├── TikTok
│   ├── 外链站点
│   └── 直访
├── 各渠道留联转化率对比柱状图
└── 来源域名明细表格
```

**展示目的**：呈现流量来源渠道、转化效果分析

#### 后台 3：国别监控 DEMO

```plaintext
国别监控 DEMO 展示要点
├── 各国访问量排名表格
├── 六大区域流量统计卡片
└── 高危访问IP告警面板
```

**展示目的**：呈现全球访客地域分布、区域业务分析

#### 后台 4：机构 / 个人标签 DEMO

```plaintext
机构/个人标签 DEMO 展示要点
├── 双栏对比布局
│   ├── 企业机构访客数据
│   └── 个人卖家访客数据
├── IP类型筛选模块
└── 批量访客标签列表
```

**展示目的**：呈现访客身份智能判定、精准客户分层

#### 后台 5：留联台账 DEMO

```plaintext
留联台账 DEMO 展示要点
├── 全量访客明细表格
│   ├── 来访国家
│   ├── 来源站点
│   ├── 访客类型（机构/个人）
│   ├── 联系方式
│   ├── 意向平台
│   └── 访问时间
├── 筛选条件栏
└── 导出台账按钮
```

**展示目的**：呈现访客联系方式归集、销售跟进台账

#### 后台 6：系统设置 DEMO

```plaintext
系统设置 DEMO 展示要点
├── 数据采集合规配置
├── Cookie授权开关
├── 黑名单IP管理
├── 账号权限管理
└── 多语种隐私文案配置
```

**展示目的**：呈现后台配置能力、合规管控功能

---

## 八、管理后台权限强约束

### 8\.1 可见权限划分

| 用户角色             | 前台页面    | 管理后台      | 访客数据    | 留联台账    |
| -------------------- | ----------- | ------------- | ----------- | ----------- |
| 普通访客（未登录）   | ✅ 全部可见 | ❌ 完全不可见 | ❌ 不可见   | ❌ 不可见   |
| 注册卖家（普通用户） | ✅ 全部可见 | ❌ 完全不可见 | ❌ 不可见   | ❌ 不可见   |
| 管理员               | ✅ 全部可见 | ✅ 全部可见   | ✅ 全部可见 | ✅ 全部可见 |

#### 权限说明

- **普通访客 / 注册卖家**：仅可访问前台全部页面（首页、工具、平台专区、干货、政策、采购代办、联盟、社区、关于），**完全看不到数据监控后台任何入口、菜单、页面**

- **管理员账号**：登录后才可进入独立管理后台，拥有全部访客数据监控查看、导出、配置权限

### 8\.2 入口隔离规则

#### 8\.2\.1 前台无任何后台入口

- 前台主导航、侧边栏、页脚、悬浮按钮**不放置任何后台访问入口**

- 前台页面不出现「管理后台」「数据监控」「后台登录」等文字

- 普通用户登录后仅展示个人中心（收藏、使用历史），无后台入口

#### 8\.2\.2 后台独立入口

- 后台仅通过独立管理员登录路由 `/admin/login` 进入

- 后台登录页不展示网站前台导航，独立设计

- 管理员登录成功后跳转至 `/admin/dashboard`

### 8\.3 数据隔离规则

- 前台页面不展示任何全站访客统计、国别流量、线索台账等全局监控数据

- 仅管理员后台可视化展示全量访客监控信息

- 访客留联数据加密存储，仅管理员可查看和导出

### 8\.4 路由权限拦截

#### 8\.4\.1 未登录拦截

- 未登录管理员账号直接访问 `/admin/*` 路由，自动 301 重定向至网站首页

- 普通卖家账号登录后访问 `/admin/*` 路由，自动 301 重定向至用户个人中心

#### 8\.4\.2 权限校验机制

```plaintext
管理员权限校验流程
├── 1. 用户访问 /admin/* 路由
├── 2. 检查是否登录
│   └── 未登录 → 重定向至首页
├── 3. 检查用户角色
│   └── 非管理员 → 重定向至首页/个人中心
├── 4. 校验管理员Token
│   └── Token无效 → 清除登录态，重定向首页
└── 5. 校验通过 → 正常访问后台页面
```

### 8\.5 技术实现方案

#### 8\.5\.1 前端权限拦截

- 使用 Next\.js Middleware 在服务端进行路由权限校验

- 管理员页面使用 `useAuth` Hook 进行前端权限二次校验

- 后台 API 接口全部进行管理员权限校验

#### 8\.5\.2 管理员账号管理

- 管理员账号不在前台注册入口开放，仅后台创建

- 支持多级管理员角色（超级管理员、数据管理员、运营管理员）

- 登录日志记录，异常登录告警

---

## 九、全站访客数据监控系统

### 9\.1 可行性结论

**完全可实现**：合规前提下，实现【访客来源站点 \+ 来访国家 \+ 访客身份（机构 / 个人）\+ 访客主动留联路径 \+ 被动溯源信息】全维度监控；区分合规采集、违规采集边界，适配美客多 / 俄罗斯 / 东南亚 / 欧美全球站点合规法律，规避跨境数据违法风险，适配现有 Next\.js 站点改造开发。

### 9\.2 监控核心采集维度（全字段）

1. **来源维度**：来访域名 / 外链站点 / 搜索引擎 / 社媒渠道 / 直访 / 平台跳转（TikTok/Shopee/ 谷歌 / 百度 / 跨境论坛）

2. **国别维度**：精准国家 / 城市 / 运营商 / 访问时区，适配六大跨境业务区域

3. **身份判定**：自动区分【个人访客】\&【机构企业访客】，附带判定依据

4. **联系路径**：被动溯源访客公开联系方式 \+ 主动预埋留联触点，双向归集

5. **行为数据**：访问页面、停留时长、工具使用记录、平台专区浏览偏好、IP 画像

### 9\.3 合法数据源清单

#### 9\.3\.1 自有站点原生数据源（最高精准、合规可控）

- 网站服务端访问日志：Cloudflare 全站访问日志、服务器 Nginx 访问日志（核心数据源）

- 前端埋点 SDK 行为日志：页面点击、工具使用、表单提交、跳转退出行为

- 站点 Cookie / 本地存储合规会话数据（匿名化 IP，符合全球隐私法）

#### 9\.3\.2 第三方合规溯源数据源（跨境专用，无违规爬取）

- Cloudflare IP 库：全球 IP 国别、AS 运营商、机房属性库（区分企业机房 / 个人宽带）

- 域名备案 / 企业 WHOIS 公开库：判定机构主体、企业官网、企业邮箱

- 搜索引擎 Referrer 溯源库：谷歌、Bing、百度、Yandex 来路溯源

- 社媒公开跳转溯源：TikTok、Facebook、VK、Instagram 外链来访溯源

#### 9\.3\.3 禁止数据源（红线，严禁接入）

- 非法浏览器指纹、第三方 Cookie 跨站窃取、明文 IP 存储（违反 GDPR/LGPD/PIPL）

- 爬虫抓取第三方平台用户私信、后台隐私数据

### 9\.4 来访国家覆盖范围（匹配业务六大区域）

1. **拉美核心国**：巴西、墨西哥、阿根廷、智利、哥伦比亚（适配美客多 / Americanas 卖家）

2. **俄东欧核心国**：俄罗斯、白俄罗斯、哈萨克斯坦（适配 Ozon/Wildberries）

3. **东南亚核心国**：印尼、越南、马来、泰国、菲律宾、新加坡（Shopee/Lazada 全域）

4. **欧美成熟国**：美国、英国、德国、法国、西班牙、加拿大、澳大利亚

5. **中东 / 非洲**：沙特、阿联酋、尼日利亚、肯尼亚

6. **国内来访**：中国大陆（国内跨境卖家、招商合作方来访）

### 9\.5 机构 / 个人访客智能判定规则

#### 9\.5\.1 判定为【机构 / 企业访客】判定标准

- **IP 归属**：企业专线、机房 IP、企业办公网段、跨境公司代理 IP

- **访问终端**：企业固定设备、企业域名邮箱登录、企业内网跳转来访

- **访问行为**：批量查询工具、高频平台专区访问、批量汇率换算 / 费用计算、多人同 IP 访问

- **来路站点**：跨境公司官网、企业后台、企业社群、服务商官网跳转

#### 9\.5\.2 判定为【个人访客】判定标准

- **IP 归属**：家用宽带、手机运营商 4G/5G、个人动态 IP

- **访问行为**：单点工具使用、短时浏览、个人查价、新手工具试用

- **来路**：个人抖音、个人 Facebook、个人搜索账号、个人收藏直访

### 9\.6 访客联系方式归集方案（双路径，合规留联）

#### 9\.6\.1 路径一：主动预埋留联（合规最优，可直接获取有效联系方式）

全站预埋低打扰留联触点，适配全球多语言，访客自愿填写，法律完全合规，归集联系方式：微信、WhatsApp、Telegram、邮箱、手机号、跨境店铺账号

1. 平台专区侧边悬浮留联入口（美客多 / Ozon / 亚马逊核心专区强制展示）

2. 高频工具使用完成弹窗：核算完成后弹窗【领取专属费率表→填写联系方式】

3. 博客干货、政策文章文末留联表单（领取合规资料留联）

4. 导航栏固定【对接咨询】入口，永久留存留联通道

#### 9\.6\.2 路径二：被动公开溯源（仅抓取公开外网联系方式，不窃取隐私）

- 机构访客：溯源企业公开官网、公示邮箱、公开客服 WhatsApp、企业 Telegram

- 来路外链：跳转来源站点公示的个人 / 商户社交账号

- 搜索引擎公开账号：访客搜索绑定公开社交账号（脱敏展示）

#### 9\.6\.3 隐私红线（必须执行）

欧盟、巴西、欧美访客：自动弹窗隐私授权弹窗，授权后才可采集；拒绝授权仅统计国别、来源，禁止抓取任何联系方式、身份信息。

### 9\.7 后台监控可视化功能规划

| 后台模块     | 核心监控字段                                    | 运营用途               |
| ------------ | ----------------------------------------------- | ---------------------- |
| 全域访客总览 | 来访国家、来源网站、访问量、机构 / 个人占比     | 区域业务投放、渠道择优 |
| 访客明细台账 | 访客标签、来源链接、国别、留联方式、浏览平台    | 销售对接、精准触达卖家 |
| 渠道溯源分析 | 谷歌 / Yandex/TikTok 等渠道引流质量、留联转化率 | SEO、投放渠道优化      |
| 国别告警面板 | 高危国家访问、恶意爬虫、批量刷访问 IP 拦截      | 站点安全防护、风控拦截 |

### 9\.8 技术落地架构（适配现有 Next\.js 站点，低成本改造）

1. **前端层**：新增合规授权组件、全局埋点 SDK、多语言留联组件、IP 匿名化处理代码

2. **服务端层**：对接 Cloudflare IP 解析接口、Referrer 来源存储、访客标签自动打分判定

3. **存储层**：独立访客数据表，区分公开数据 / 隐私留联数据，加密存储

4. **后台层**：新增【访客数据监控】专属后台菜单，支持筛选、导出、按平台筛选访客

### 9\.9 全球合规适配（适配全站跨境业务）

- **欧盟 GDPR**：IP 末段匿名、访客可一键清除个人数据、授权采集开关

- **巴西 LGPD**：巴西访客专属隐私弹窗，禁止静默抓取联系方式

- **国内 PIPL**：国内访客留联数据本地存储，不外流跨境服务器

- **俄联邦数据法**：俄罗斯访客数据留存本地节点，合规溯源

### 9\.10 开发优先级排期

1. **P1 紧急开发**：IP 国别判定、机构 / 个人标签、来源站点监控、合规授权弹窗

2. **P1 同步开发**：全站主动留联触点、后台访客台账导出功能

3. **P2 迭代开发**：公开联系方式被动溯源、国别流量可视化看板、恶意访问拦截

### 9\.11 可实现拓展能力

- 按平台筛选访客：仅查看美客多 / Ozon/Shopee 意向访客

- 留联自动推送：访客留联后即时推送至企业微信 / 邮箱

- 黑名单管控：拦截恶意爬虫、营销骚扰 IP，保护站点稳定访问

---

> 文档结束

> （注：部分内容可能由 AI 生成）
