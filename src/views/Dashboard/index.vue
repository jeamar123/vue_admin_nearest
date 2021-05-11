<template>
	<div class="main-container h-screen">
		<Loader v-if="showLoader"/>
		<!-- <Header 
			v-if="$route.name != 'ShopInfo'"
			:toggleSidemenu="toggleSidemenu" 
			:isSideMenuShow="isShowSideMenu" 
		/> -->

		<div class="main-content h-full">
			<Sidemenu/>

			<div class="flex h-full pl-72">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import Dashboard from './function.vue'
	export default Dashboard
</script>