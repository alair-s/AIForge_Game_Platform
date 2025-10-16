<template>
  <section class="hero-bg pt-20" style="height: 40vh;">
    <div class="container mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-between">
      <div class="w-full md:w-3/5 mb-10 md:mb-0">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">前端开发与解决方案的一站式服务平台</h1>
        <p class="text-xl md:text-2xl mb-8 opacity-90">工程化 | 组件库 | 性能优化 | 定制化开发交付</p>
        <button class="bg-white text-blue-900 font-bold py-3 px-8 rounded-lg transition-transform duration-300 hover:transform hover:scale-105">
          了解更多
        </button>
      </div>

      <div class="w-full md:w-1/5 flex justify-center">
        <div class="rotate-animation bg-blue-900 bg-opacity-20 border border-white border-opacity-50 rounded-xl p-8 shadow-lg backdrop-blur-sm" style="max-width: 300px;">
          <div class="text-center">
            <Lottie name="hutao" />
            <span>这里测试lottie使用，暂时没有imgs包</span>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>
