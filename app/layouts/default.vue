<template>
  <!-- 导航栏 -->
    <nav class="top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-white/10">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <!-- Logo -->
          <div class="flex items-center">
            <div class="text-[#200d0dff] tracking-tight">
              STUDIO
            </div>
          </div>

          <!-- 桌面导航菜单 -->
          <div class="hidden md:flex items-center space-x-1">
            <div
                v-for="item in navItems"
                :key="item.name"
                class="relative"
                @mouseenter="handleMouseEnter(item.name)"
                @mouseleave="handleMouseLeave"
            >
              <button
                  class="px-4 py-2 text-sm text-white/80 hover:text-white transition-colors duration-300 relative group"
              >
                {{ item.name }}
                <span
                    class="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"
                ></span>
              </button>

              <!-- 下拉菜单 -->
              <Transition
                  enter-active-class="transition duration-300 ease-out"
                  enter-from-class="opacity-0 translate-y-[-10px]"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition duration-200 ease-in"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 translate-y-[-10px]"
              >
                <div
                    v-if="activeDropdown === item.name && item.dropdown"
                    class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#000000ff] overflow-hidden"
                >
                  <div class="p-2">
                    <a
                        v-for="subItem in item.dropdown"
                        :key="subItem.name"
                        href="#"
                        class="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-all duration-200 group"
                        @click.prevent
                    >
                      <div class="flex items-center justify-between">
                        <span>{{ subItem.name }}</span>
                        <svg
                            class="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                          <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                      <p class="text-xs text-white/40 mt-1">{{ subItem.description }}</p>
                    </a>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- 右侧按钮 -->
          <div class="hidden md:flex items-center space-x-4">
            <button
                class="px-6 py-2 text-sm text-white/80 hover:text-white transition-colors duration-300"
            >
              {'联系我们'}
            </button>
            <button
                class="px-6 py-2 text-sm bg-white text-black rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105"
            >
              {'开始项目'}
            </button>
          </div>

        </div>
      </div>


    </nav>




</template>

<script setup lang="ts">
import { ref } from 'vue'

interface DropdownItem {
  name: string
  description: string
}

interface NavItem {
  name: string
  dropdown?: DropdownItem[]
}

const activeDropdown = ref<string | null>(null)
const activeMobileDropdown = ref<string | null>(null)
const mobileMenuOpen = ref(false)

const navItems: NavItem[] = [
  {
    name: '作品',
    dropdown: [
      { name: '品牌设计', description: '视觉识别系统设计' },
      { name: '网页开发', description: '响应式网站建设' },
      { name: '移动应用', description: 'iOS & Android 应用' },
      { name: '用户体验', description: 'UX/UI 设计服务' }
    ]
  },
  {
    name: '服务',
    dropdown: [
      { name: '战略咨询', description: '数字化转型咨询' },
      { name: '创意设计', description: '品牌与视觉设计' },
      { name: '技术开发', description: '全栈开发服务' },
      { name: '运营支持', description: '持续维护优化' }
    ]
  },
  {
    name: '关于',
    dropdown: [
      { name: '团队介绍', description: '认识我们的团队' },
      { name: '公司文化', description: '我们的价值观' },
      { name: '职业机会', description: '加入我们' },
      { name: '联系方式', description: '与我们取得联系' }
    ]
  },
  { name: '博客' }
]

const handleMouseEnter = (name: string) => {
  activeDropdown.value = name
}

const handleMouseLeave = () => {
  activeDropdown.value = null
}

const toggleMobileDropdown = (name: string) => {
  activeMobileDropdown.value = activeMobileDropdown.value === name ? null : name
}
</script>