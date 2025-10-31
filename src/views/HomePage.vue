<template>
  <div class="home-page cyberpunk-bg">
    <!-- 页面头部 -->
    <div class="page-header glass-card">
      <h1>FPS游戏创作者中心</h1>
      <div class="header-stats">
        <div class="stat-item">
          <el-icon><User /></el-icon>
          <span>在线用户: {{ onlineUsers }}</span>
        </div>
        <div class="stat-item">
          <el-icon><Connection /></el-icon>
          <span :class="{ 'text-success': isConnected, 'text-danger': !isConnected }">
            {{ isConnected ? '已连接' : '未连接' }}
          </span>
        </div>
      </div>
    </div>

    <!-- 实时价格更新面板 -->
    <div class="realtime-panel glass-card" v-if="latestPriceUpdates.length > 0">
      <div class="panel-header">
        <h3 class="glitch-text" >
          <el-icon><TrendCharts /></el-icon>
          实时价格更新
        </h3>
        <button class="cyber-icon-button" @click="clearPriceUpdates">
          <el-icon><Close /></el-icon>
        </button>
      </div>
      <div class="price-ticker">
        <div 
          v-for="update in latestPriceUpdates" 
          :key="update.workId + (update.timestamp || Date.now())"
          class="price-item"
          :class="{ 'price-up': update.change > 0, 'price-down': update.change < 0 }"
        >
          <span class="work-name">{{ update.workName }}</span>
          <span class="price-change">
            {{ update.change > 0 ? '+' : '' }}¥{{ update.change }}
            <el-icon><Top v-if="update.change > 0" /><Bottom v-else /></el-icon>
          </span>
          <span class="price-now">¥{{ update.newPrice }}</span>
        </div>
      </div>
    </div>

    <!-- 通知面板 -->
    <div class="notification-panel glass-card" v-if="unreadCount > 0">
      <div class="panel-header">
        <h3 class="glitch-text" >
          <el-icon><Bell /></el-icon>
          通知 ({{ unreadCount }})
        </h3>
        <button class="cyber-icon-button" @click="clearAllNotifications">
          <el-icon><Close /></el-icon>
        </button>
      </div>
      <div class="notification-list">
        <div 
          v-for="notification in wsUnreadNotifications" 
          :key="notification.id"
          class="notification-item"
          :class="`notification-${notification.type}`"
        >
          <div class="notification-content">
            <div class="notification-title">{{ notification.title }}</div>
            <div class="notification-desc">{{ notification.content }}</div>
            <div class="notification-time">{{ formatTime(notification.timestamp) }}</div>
          </div>
          <button
            class="cyber-icon-button small"
            @click="markNotificationAsRead(notification.id)"
          >
            <el-icon><Check /></el-icon>
          </button>
        </div>
      </div>
    </div>

    <!-- 热门作品轮播 -->
    <div class="hot-works-section">
      <div class="section-header">
        <h2>
          <el-icon><Star /></el-icon>
          热门作品
        </h2>
        <button class="cyber-link-button" @click="$router.push('/market')">
          查看更多 <el-icon><ArrowRight /></el-icon>
        </button>
      </div>
      
      <el-carousel height="700px" indicator-position="outside" class="hot-works-carousel">
        <el-carousel-item v-for="work in hotWorks" :key="work.id">
          <div class="carousel-item glass-card" @click="viewWork(work)">
            <div class="carousel-image">
              <el-image :src="work.image" fit="cover" class="work-image">
                <template #error>
                  <div class="image-error">
                    <el-icon size="48"><Picture /></el-icon>
                  </div>
                </template>
              </el-image>
              <div class="price-trend" :class="{ 'trend-up': work.priceChange > 0, 'trend-down': work.priceChange < 0 }">
                <el-icon><Top v-if="work.priceChange > 0" /><Bottom v-else /></el-icon>
                {{ work.priceChange > 0 ? '+' : '' }}{{ work.priceChange }}%
              </div>
            </div>
            <div class="carousel-info">
              <h3>{{ work.name }}</h3>
              <p class="work-author">by {{ work.author }}</p>
              <div class="work-stats">
                <span><el-icon><Star /></el-icon> {{ work.likes }}</span>
                <span><el-icon><View /></el-icon> {{ work.views }}</span>
                <span><el-icon><ShoppingCart /></el-icon> {{ work.sales }}</span>
              </div>
              <div class="work-price">
                <span class="current-price">¥{{ work.currentPrice }}</span>
                <span class="original-price" v-if="work.originalPrice">¥{{ work.originalPrice }}</span>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 实时价格行情 -->
    <div class="price-section glass-card">
      <div class="section-header">
        <h2 class="glitch-text" >
          <el-icon><TrendCharts /></el-icon>
          实时价格行情
        </h2>
        <div class="price-controls">
          <div class="cyber-radio-group">
            <button
              v-for="option in priceFilterOptions"
              :key="option.value"
              :class="['cyber-radio-button', { active: priceFilter === option.value }]"
              @click="priceFilter = option.value"
            >
              {{ option.label }}
            </button>
          </div>
          <button
            class="cyber-button"
            @click="refreshPrices"
            :disabled="refreshing"
          >
            <span v-if="refreshing" class="loading-spinner"></span>
            <el-icon v-else><Refresh /></el-icon>
            {{ refreshing ? '刷新中...' : '刷新' }}
          </button>
        </div>
      </div>
      
      <div class="price-grid">
        <div 
          v-for="item in filteredPriceItems" 
          :key="item.id"
          class="price-card glass-card"
          @click="viewWork(item)"
        >
          <div class="price-image">
            <el-image :src="item.image" fit="cover" class="item-image">
              <template #error>
                <div class="image-error">
                  <el-icon size="32"><Picture /></el-icon>
                </div>
              </template>
            </el-image>
          </div>
          <div class="price-info">
            <h4>{{ item.name }}</h4>
            <p class="item-author">by {{ item.author }}</p>
            <div class="price-display">
              <span class="current-price">¥{{ item.currentPrice }}</span>
              <span class="price-change" :class="{ positive: item.priceChange > 0, negative: item.priceChange < 0 }">
                {{ item.priceChange > 0 ? '+' : '' }}{{ item.priceChange }}%
              </span>
            </div>
            <div class="price-trend-mini">
              <div class="trend-bar" :style="{ width: Math.abs(item.priceChange) + '%', backgroundColor: item.priceChange > 0 ? '#67c23a' : '#f56c6c' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分类浏览 -->
    <div class="category-section glass-card">
      <div class="section-header">
        <h2 class="glitch-text" >
          <el-icon><Grid /></el-icon>
          分类浏览
        </h2>
      </div>
      
      <div class="category-grid">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="category-card glass-card"
          @click="browseCategory(category)"
        >
          <div class="category-icon">
            <el-icon :size="32">
              <component :is="category.icon" />
            </el-icon>
          </div>
          <h4>{{ category.name }}</h4>
          <p>{{ category.count }} 个作品</p>
        </div>
      </div>
    </div>

    <!-- 创作者推荐 -->
    <div class="creators-section glass-card">
      <div class="section-header">
        <h2 class="glitch-text" >
          <el-icon><User /></el-icon>
          推荐创作者
        </h2>
        <button class="cyber-link-button" @click="$router.push('/creators')">
          查看更多 <el-icon><ArrowRight /></el-icon>
        </button>
      </div>
      
      <div class="creators-grid">
        <div 
          v-for="creator in recommendedCreators" 
          :key="creator.id"
          class="creator-card glass-card"
          @click="viewCreator(creator)"
        >
          <el-avatar :src="creator.avatar" :size="64" />
          <h4>{{ creator.name }}</h4>
          <p>{{ creator.bio }}</p>
          <div class="creator-stats">
            <span>{{ creator.works }} 作品</span>
            <span>{{ creator.followers }} 粉丝</span>
          </div>
          <button
            class="cyber-button small"
            @click.stop="followCreator(creator)"
          >
            <el-icon><Plus /></el-icon>
            关注
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useWebSocket } from '@/composables/useWebSocket'

