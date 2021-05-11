<template>
	<div class="fixed top-0 left-0 z-50 h-full flex">
		<div class="w-72 bg-white shadow-lg bg-c-primary">
			<div class="h-14 flex items-center px-5 bg-gray-800">
				<p class="text-gray-100 font-bold text-xl">Admin Dashboard</p>
			</div>
			<div class="sidemenu-items px-3 py-3 text-blue-300 overflow-y-auto">
				<router-link 
					:to="{ name: 'Home'}" 
					class="p-2 mb-2 font-bold cursor-pointer text-base block hover:text-white"
					:class="{'text-white' : $route.name == 'Home' || $route.name == 'Dashboard'}"
				>
					Home
				</router-link>
				<router-link 
					:to="{ name: 'Users'}" 
					class="p-2 mb-2 font-bold cursor-pointer text-base block hover:text-white"
					:class="{'text-white' : $route.name == 'Users'}"
				>
					Users
				</router-link>
				<router-link 
					:to="{ name: 'Shops'}" 
					class="p-2 mb-2 font-bold cursor-pointer text-base block hover:text-white"
					:class="{'text-white' : $route.name == 'Shops' || $route.name == 'ShopDetails'}"
				>
					Shops
				</router-link>
				<router-link 
					:to="{ name: 'Categories'}" 
					class="p-2 mb-2 font-bold cursor-pointer text-base block hover:text-white"
					:class="{'text-white' : $route.name == 'Categories'}"
				>
					Categories
				</router-link>
				<router-link 
					:to="{ name: 'Settings'}" 
					class="p-2 mb-2 font-bold cursor-pointer text-base block hover:text-white"
					:class="{'text-white' : $route.name == 'Settings'}"
				>
					Settings
				</router-link>
				<!-- <a class="p-2 mb-2 font-bold cursor-pointer text-base block hover:text-white" @click="logout()">Logout</a> -->
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import Sidemenu from './function.vue'
	export default Sidemenu
</script>