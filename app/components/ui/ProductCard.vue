<template>
  <div class="card-hover bg-white rounded-xl shadow-lg border border-gray-100 p-6 rotate-animation">
    <div class="flex items-center mb-4">
      <Icon :name="product.icon" size="1rem" />
      <h3 class="text-xl font-bold text-blue-900 ml-3">{{ product.title }}</h3>
    </div>
    <p class="text-gray-700 mb-4">{{ product.description }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  product: {
    id: number
    title: string
    description: string
    icon: string
  }
}

defineProps<Props>()
</script>