interface HotWork {
  id: number
  name: string
  image: string
  author: string
  likes: number
  views: number
  sales: number
  currentPrice: number
  originalPrice?: number
  priceChange: number
}

interface PriceItem {
  id: number
  name: string
  image: string
  author: string
  currentPrice: number
  priceChange: number
}

interface Category {
  id: number
  name: string
  icon: string
  count: number
}

interface Creator {
  id: number
  name: string
  avatar: string
  bio: string
  works: number
  followers: number
}

const router = useRouter()

// WebSocket集成
const { 
  isConnected, 
  onlineUsers, 
  priceUpdates, 
  notifications, 
  unreadCount, 
  latestPriceUpdates: wsPriceUpdates,
  unreadNotifications: wsUnreadNotifications,
  markNotificationAsRead,
  clearAllNotifications 
} = useWebSocket()

// 实时价格更新面板
const showRealtimePanel = ref(true)
const showNotificationPanel = ref(true)

// 价格筛选
const priceFilter = ref('all')
const refreshing = ref(false)

// 价格筛选选项
const priceFilterOptions = [
  { value: 'all', label: '全部' },
  { value: 'hot', label: '热门' },
  { value: 'new', label: '新品' }
]

// 热门作品数据
const hotWorks = ref<HotWork[]>([
  {
    id: 1,
    name: '龙纹AK-47',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=dragon+pattern+AK47+skin+fps+game+weapon+design&image_size=landscape_16_9',
    author: '创作者小王',
    likes: 1234,
    views: 5678,
    sales: 89,
    currentPrice: 299,
    originalPrice: 399,
    priceChange: -25.1
  },
  {
    id: 2,
    name: '冰霜M4A1',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=frost+ice+blue+M4A1+skin+cool+weapon+design&image_size=landscape_16_9',
    author: '冰霜设计师',
    likes: 856,
    views: 2345,
    sales: 45,
    currentPrice: 199,
    priceChange: 15.2
  },
  {
    id: 3,
    name: '霓虹沙漠之鹰',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=neon+cyberpunk+desert+eagle+pistol+skin+colorful&image_size=landscape_16_9',
    author: '霓虹艺术家',
    likes: 567,
    views: 1234,
    sales: 23,
    currentPrice: 159,
    priceChange: 8.7
  }
])

