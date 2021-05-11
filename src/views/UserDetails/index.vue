<template>
	<div class="user-details-container w-full h-screen px-4">
		<Header />
		<Loader v-if="showLoader"/>

		<div class="user-details-content card px-6 py-4">
			
		</div>

	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import UserDetails from './function.vue'
	export default UserDetails
</script>