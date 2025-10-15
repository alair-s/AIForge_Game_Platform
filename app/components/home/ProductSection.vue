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
    title: '通用智能文字识别引擎',
    description: '支持全球50+主流语言的文本识别、表格识别及办公文档OCR识别产品',
    icon: 'streamline-freehand-color:app-window-link'
  },
  {
    id: 2,
    title: '场景智能文字识别引擎',
    description: '200+国内外卡证、票据、行业单据、定制场景等高精度识别产品',
    icon: 'streamline-freehand-color:bookmarks-document'
  },
  {
    id: 3,
    title: '财报机器人',
    description: '整合多样式报表OCR识别、报表电子化储存与数据分析的一站式企业财报处理平台',
    icon: 'streamline-freehand-color:app-window-search-text'
  }
]
</script>
