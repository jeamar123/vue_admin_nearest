<template>
	<div class="users-container w-full h-screen px-4">
		<Header />
		<Loader v-if="showLoader"/>

		<div class="users-content overflow-auto card px-6 py-4">
			<div class="flex">
				<button @click.prevent="toggleModals(true, 'add')" class="btn flex rounded text-sm font-bold items-center py-2 px-3 bg-c-secondary text-white cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
					</svg>
					Add User
				</button>

				<button @click.prevent="toggleModals(true, 'upload')" class="btn flex rounded text-sm font-bold items-center py-2 px-3 bg-c-secondary text-white cursor-pointer ml-3">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
					</svg>
					Upload
				</button>
			</div>
			<table class="tbl w-full mt-4">
				<thead>
					<tr>
						<td class="font-bold py-2 pr-4 border-b w-28">Image</td>
						<td class="font-bold py-2 pr-4 border-b">Full Name</td>
						<td class="font-bold py-2 pr-4 border-b">Email</td>
						<td class="font-bold py-2 pr-4 border-b">Username</td>
						<td class="font-bold py-2 pr-4 border-b">Mobile</td>
						<td class="font-bold py-2 pr-4 border-b">Date Registered</td>
						<td class="font-bold py-2 pr-4 w-20 border-b text-right">Options</td>
					</tr>
				</thead>
				<tbody>
					<tr v-if="usersArr.length == 0">
						<td colspan="6" class="text-center font-bold text-2xl py-10">No Record</td>
					</tr>
					<tr v-for="list in usersArr" :key="list.index">
						<td class="py-4 pr-4 border-b text-sm">
							<img :src="list.image || '../assets/img/noimage.png'" class="w-16 h-16 border rounded-full" alt="">
						</td>
						<td class="py-4 pr-4 border-b text-sm capitalize">{{ list.first_name + ' ' + list.last_name }}</td>
						<td class="py-4 pr-4 border-b text-sm">{{ list.email }}</td>
						<td class="py-4 pr-4 border-b text-sm">{{ list.username }}</td>
						<td class="py-4 pr-4 border-b text-sm">{{ list.mobile }}</td>
						<td class="py-4 pr-4 border-b text-sm">{{ list.created_at | moment('MMM DD, YYYY') }}</td>
						<td class="border-b">
							<button @click="goToShopDetails(list)" class="btn flex rounded font-bold items-center py-3 px-6 bg-c-secondary text-white cursor-pointer">
								Details
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<Modal 
			v-model="isShowAddUserModal" 
			title="Create User"
			modal-class="modal-wrapper"
			:enable-close="false"
		>
			<AddUserModal :closeModal="toggleModals" :modalSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>

		<Modal 
			v-model="isShowUploadModal" 
			title="Upload User(s)"
			modal-class="modal-wrapper max-w-none md:w-6/12"
			
		>
			<UploadModal :closeModal="toggleModals" :modalSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import Users from './function.vue'
	export default Users
</script>