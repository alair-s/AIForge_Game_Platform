<template>
  <nav class="navbar">
    <a href="http://intsig.com" class="logo"></a>

    <ul class="nav-menu">
      <li
          v-for="(item, index) in navItems"
          :key="item.id"
          class="nav-item"
          :class="{ active: item.isActive }"
          @mouseenter="handleMouseEnter(index)"
          @mouseleave="handleMouseLeave"
      >
        <a :href="item.href || 'javascript:;'" class="nav-link">
          {{ item.title }}
        </a>

        <!-- 下拉菜单 -->
        <div
            v-if="item.subMenu && showSubmenu === index"
            :class="['submenu-wrapper', item.subMenuClass]"
            @mouseenter="handleMouseEnter(index)"
            @mouseleave="handleMouseLeave"

        >
          <!-- 智能文字识别菜单 -->
          <template v-if="item.id === 'aiNav'">
            <a
                v-for="subItem in item.subMenu"
                :key="subItem.title"
                :class="['submenu-item', subItem.class]"
                :href="subItem.href"
                :target="subItem.target"
                :style="subItem.style"
            >
              <div class="submenu-title">{{ subItem.title }}</div>
              <div class="submenu-desc">{{ subItem.desc }}</div>
            </a>
          </template>

          <!-- 商业大数据菜单 -->
          <template v-if="item.id === 'bigdataNav'">
            <a
                v-for="subItem in item.subMenu"
                :key="subItem.title"
                :class="['submenu-item', subItem.class]"
                :href="subItem.href"
            >
              <div class="submenu-title">{{ subItem.title }}</div>
              <div class="submenu-desc">{{ subItem.desc }}</div>
            </a>
          </template>

          <!-- 解决方案菜单 -->
          <template v-if="item.id === 'solutionNav'">
            <div v-for="section in item.subMenu" :key="section.title" :class="['solution-section', section.class]">
              <div :class="['solution-section-title', section.titleClass]">
                {{ section.title }}
                <a
                    v-if="section.viewAllBtn"
                    :href="section.viewAllBtn.href"
                    target="_blank"
                    class="view-all-btn"
                >
                  {{ section.viewAllBtn.text }}
                  <img :src="section.viewAllBtn.icon" alt="" class="arrow-icon">
                </a>
              </div>
              <div :class="['solution-items', section.contentClass]">
                <component
                    :is="solutionItem.tag || 'a'"
                    v-for="(solutionItem, idx) in section.items"
                    :key="idx"
                    :class="['solution-item', solutionItem.class]"
                    :href="solutionItem.href"
                >
                  <span v-if="solutionItem.name" class="solution-name">{{ solutionItem.name }}</span>
                </component>
              </div>
            </div>
          </template>

          <!-- 明星产品菜单 -->
          <template v-if="item.id === 'starNav'">
            <div v-for="production in item.subMenu" :key="production.title" class="production-section">
              <div class="production-section-title">{{ production.title }}</div>
              <div class="production-items">
                <a
                    v-for="prod in production.items"
                    :key="prod.name"
                    class="production-item"
                    :href="prod.href"
                    :style="prod.style"
                >
                  <div :class="['production-image', prod.imageClass]"></div>
                  <div class="production-name">{{ prod.name }}</div>
                </a>
              </div>
            </div>
          </template>

          <!-- 关于合合信息菜单 -->
          <template v-if="item.id === 'heheNav'">
            <a
                v-for="subItem in item.subMenu"
                :key="subItem.title"
                :class="['submenu-item', subItem.class]"
                :href="subItem.href"
            >
              <div class="submenu-title">{{ subItem.title }}</div>
              <div class="submenu-desc">
                <p v-for="(desc, idx) in subItem.descList" :key="idx">{{ desc }}</p>
              </div>
            </a>
          </template>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const showSubmenu = ref(null)

const handleMouseEnter = (index) => {
  showSubmenu.value = index
}

const handleMouseLeave = () => {
  showSubmenu.value = null
}

