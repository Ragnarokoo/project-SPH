const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	// 处理map文件的配置：对于上线的情况下没有意义，所以可以关闭掉！
	productionSourceMap: false,
	transpileDependencies: true,
	// 关闭eslint校验
	lintOnSave: false,
	// 代理跨域
	devServer: {
		proxy: {
			'/api': {
				target: 'http://gmall-h5-api.atguigu.cn',
				// pathRewrite: { '^/api': '' },
			},
		}
	}
})
