import { reqGetCode, reqLogout, reqUserInfo, reqUserLogin, reqUserRegister } from "@/api"
import { getToken, removeToken, setToken } from "@/utils/token";
// 登录与注册的模块
const state = {
	code: '',
	token: getToken(),
	userInfo: {}
}
const mutations = {
	GETCODE (state, code) {
		state.code = code
	},
	USERLOGIN (state, token) {
		state.token = token
	},
	GETUSERINFO (state, userInfo) {
		state.userInfo = userInfo
	},
	// 请求本地数据
	CLEAR (state) {
		// 仓库中关于用户信息清空
		state.token = ''
		state.userInfo = {}
		// 本地存储数据清空
		removeToken()
	}
}
const actions = {
	// 获取验证码
	async getCode ({ commit }, phone) {
		// 获取验证码这个接口，把验证码返回，但是正常情况下应该是后台来做的！
		let result = await reqGetCode(phone)
		if (result.code == 200) {
			commit('GETCODE', result.data)
			return "ok"
		} else {
			return Promise.reject(new Error('failed'))
		}
	},
	// 用户注册
	async userRegister ({ commit }, user) {
		let result = await reqUserRegister(user)
		console.log(result);
		if (result.code == 200) {
			return "ok"
		} else {
			return Promise.reject(new Error('failed'))
		}
	},
	// 登录业务
	async userLogin ({ commit }, data) {
		let result = await reqUserLogin(data);
		console.log(result);
		// 服务器下发token，用户唯一标识符
		// 将来经常带token找服务器要用户信息进行展示
		if (result.code == 200) {
			// 用户已经登录成功且获取到token
			commit("USERLOGIN", result.data.token)
			// 持久化存储token
			// localStorage.setItem("TOKEN", result.data.token)
			setToken(result.data.token)
			return "ok"
		} else {
			return Promise.reject(new Error("failed"))
		}
	},
	// 获取用户信息
	async getUserInfo ({ commit }) {
		let result = await reqUserInfo()
		if (result.code == 200) {
			// 提交用户信息
			commit("GETUSERINFO", result.data)
			return "ok"
		} else {
			return Promise.reject(new Error("failed"))
		}
	},
	// 退出登录
	async userLogout ({ commit }) {
		// 只是想服务器发起一次请求，通知服务器清除token、userInfo等数据
		let result = await reqLogout()
		// action里面不能操作state，调教mutation修改state
		if (result.code == 200) {
			commit("CLEAR")
			return "ok"
		} else {
			return Promise.reject(new Error('failed'))
		}
	}
}
const getters = {}
export default {
	state,
	mutations,
	actions,
	getters
}