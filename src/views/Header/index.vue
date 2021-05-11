<template>
	<div class="h-14 w-full flex items-center px-4">
		<div class="w-9/12">
			<span class="text-lg font-bold">{{ routeName }}</span>
		</div>
		<div class="w-3/12 justify-end flex">
			<div class="flex items-center">
				<p class="font-bold text-sm">Hi, {{ adminDetails.first_name }}!</p>
				<div class="relative user-header-toggle">
					<img @click="isShowUserProfileMenu = isShowUserProfileMenu ? false : true" :src="'../assets/img/boy-icon-png-10.jpg'" class="w-9 ml-3 cursor-pointer" alt="">

					<div v-if="isShowUserProfileMenu" class="user-drop-container absolute -right-5 top-10 z-50">
						<div class="bg-white shadow-md border middle rounded pl-4 pr-10 py-3 text-left">
							<div @click.prevent="logout()" class="flex items-center cursor-pointer">
								<svg xmlns="http://www.w3.org/2000/svg" class="w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
								</svg>
								<p class="text-sm">Logout</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import Header from './function.vue'
	export default Header
</script>