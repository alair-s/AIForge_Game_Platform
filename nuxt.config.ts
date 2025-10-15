// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true},
    modules:['@unocss/nuxt', '@nuxt/icon'],
    icon: {
        localApiEndpoint: '/nuxt-icon',
    },
    app:{
        head:{
            title: 'Nuxt练习',
            meta:[
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {name: 'theme-color', content: '#ffffff'},
                {name:'description',content:"尝试用nuxt搭建官网"},
                {name:"keywords",content:"Nuxt 4"}
            ]
        }
    },
    ssr:true,//默认
    devServer: {
        //默认端口
        port: 3000,
        host: '0.0.0.0',
    },
    css:["~/assets/index.css"],//css入口文件，因为没有main.ts
    nitro:{
        //代理，用于前后端分离
        // devProxy: {
        //   "/api": {
        //     target: "http://localhost:3000",
        //     changeOrigin: true,
        //     prependPath: true,
        //   },
        // },
    }

})