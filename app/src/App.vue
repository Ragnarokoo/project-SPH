<template>
	<div>
		<Header />
		<!-- 路由组件出口的地方 -->
		<router-view></router-view>
		<!-- 在Home、Search显示，在登录注册隐藏！ -->
		<Footer v-show="$route.meta.show" />
	</div>
</template>

<script>
// 引入头部
import Header from "./components/Header/index.vue";
// 引入底部
import Footer from "./components/Footer/index.vue";

export default {
	name: "App",
	components: {
		Header,
		Footer
	},
	mounted() {
		// 通知Vuex发请求，获取数据，存储于仓库当中，派发action
		this.$store.dispatch("categoryList");
	}
};
</script>