const navItems = ref([
  {
    id: 'homeNav',
    title: '首页',
    href: '/',
    isActive: true
  },
  {
    id: 'aiNav',
    title: '智能文字识别',
    subMenuClass: 'submenu-320',
    subMenu: [
      {
        class: 'item-w33',
        href: 'https://www.intsig.com/public/textin/product/textin-scene.shtml',
        title: '场景智能文字识别引擎',
        desc: '国内外卡证、票据、行业单据等场景识别产品'
      },
      {
        class: 'item-w33',
        href: 'https://www.intsig.com/public/textin/product/textin-contract.shtml',
        title: '合同机器人',
        desc: '智能合同审阅平台'
      },
      {
        class: 'item-w33',
        href: 'https://www.intsig.com/public/textin/product/textin-text.shtml',
        title: '通用智能文字识别引擎',
        desc: '文本识别、表格识别及办公文档OCR识别产品'
      },
      {
        class: 'item-w33',
        href: 'https://www.intsig.com/public/textin/product/textin-image.shtml',
        title: '智能图像处理引擎',
        desc: '扫描件优化、切边增强、曲面矫正等智能图像处理'
      },
      {
        class: 'item-w33',
        href: 'https://b.intsig.com/ocr/textin_extract?from=PPintsig-daohang-pc-wdcq',
        target: '_blank',
        title: '智能文档抽取',
        desc: '在任意文档中获取你想要的内容'
      },
      {
        class: 'item-w33',
        href: 'https://b.intsig.com/ocr/textin_parse?from=PPintsig-daohang-pc-wdjx',
        target: '_blank',
        title: '通用文档解析',
        desc: '加速大模型的训练、开发、应用'
      }
    ]
  },
  {
    id: 'bigdataNav',
    title: '商业大数据',
    subMenuClass: 'submenu-280',
    subMenu: [
      {
        class: 'item-w50',
        href: 'https://www.intsig.com/public/solution-new/database.shtml',
        title: '企业数据库',
        desc: '采用先进的数据库设计技术，优质数据为企业机构用户在企业尽调、信用审核，风险监控，企业拓客，供应链管理，数据大屏等方面供应全面的数据支持'
      },
      {
        class: 'item-w50',
        href: 'https://www.intsig.com/public/solution-new/api.shtml',
        title: '企业数据API',
        desc: '覆盖多维度企业数据，以安全、稳定、灵活的调用体验服务诸多行业，如银行、证券、保险、地产、制造业、互联网、信息科技、政府机关等'
      },
      {
        class: 'item-w50',
        href: 'https://www.intsig.com/public/solution-new/standardization.shtml',
        title: '标准化数据服务应用',
        desc: '针对各行业企业适配的通用场景，提供标准化Saas应用平台，业务场景包含：智能商业调查｜风险监控｜合规管理｜营销拓客 | 智慧招商等，模块支持自由选择，灵活搭配'
      },
      {
        class: 'item-w50',
        href: 'https://www.intsig.com/public/solution-new/customization.shtml',
        title: '企业定制化服务',
        desc: '针对企业对应的行业场景，提供个性化定制应用，已为100+银行、券商、政府、集团等类型客户提供私有化解决方案，灵活支持多类定制及部署需求'
      }
    ]
  },
  {
    id: 'solutionNav',
    title: '解决方案',
    subMenuClass: 'submenu-280 solution-wrapper',
    subMenu: [
      {
        class: 'solution-main',
        title: '行业数字化解决方案',
        titleClass: 'digital-title',
        contentClass: 'solution-grid',
        viewAllBtn: {
          href: 'https://b.intsig.com/?from=PPintsig-daohang-pc-1',
          text: '查看全部',
          icon: './上海合合信息科技股份有限公司_人工智能及大数据科技企业，致力于自主研发的智能文字识别及商业大数据_files/arrow-right-0811.png'
        },
        items: [
          { name: '银行', href: 'https://www.intsig.com/solution/bank.shtml', class: '' },
          { name: '证券', href: 'https://www.intsig.com/solution/securities.shtml', class: '' },
          { name: '保险', href: 'https://www.intsig.com/solution/insurance.shtml', class: '' },
          { name: '政府园区', href: 'https://www.intsig.com/solution/government.shtml', class: '' },
          { name: '供应链', href: 'https://www.intsig.com/solution/supply-chains.shtml', class: '' }
        ]
      },
      {
        class: 'solution-other',
        title: '其他解决方案',
        contentClass: 'solution-grid',
        items: [
          { name: '生态合作', href: 'https://www.intsig.com/solution/env.shtml', class: '' },
          { name: '财务数字化', href: 'https://www.intsig.com/solution/finance.shtml', class: '' }
        ]
      }
    ]
  },
  {
    id: 'starNav',
    title: '明星产品',
    subMenuClass: 'submenu-220',
    subMenu: [
      {
        title: '个人产品',
        items: [
          {
            name: '名片全能王',
            href: 'https://www.intsig.com/personal-camcard',
            imageClass: 'production-image--cc'
          },
          {
            name: '扫描全能王',
            href: 'https://www.intsig.com/personal-camscanner',
            imageClass: 'production-image--cs'
          },
          {
            name: '启信宝',
            href: 'https://www.intsig.com/enterprise/qixinbao-new.shtml',
            imageClass: 'production-image--qxb'
          }
        ]
      },
      {
        title: '企业产品',
        items: [
          {
            name: '名片全能王企业版',
            href: 'https://www.intsig.com/enterprise/camcardbusiness.shtml',
            imageClass: 'production-image--ccb'
          },
          {
            name: '启信慧眼',
            href: 'https://www.intsig.com/enterprise/qx-huiyan.shtml',
            imageClass: 'production-image--qxhy'
          },
          {
            name: 'TextIn',
            href: 'https://www.textin.com/?from=HHintsig-tiyan',
            imageClass: 'production-image--textin'
          }
        ]
      }
    ]
  },
  {
    id: 'heheNav',
    title: '关于合合信息',
    href: 'https://www.intsig.com/about',
    subMenuClass: 'submenu-140',
    subMenu: [
      {
        class: 'item-w25',
        href: 'https://www.intsig.com/about',
        title: '公司简介',
        descList: ['公司简介、公司荣誉', '合合信息旗下多个智能产品']
      },
      {
        class: 'item-w25',
        href: 'https://www.intsig.com/recruit',
        title: '加入合合',
        descList: ['校园招聘、社会招聘', '合合文化']
      },
      {
        class: 'item-w25',
        href: 'https://www.intsig.com/contactus',
        title: '联系我们',
        descList: ['在线咨询、联系方式']
      },
      {
        class: 'item-w25',
        href: 'https://www.intsig.com/public/show/show-certificate.shtml',
        title: '安全中心',
        descList: ['安全与合规', '合合安全应急响应中心']
      }
    ]
  }
])
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 50px;
  background-color: #fff;
  box-shadow: 0 4px 6px -6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1000;
}

