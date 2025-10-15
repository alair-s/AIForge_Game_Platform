<template>
  <div class="home-page">
    <!-- Hero区域 -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">AI智能识别与数据服务平台</h1>
        <p class="hero-subtitle">为企业提供智能化解决方案</p>
        <div class="hero-actions">
          <NuxtLink to="/contact" class="btn btn-primary">立即咨询</NuxtLink>
          <NuxtLink to="/products" class="btn btn-outline">了解更多</NuxtLink>
        </div>
      </div>
    </section>

    <!-- 产品展示 -->
    <section class="products-section">
      <h2 class="section-title">核心产品</h2>
      <div class="products-grid">
        <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
        />
      </div>
    </section>

    <!-- 解决方案 -->
    <section class="solutions-section">
      <h2 class="section-title">行业解决方案</h2>
      <div class="solutions-grid">
        <SolutionCard
            v-for="solution in solutions"
            :key="solution.id"
            :solution="solution"
        />
      </div>
    </section>

    <!-- 客户案例 -->
    <section class="clients-section">
      <h2 class="section-title">合作客户</h2>
      <div class="clients-grid">
        <!-- 客户logo展示 -->
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const products = ref([
  {
    id: 1,
    title: 'AI识别引擎',
    description: '高精度文字识别服务',
    icon: '/icons/ai.svg'
  },
  {
    id: 2,
    title: '企业数据平台',
    description: '全方位企业数据服务',
    icon: '/icons/data.svg'
  }
])

const solutions = ref([
  {
    id: 1,
    title: '金融行业',
    description: '为银行、证券提供数字化方案',
    image: '/images/finance.jpg'
  },
  {
    id: 2,
    title: '企业服务',
    description: '助力企业数字化转型',
    image: '/images/enterprise.jpg'
  }
])
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 2rem;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin: 3rem 0;
}

.products-grid,
.solutions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
</style>
