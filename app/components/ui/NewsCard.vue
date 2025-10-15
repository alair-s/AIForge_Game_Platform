<template>
  <div class="card-hover bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
    <img :src="news.image" :alt="news.imageAlt" class="w-full h-48 object-cover" />
    <div class="p-6">
      <h3 class="text-lg font-bold text-gray-800 mb-2">{{ news.title }}</h3>
      <p class="text-gray-500 text-sm mb-4">{{ news.date }}</p>
      <p class="text-gray-700">{{ news.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  news: {
    id: number
    title: string
    date: string
    description: string
    image: string
    imageAlt: string
  }
}

defineProps<Props>()
</script>