// 价格行情数据
const priceItems = ref<PriceItem[]>([
  {
    id: 1,
    name: '黄金M4A4',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=gold+luxury+M4A4+skin+premium+weapon+design&image_size=square',
    author: '黄金大师',
    currentPrice: 599,
    priceChange: 12.5
  },
  {
    id: 2,
    name: '翡翠AWP',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=jade+green+AWP+sniper+skin+luxury+design&image_size=square',
    author: '翡翠工匠',
    currentPrice: 799,
    priceChange: -5.2
  },
  {
    id: 3,
    name: '红宝石手枪',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=ruby+red+pistol+skin+gemstone+design&image_size=square',
    author: '宝石收藏家',
    currentPrice: 299,
    priceChange: 23.1
  },
  {
    id: 4,
    name: '暗影匕首',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=shadow+dark+knife+dagger+skin+stealth+design&image_size=square',
    author: '暗影刺客',
    currentPrice: 159,
    priceChange: -8.9
  },
  {
    id: 5,
    name: '电浆步枪',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=plasma+energy+rifle+skin+sci+fi+design&image_size=square',
    author: '未来战士',
    currentPrice: 899,
    priceChange: 18.7
  },
  {
    id: 6,
    name: '冰霜手雷',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=frost+ice+grenade+skin+cool+explosive+design&image_size=square',
    author: '冰霜爆破',
    currentPrice: 89,
    priceChange: 45.2
  }
])

// 分类数据
const categories = ref<Category[]>([
  { id: 1, name: '突击步枪', icon: 'Rifle', count: 156 },
  { id: 2, name: '狙击枪', icon: 'Aim', count: 89 },
  { id: 3, name: '手枪', icon: 'Hand', count: 234 },
  { id: 4, name: '冲锋枪', icon: 'Lightning', count: 67 },
  { id: 5, name: '霰弹枪', count: 45, icon: 'Thunderbolt' },
  { id: 6, name: '近战武器', icon: 'Knife', count: 123 }
])

// 推荐创作者数据
const recommendedCreators = ref<Creator[]>([
  {
    id: 1,
    name: '龙纹大师',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=dragon+master+avatar+profile+icon&image_size=square',
    bio: '专注于东方风格武器设计',
    works: 45,
    followers: 1234
  },
  {
    id: 2,
    name: '冰霜艺术家',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=frost+artist+avatar+profile+icon&image_size=square',
    bio: '冷酷冰霜系列创作者',
    works: 32,
    followers: 856
  },
  {
    id: 3,
    name: '霓虹设计师',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=neon+designer+avatar+profile+icon&image_size=square',
    bio: '赛博朋克风格专家',
    works: 28,
    followers: 567
  },
  {
    id: 4,
    name: '黄金工匠',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=gold+smith+avatar+profile+icon&image_size=square',
    bio: '奢华黄金系列制作者',
    works: 56,
    followers: 2341
  }
])

// 计算属性
const filteredPriceItems = computed(() => {
  let items = priceItems.value
  
  switch (priceFilter.value) {
    case 'hot':
      items = items.filter(item => item.priceChange > 0)
      break
    case 'new':
      // 这里可以根据创建时间筛选新品
      items = items.slice(0, 3)
      break
    default:
      break
  }
  
  return items
})

