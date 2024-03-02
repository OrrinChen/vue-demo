const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave:false,
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title= 'vue-basic'
                return args
            })
    },

    // 关闭ws报错
    publicPath: './',
    devServer: {
        proxy: {
            '/': {
                target: 'http://192.168.1.34:8888/', // 本地后端地址
                changeOrigin: true, //允许跨域
                ws: false
            }
        }
    }
})
