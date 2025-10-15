<template>
  <div class="mb-20 md:mb-24 fade-in">
    <div class="bg-white rounded-xl shadow-md p-6 mb-10 max-w-2xl mx-auto">
      <h2 class="text-2xl md:text-3xl font-bold text-center text-blue-900">最新动态</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      <UiNewsCard
          v-for="news in newsItems"
          :key="news.id"
          :news="news"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface NewsItem {
  id: number
  title: string
  date: string
  description: string
  image: string
  imageAlt: string
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: '公司荣获2023年度最佳创新企业奖',
    date: '2023-10-15',
    description: '在行业峰会中，公司凭借领先的技术方案和市场表现，荣获年度最佳创新企业称号。',
    image: 'https://modao.cc/ai/uploads/ai_pics/40/400252/aigp_1760458072.jpeg',
    imageAlt: 'Award ceremony at industry summit'
  },
  {
    id: 2,
    title: '新产品\'智能数据分析平台\'正式发布',
    date: '2023-09-20',
    description: '全新一代智能数据分析平台，整合AI算法，为企业提供实时数据洞察。',
    image: 'https://modao.cc/ai/uploads/ai_pics/40/400253/aigp_1760458074.jpeg',
    imageAlt: 'Screenshot of smart data analysis platform'
  },
  {
    id: 3,
    title: '公司与XX集团达成战略合作',
    date: '2023-08-05',
    description: '双方将在云计算领域展开深度合作，共同推进产业数字化转型。',
    image: 'https://modao.cc/ai/uploads/ai_pics/40/400254/aigp_1760458076.jpeg',
    imageAlt: 'Signing ceremony with XX Group'
  }
]
</script>