const latestPriceUpdates = computed(() => {
  return wsPriceUpdates.value.slice(0, 3) // 显示最新的3条价格更新
})



// 方法定义
const viewWork = (work: HotWork | PriceItem) => {
  router.push(`/preview/${work.id}`)
}

const browseCategory = (category: Category) => {
  router.push({
    path: '/market',
    query: { category: category.name }
  })
}

const viewCreator = (creator: Creator) => {
  router.push(`/profile/${creator.id}`)
}

const followCreator = (creator: Creator) => {
  ElMessage.success(`已关注 ${creator.name}`)
}

const refreshPrices = () => {
  refreshing.value = true
  
  // 模拟价格刷新
  setTimeout(() => {
    priceItems.value.forEach(item => {
      const change = (Math.random() - 0.5) * 20 // -10% 到 +10%
      item.priceChange = Math.round(change * 10) / 10
    })
    
    refreshing.value = false
    ElMessage.success('价格已更新')
  }, 1000)
}

const clearPriceUpdates = () => {
  priceUpdates.value = []
}

const formatTime = (timestamp: number) => {
  const now = Date.now()
  const diff = now - timestamp
  
  if (diff < 60000) {
    return '刚刚'
  } else if (diff < 3600000) {
    return Math.floor(diff / 60000) + '分钟前'
  } else if (diff < 86400000) {
    return Math.floor(diff / 3600000) + '小时前'
  } else {
    return new Date(timestamp).toLocaleDateString('zh-CN')
  }
}

// 模拟WebSocket连接和数据接收
onMounted(() => {
  // 模拟接收价格更新
  const priceUpdateInterval = setInterval(() => {
    if (Math.random() > 0.7) { // 30%概率收到价格更新
      const randomWork = hotWorks.value[Math.floor(Math.random() * hotWorks.value.length)]
      if (randomWork) {
      const oldPrice = randomWork.currentPrice
      const change = Math.floor((Math.random() - 0.5) * 50) // -25到+25
      const newPrice = Math.max(1, oldPrice + change)
      
      // 更新本地数据
      randomWork.currentPrice = newPrice
      randomWork.priceChange = ((newPrice - oldPrice) / oldPrice * 100)
      
      // 这里可以发送到WebSocket
      console.log(`价格更新: ${randomWork.name} ¥${oldPrice} → ¥${newPrice}`)
      }
    }
  }, 5000) // 每5秒检查一次
  
  onUnmounted(() => {
    clearInterval(priceUpdateInterval)
  })
})
</script>

<style scoped>
/* Cyberpunk glass card - 与App.vue风格一致 */
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  overflow: hidden;
}

.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--neon-green), var(--neon-cyan), var(--neon-magenta));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.glass-card:hover {
  border-color: var(--glass-border-hover);
  box-shadow: var(--glow-green);
  transform: translateY(-4px);
}

.glass-card:hover::before {
  opacity: 1;
}

/* Glitch text effect - 与App.vue风格一致 */
.glitch-text {
  position: relative;
  color: var(--neon-cyan);
  text-shadow: var(--glow-cyan);
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
}

.glitch-text::before {
  color: var(--neon-magenta);
  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  transform: translate(-2px, -1px);
  opacity: 0.8;
}

.glitch-text::after {
  color: var(--neon-green);
  clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
  transform: translate(2px, 1px);
  opacity: 0.8;
}

/* 布局与间距修复 - 与App.vue风格一致 */
.home-page {
  position: relative;
  z-index: 2;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-sizing: border-box;
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
}

