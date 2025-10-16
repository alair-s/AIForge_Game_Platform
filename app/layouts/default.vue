<template>
  <nav class="navbar">
    <a href="http://.com" class="logo"></a>

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
          <!-- 前端框架菜单 -->
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

          <!-- 前端工具链菜单 -->
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

          <!-- 行业解决方案菜单 -->
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

          <!-- 核心产品菜单 -->
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

          <!-- 关于前端公司菜单 -->
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
    title: '前端框架',
    subMenuClass: 'submenu-320',
    subMenu: [
      {
        class: 'item-w33',
        href: '',
        title: 'Vue 生态解决方案',
        desc: 'Vue 3 项目搭建、组件库开发、状态管理完整落地方案'
      },
      {
        class: 'item-w33',
        href: '',
        title: 'React 技术体系',
        desc: 'React 18+  Hooks 最佳实践、SSR 服务端渲染方案'
      },
      {
        class: 'item-w33',
        href: '',
        title: 'Angular 企业级应用',
        desc: 'Angular 17+ 模块化开发、国际化与权限管理方案'
      },
      {
        class: 'item-w33',
        href: '',
        title: '跨端框架实践',
        desc: 'Taro/Uniapp 多端适配、Electron 桌面应用开发'
      },
      {
        class: 'item-w33',
        href: '',
        target: '_blank',
        title: '微前端架构',
        desc: '基于 qiankun/garfish 的微前端拆分与集成方案'
      },
      {
        class: 'item-w33',
        href: '',
        target: '_blank',
        title: '低代码平台',
        desc: '可视化拖拽组件、自定义表单与流程设计器开发'
      }
    ]
  },
  {
    id: 'bigdataNav',
    title: '前端工具链',
    subMenuClass: 'submenu-280',
    subMenu: [
      {
        class: 'item-w50',
        href: '',
        title: '工程化构建工具',
        desc: 'Webpack/Vite 性能优化、按需加载配置、多环境打包策略，提升项目构建效率'
      },
      {
        class: 'item-w50',
        href: '',
        title: '代码质量保障',
        desc: 'ESLint/Prettier 规范配置、Git Hooks 提交校验、Jest/Cypress 自动化测试'
      },
      {
        class: 'item-w50',
        href: '',
        title: 'API 管理工具',
        desc: 'Swagger/Postman 接口文档生成、Mock 数据模拟、接口联调解决方案'
      },
      {
        class: 'item-w50',
        href: '',
        title: '性能监控平台',
        desc: '基于 Lighthouse/Performance API 的前端性能监控、错误上报与分析平台'
      }
    ]
  },
  {
    id: 'solutionNav',
    title: '行业解决方案',
    subMenuClass: 'submenu-280 solution-wrapper',
    subMenu: [
      {
        class: 'solution-main',
        title: '垂直领域解决方案',
        titleClass: 'digital-title',
        contentClass: 'solution-grid',
        viewAllBtn: {
          href: 'https://b..com/?from=PP-daohang-pc-1',
          text: '查看全部',
          icon: ''
        },
        items: [
          { name: '电商前端', href: 'com/solution/bank.shtml', class: '' },
          { name: '后台管理', href: 'com/solution/securities.shtml', class: '' },
          { name: '移动端H5', href: 'com/solution/insurance.shtml', class: '' },
          { name: '数据可视化', href: 'com/solution/government.shtml', class: '' },
          { name: '智能表单', href: 'com/solution/supply-chains.shtml', class: '' }
        ]
      },
      {
        class: 'solution-other',
        title: '增值服务方案',
        contentClass: 'solution-grid',
        items: [
          { name: '技术培训', href: 'com/solution/env.shtml', class: '' },
          { name: '项目外包', href: 'com/solution/finance.shtml', class: '' }
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
        title: '基础',
        items: [
          {
            name: 'js',
            href: 'com/personal-camcard',
            imageClass: 'production-image--cc'
          },
          {
            name: 'H5',
            href: 'com/personal-camscanner',
            imageClass: 'production-image--cs'
          },
          {
            name: 'css',
            href: 'com/enterprise/qixinbao-new.shtml',
            imageClass: 'production-image--qxb'
          }
        ]
      },
      {
        title: '进阶',
        items: [
          {
            name: 'vue',
            href: 'com/enterprise/camcardbusiness.shtml',
            imageClass: 'production-image--ccb'
          },
          {
            name: 'react',
            href: 'com/enterprise/qx-huiyan.shtml',
            imageClass: 'production-image--qxhy'
          },
          {
            name: 'TS',
            href: 'https://www.textin.com/?from=HH-tiyan',
            imageClass: 'production-image--textin'
          }
        ]
      }
    ]
  },
  {
    id: 'heheNav',
    title: '关于企业官网',
    href: 'com/about',
    subMenuClass: 'submenu-140',
    subMenu: [
      {
        class: 'item-w25',
        href: 'com/about',
        title: '公司简介',
        descList: ['公司简介、公司荣誉', '企业官网旗下多个智能产品']
      },
      {
        class: 'item-w25',
        href: 'com/recruit',
        title: '加入企业',
        descList: ['校园招聘、社会招聘', '企业文化']
      },
      {
        class: 'item-w25',
        href: 'com/contactus',
        title: '联系我们',
        descList: ['在线咨询、联系方式']
      },
      {
        class: 'item-w25',
        href: 'com/public/show/show-certificate.shtml',
        title: '安全中心',
        descList: ['安全与合规', '企业安全应急响应中心']
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