.logo {
  width: 214px;
  height: 32px;
  background: url(/img.png) no-repeat center;
  background-size: 100%;
  cursor: pointer;
  margin-left: 300px;
}

.logo-text {
  color: #1890ff;
  letter-spacing: 1px;
}

.company-name {
  font-size: 25px;
  color: #333;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 80px;
  margin-right: 400px;
}

.nav-item {
  position: relative;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 8px 0;
}

.nav-link {
  color: inherit;
  text-decoration: none;
  display: block;
}

.nav-item:hover {
  color: #1890ff;
}

.nav-item.active {
  color: #1890ff;
  font-weight: 500;
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #1890ff;
}

/* 下拉菜单样式 */
.submenu-wrapper {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  background: #fff;
  box-shadow: 0 4px 12px -9px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  min-width: 300px;
  z-index: 999;
}
.submenu-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  height: 20px;  /* 填充间隙 ,保证下拉继续监视鼠标飘*/
  background: transparent;
}
.submenu-320 {
  width: 800px;
}

.submenu-280 {
  width: 700px;
}

.submenu-220 {
  width: 600px;
}

.submenu-140 {
  width: 900px;
}

.submenu-item {
  padding: 15px;
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  color: #333;
  display: block;
}

.submenu-item:hover {
  background-color: #f5f5f5;
}

.item-w33 {
  width: calc(33.33% - 10px);
}

.item-w50 {
  width: calc(50% - 8px);
}

.item-w25 {
  width: calc(25% - 12px);
}

.submenu-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
}

.submenu-desc {
  font-size: 13px;
  color: #999;
  line-height: 1.5;
}

.submenu-desc p {
  margin: 4px 0;
}

/* 解决方案样式 */
.solution-wrapper {
  flex-direction: column;
}

.solution-section {
  width: 100%;
  margin-bottom: 20px;
}

.solution-section:last-child {
  margin-bottom: 0;
}

.solution-section-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.view-all-btn {
  font-size: 14px;
  color: #1890ff;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: normal;
}

.arrow-icon {
  width: 16px;
  height: 16px;
}

.solution-items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.solution-item {
  padding: 10px 20px;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: #333;
}

.solution-item:hover {
  background: #e6f7ff;
  color: #1890ff;
}

.solution-name {
  font-size: 14px;
}

/* 明星产品样式 */
.production-section {
  width: 100%;
  margin-bottom: 20px;
}

.production-section:last-child {
  margin-bottom: 0;
}

.production-section-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
}

.production-items {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.production-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-radius: 4px;
  transition: all 0.3s ease;
  text-decoration: none;
  color: #333;
  width: calc(33.33% - 10px);
}

.production-item:hover {
  background: #f5f5f5;
}

.production-image {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.production-image--cc {
  background-image: url('/img_3.png');
}

.production-image--cs {
  background-image: url('/img_2.png');
}

.production-image--qxb {
  background-image: url('/img_1.png');
}

.production-image--ccb {
  background-image: url('/img_4.png');
}

.production-image--qxhy {
  background-image: url('/img_5.png');
}

.production-image--textin {
  background-image: url('/img_6.png');
}

.production-name {
  font-size: 14px;
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    padding: 15px 20px;
  }



  .nav-menu {
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 15px;
    margin-right: 0;
    justify-content: center;
  }

  .submenu-wrapper {
    left: 0;
    transform: none;
    width: 100% !important;
  }

  .item-w33,
  .item-w50,
  .item-w25 {
    width: 100%;
  }

  .production-item {
    width: 100%;
  }
}
</style>
