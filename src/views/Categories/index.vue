<template>
	<div class="categories-container w-full h-screen px-4">
		<Header />
		<Loader v-if="showLoader"/>

		<div class="categories-content overflow-auto card px-6 py-4">
			<div class="flex">
				<button @click.prevent="toggleModals(true, 'add')" class="btn flex rounded text-sm font-bold items-center py-2 px-3 bg-c-secondary text-white cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
					</svg>
					Add Category
				</button>
			</div>
			<table class="tbl w-full mt-4">
				<thead>
					<tr>
						<td class="font-bold py-2 pr-4 border-b">Name</td>
						<td class="font-bold py-2 pr-4 w-20 border-b text-right">Options</td>
					</tr>
				</thead>
				<tbody>
					<tr v-if="categoriesArr.length == 0">
						<td colspan="6" class="text-center font-bold text-2xl py-10">No Record</td>
					</tr>
					<tr v-for="list in categoriesArr" :key="list.index">
						<td class="py-4 pr-4 border-b text-sm capitalize">{{ list.name }}</td>
						<td class="py-4 border-b flex items-center justify-end">
							<button @click="toggleModals(true, 'update', list)" class="btn flex rounded font-bold items-center py-3 px-6 bg-c-secondary text-white cursor-pointer ml-4">
								Edit
							</button>
							<button @click="deleteCategory(list)" class="btn flex rounded font-bold items-center py-3 px-6 bg-c-secondary text-white cursor-pointer ml-4 opacity-80">
								Delete
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<Modal 
			v-model="isShowAddCategoryModal" 
			title="Create Category"
			modal-class="modal-wrapper"
			:enable-close="false"
		>
			<AddCategoryModal :closeModal="toggleModals" :modalSuccess="refreshData" :toggleLoader="toggleLoader"/>
		</Modal>
		
		<Modal 
			v-model="isShowUpdateCategoryModal" 
			title="Update Category"
			modal-class="modal-wrapper"
			:enable-close="false"
		>
			<UpdateCategoryModal :closeModal="toggleModals" :modalSuccess="refreshData" :toggleLoader="toggleLoader" :selectedCategory="selectedCategory"/>
		</Modal>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import Categories from './function.vue'
	export default Categories
</script>