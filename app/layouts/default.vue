<template>
  <nav class="navbar">
    <div class="logo">
      <span class="logo-text">INTSIG</span>
      <span class="company-name">合合信息</span>
    </div>

    <ul class="nav-menu">
      <li
          v-for="(item, index) in menuItems"
          :key="index"
          class="nav-item"
          :class="{ active: activeIndex === index }"
          @click="handleMenuClick(index, item)"
      >
        {{ item.label }}
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

// 导航菜单项
const menuItems = ref([
  { label: '首页', path: '/home' },
  { label: '智能文字识别', path: '/ocr' },
  { label: '商业大数据', path: '/bigdata' },
  { label: '解决方案', path: '/solutions' },
  { label: '明星产品', path: '/products' },
  { label: '关于合合信息', path: '/about' }
])

// 当前激活的菜单项
const activeIndex = ref(0)

// 菜单点击处理
const handleMenuClick = (index, item) => {
  activeIndex.value = index
  console.log('导航到:', item.path)
  // 这里可以添加路由跳转逻辑
  // router.push(item.path)
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 50px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 30px;
  font-weight: bold;
  margin-left:200px;
}

.logo-text {
  color: #1890ff;
  letter-spacing: 1px;
}

.company-name {
  font-size:25px;
  color: #333;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 80px;
  margin-right:400px;
}

.nav-item {
  color: #666;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 8px 0;
  position: relative;
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
  }
}
</style>
