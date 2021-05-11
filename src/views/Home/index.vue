<template>
	<div class="home-container w-full h-screen px-4">
		<Header />
		<Loader v-if="showLoader"/>
		
		<div class="home-content-container card px-6 py-4">
			
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import Home from './function.vue'
	export default Home
</script>