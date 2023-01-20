import Vue from 'vue'
import Vuex from 'vuex'
// 需要使用插件一次
Vue.use(Vuex)

// 引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'


// 对外暴露一个Store类的一个实例(你需要暴露这个类的实例，如果你不对外暴露，外部是不能使用的)
export default new Vuex.Store({
	// 实现Vuex仓库模块化开发存储数据
	modules: {
		home,
		search,
		detail,
		shopcart,
		user,
		trade
	}
})