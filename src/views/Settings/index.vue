<template>
	<div class="settings-container w-full h-screen">
		<Header />
		<Loader v-if="showLoader"/>

		<div class="border-b-2 mx-4"></div>

		<div class="settings-content overflow-auto p-4">
			
			<div class="2xl:w-6/12 w-8/12">
				<h4 class="font-bold text-xl mb-5">Admins</h4>

				<div class="card p-4">
					<div class="flex">
						<button @click.prevent="toggleModals(true, 'add')" class="btn flex rounded text-sm font-bold items-center py-2 px-3 bg-c-secondary text-white cursor-pointer">
							<svg xmlns="http://www.w3.org/2000/svg" class="w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
							</svg>
							Add Admin
						</button>
					</div>
					<table class="tbl w-full mt-4">
						<thead v-if="adminsArr.length > 0">
							<tr>
								<td class="font-bold py-2 pr-4 border-b">Name</td>
								<td class="font-bold py-2 pr-4 border-b">Email</td>
								<td class="font-bold py-2 pr-4 border-b">Last login</td>
								<td class="font-bold py-2 pr-4 w-20 border-b"></td>
							</tr>
						</thead>
						<tbody>
							<tr v-if="adminsArr.length == 0">
								<td colspan="6" class="text-center font-bold text-2xl py-10">No Record</td>
							</tr>
							<tr v-for="list in adminsArr" :key="list.index">
								<td class="py-4 pr-4 border-b text-sm">{{ list.first_name + ' ' + list.last_name }}</td>
								<td class="py-4 pr-4 border-b text-sm">{{ list.email }}</td>
								<td class="py-4 pr-4 border-b text-sm">{{ list.last_login | moment('hh:mm A, MMM DD, YYYY') }}</td>
								<td class="py-4 pr-4 border-b flex items-center">
									<button @click="toggleModals(true, 'update', list)" class="btn flex rounded font-bold items-center py-2 px-4 text-sm bg-c-secondary text-white cursor-pointer ml-2">
										Edit
									</button>
									<button @click="deleteAdmin(list)" class="btn flex rounded font-bold items-center py-2 px-4 text-sm bg-c-secondary text-white cursor-pointer ml-2">
										Delete
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

		</div>


		<Modal 
			v-model="isShowAddUserModal" 
			title="Create Admin"
			modal-class="modal-wrapper"
			:enable-close="false"
		>
			<AddUserModal :closeModal="toggleModals" :modalSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>

		<Modal 
			v-model="isShowUpdateUserModal" 
			title="Update Admin"
			modal-class="modal-wrapper"
			:enable-close="false"
		>
			<UpdateUserModal :selectedAdmin="selectedAdmin" :closeModal="toggleModals" :modalSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>

	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import Settings from './function.vue'
	export default Settings
</script>