.page-header h1 {
  margin: 0;
  color: var(--text-highlight);
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.header-stats {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.text-success {
  color: var(--neon-green) !important;
  text-shadow: var(--glow-green);
}

.text-danger {
  color: var(--neon-magenta) !important;
  text-shadow: var(--glow-magenta);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  color: var(--text-highlight);
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--glass-border);
}

.panel-header h3 {
  color: var(--neon-cyan);
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.hot-works-section {
  display: block;
}

.hot-works-carousel {
  width: 100%;
}

.carousel-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-item:hover {
  transform: translateY(-2px);
}

.carousel-image {
  position: relative;
  flex: 1 1 60%;
  border-radius: 8px;
  overflow: hidden;
}

.carousel-info {
  flex: 1 1 40%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.carousel-info h3 {
  color: var(--text-highlight);
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  margin: 0;
}

.work-author {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.work-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.work-price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.current-price {
  color: var(--neon-green);
  font-weight: 700;
  font-size: 1.1rem;
}

.original-price {
  color: var(--text-secondary);
  text-decoration: line-through;
  font-size: 0.9rem;
}

.price-trend {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.trend-up {
  background: rgba(157, 255, 0, 0.2);
  color: var(--neon-green);
}

.trend-down {
  background: rgba(255, 0, 204, 0.2);
  color: var(--neon-magenta);
}

.price-section {
  padding: 1.5rem;
}

.price-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.price-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.price-card {
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.price-card:hover {
  transform: translateY(-2px);
}

.price-info h4 {
  color: var(--text-highlight);
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.item-author {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0 0 0.75rem 0;
}

.price-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.price-change {
  font-weight: 700;
  font-size: 0.9rem;
}

.price-change.positive {
  color: var(--neon-green);
}

.price-change.negative {
  color: var(--neon-magenta);
}

.price-trend-mini {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.trend-bar {
  height: 100%;
  transition: width 0.3s ease;
}

.category-section {
  padding: 1.5rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.category-card {
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-2px);
}

.category-icon {
  margin-bottom: 1rem;
  color: var(--neon-cyan);
}

.category-card h4 {
  color: var(--text-highlight);
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.category-card p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0;
}

.creators-section {
  padding: 1.5rem;
}

.creators-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

.creator-card {
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.creator-card:hover {
  transform: translateY(-2px);
}

.creator-card h4 {
  color: var(--text-highlight);
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  margin: 0.75rem 0 0.5rem 0;
}

.creator-card p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.creator-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* 价格更新和通知样式 */
.price-ticker {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.price-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.price-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.price-up {
  border-left: 3px solid var(--neon-green);
}

.price-down {
  border-left: 3px solid var(--neon-magenta);
}

.work-name {
  color: var(--text-highlight);
  font-weight: 600;
}

.price-change {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 700;
}

.price-now {
  color: var(--neon-cyan);
  font-weight: 700;
}

.notification-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.notification-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.notification-content {
  flex: 1;
}

.notification-title {
  color: var(--text-highlight);
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.notification-desc {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.notification-time {
  color: var(--text-secondary);
  font-size: 0.8rem;
}

.notification-info {
  border-left: 3px solid var(--neon-cyan);
}

.notification-success {
  border-left: 3px solid var(--neon-green);
}

.notification-warning {
  border-left: 3px solid var(--neon-magenta);
}

.notification-error {
  border-left: 3px solid #ff4444;
}

/* 赛博朋克按钮样式 - 与App.vue一致 */
.cyber-button {
  background: linear-gradient(45deg, var(--neon-green), var(--neon-cyan));
  color: var(--bg-primary);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cyber-button.small {
  padding: 8px 16px;
  font-size: 0.85rem;
}

.cyber-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.cyber-button:hover::before {
  left: 100%;
}

.cyber-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(157, 255, 0, 0.4);
}

.cyber-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.cyber-button:disabled:hover {
  box-shadow: none;
}

.cyber-link-button {
  background: transparent;
  color: var(--neon-cyan);
  border: 1px solid var(--neon-cyan);
  padding: 8px 16px;
  border-radius: 6px;
  font-family: 'Orbitron', monospace;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.cyber-link-button:hover {
  background: rgba(0, 229, 255, 0.1);
  color: var(--neon-green);
  border-color: var(--neon-green);
  text-shadow: var(--glow-green);
}

.cyber-icon-button {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--glass-border);
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.cyber-icon-button.small {
  width: 28px;
  height: 28px;
  padding: 6px;
}

.cyber-icon-button:hover {
  color: var(--neon-cyan);
  border-color: var(--neon-cyan);
  background: rgba(0, 229, 255, 0.1);
}

.cyber-radio-group {
  display: flex;
  gap: 0.5rem;
}

.cyber-radio-button {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--glass-border);
  padding: 8px 16px;
  border-radius: 6px;
  font-family: 'Orbitron', monospace;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.85rem;
}

.cyber-radio-button:hover {
  color: var(--neon-cyan);
  border-color: var(--neon-cyan);
  background: rgba(0, 229, 255, 0.1);
}

.cyber-radio-button.active {
  background: linear-gradient(45deg, var(--neon-green), var(--neon-cyan));
  color: var(--bg-primary);
  border-color: var(--neon-green);
  box-shadow: 0 0 15px rgba(157, 255, 0, 0.3);
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid var(--bg-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home-page {
    padding: 1rem;
    gap: 1.5rem;
  }

  .page-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .header-stats {
    justify-content: center;
  }

  .carousel-item {
    flex-direction: column;
  }

  .price-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .category-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }

  .creators-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .price-controls {
    flex-direction: column;
    gap: 0.75rem;
  }
}

</style>
