<template>
  <div class="fade-in">
    <div class="bg-white rounded-xl shadow-md p-6 mb-10 max-w-2xl mx-auto">
      <h2 class="text-2xl md:text-3xl font-bold text-center text-blue-900">核心产品</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      <UiProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
      />

    </div>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: number
  title: string
  description: string
  icon: string
}

const products: Product[] = [
  {
    id: 1,
    title: '通用前端脚手架',
    description: '支持Vue/React/Angular多框架，集成ESLint/Prettier规范，一键生成企业级项目模板',
    icon: 'streamline-freehand-color:app-window-link'
  },
  {
    id: 2,
    title: '场景化组件库',
    description: '200+覆盖电商/后台/移动端等场景的UI组件，支持按需引入、主题定制与多端适配',
    icon: 'streamline-freehand-color:bookmarks-document'
  },
  {
    id: 3,
    title: '前端性能分析平台',
    description: '整合首屏加载监控、资源体积分析、错误上报与用户行为追踪的一站式性能优化工具',
    icon: 'streamline-freehand-color:app-window-search-text'
  }
]
</script>
