<template>
	<div class="shop-details-container w-full h-screen">
		<Header title="Shop Info" />
		<Loader v-if="showLoader"/>

		<div class="shop-details-content px-4">
			<div class="card p-6 mb-10">
				<div class="flex relative">
					<div class="w-2/3">
						<div class="h-60 mb-4 relative inline-block">
							
							<img :src="shopDetails.image || '../assets/img/noimage.png'" alt="" class="h-full rounded-xl border">

							<div class="border-2 border-c-primary bg-c-primary text-white absolute rounded-md font-bold bottom-1 right-1 px-6 py-3 opacity-50 hover:opacity-100 cursor-pointer">
								<input type="file" accept="image/*" @change="uploadImage($event)" class="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer">
								Update
							</div>
						</div>
					</div>
					<div class="w-1/3">
						<div class="flex items-center justify-end">
							<label 
								class="text-xl font-bold mr-4 inline-block" 
								:class="{
									'text-gray-300' : !shopDetails.status,
									'text-c-primary' : shopDetails.status,
								}"
							>Activate: </label>
							<div 
								class="toggle-btn-div flex border-2 rounded items-center w-28 h-10 cursor-pointer"
								:class="{'border-gray-300': !shopDetails.status, 'border-c-primary': shopDetails.status}"
								@click="toggleShopStatus()"
							>
								<div 
									class="w-1/2 py-1 h-full flex items-center"
									:class="{'bg-c-primary rounded-r-sm': shopDetails.status}"
								>
									<svg :class="{'text-gray-300': !shopDetails.status, 'text-c-primary': shopDetails.status}" xmlns="http://www.w3.org/2000/svg" class="mx-auto w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</div>
								<div 
									class="w-1/2 py-1 h-full flex items-center border-l border-gray-100"
									:class="{'bg-gray-300 rounded-l-sm': !shopDetails.status}"
								>
									<svg :class="{'text-gray-300': !shopDetails.status, 'text-c-primary': shopDetails.status}" xmlns="http://www.w3.org/2000/svg" class="mx-auto w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
									</svg>
								</div>
							</div>
						</div>
					</div>

				</div>

				<div class="pb-4 mb-4 flex items-center" :class="{'border-b-2' : !isEditMode}">
					<div class="w-2/3">
						<h4 v-if="!isEditMode" class="text-3xl font-bold capitalize mb-3 flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
							</svg>
							{{ shopDetails.name }}
						</h4>
						<input 
							v-if="isEditMode" 
							type="text" 
							v-model="updateFormData.name" 
							class="text-3xl border-b py-3 pr-3 border-gray-400 w-10/12"
							:class="{'border-c-error' : formErrors.indexOf('name') != -1}"
						>
						<!-- <p class="text-lg font-thin text-gray-500 lowercase mb-3">@{{ (shopDetails.name).replace(" ", "_") }}</p> -->
						
						<div v-if="!isEditMode">
							<span v-for="(list, index) in shopDetails.category" :key="list.index" class="font-thin text-gray-500">{{ list }} {{ index != (shopDetails.category.length-1) ? '.' : '' }} </span>
						</div>
					</div>
					<div class="w-1/3 flex justify-end items-center">
						<button v-if="isEditMode" @click.prevent="updateShopDetails()" class="btn flex rounded text-sm font-bold items-center py-2 px-3 bg-c-secondary text-white cursor-pointer ml-2">
							<svg xmlns="http://www.w3.org/2000/svg" class="w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
							</svg>
							Save
						</button>

						<button v-if="isEditMode" @click.prevent="toggleEditMode(false)" class="btn flex rounded text-sm font-bold items-center py-2 px-3 bg-c-secondary text-white cursor-pointer opacity-70 ml-2">
							Cancel
						</button>

						<button v-if="!isEditMode" @click.prevent="toggleEditMode(true)" class="btn flex rounded text-sm font-bold items-center py-2 px-3 bg-c-secondary text-white cursor-pointer ml-2">
							<svg xmlns="http://www.w3.org/2000/svg" class="w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
							</svg>
							Edit
						</button>

						<button v-if="!isEditMode" @click.prevent="deleteShop()" class="btn flex rounded text-sm font-bold items-center py-2 px-3 bg-c-secondary text-white cursor-pointer ml-2">
							<svg xmlns="http://www.w3.org/2000/svg" class="w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
							</svg>
							Delete
						</button>
					</div>
				</div>

				<div class="mb-6 w-6/12">
					<h4 v-if="!isEditMode" class="text-lg font-bold capitalize flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
						{{ shopDetails.address }}
					</h4>
					<textarea 
						v-if="isEditMode" 
						type="text" 
						v-model="updateFormData.address" 
						class="text-lg border-b py-3 pr-3 border-gray-400 w-10/12" 
						style="resize: none;"
						:class="{'border-c-error' : formErrors.indexOf('address') != -1}"
					></textarea>
				</div>

				<div v-if="!isEditMode" class="mb-10 w-8/12">
					<div class="flex items-center">
						<div class="mr-3">
							<font-awesome-icon :icon="['fas', 'star']" class="text-yellow-300 text-2xl" />
							<font-awesome-icon :icon="['fas', 'star']" class="text-yellow-300 text-2xl" />
							<font-awesome-icon :icon="['fas', 'star']" class="text-yellow-300 text-2xl" />
							<font-awesome-icon :icon="['fas', 'star']" class="text-yellow-300 text-2xl" />
							<font-awesome-icon :icon="['far', 'star']" class="text-yellow-300 text-2xl" />
							<!-- <font-awesome-icon :icon="['fas', 'star-half-alt']" class="mr-2 text-yellow-300" size="lg" /> -->
						</div>
						<div>
							<p class="font-bold text-gray-500 text-lg">4.5 ({{ shopDetails.rating }})</p>
						</div>
					</div>
				</div>

				<div class="w-7/12 mb-12">
					<p class="font-bold text-lg mb-3">Business Hours:</p>

					<p v-if="formErrors.indexOf('businessHours') != -1" class="text-c-error mb-4">Please select at least one.</p>

					<div 
						v-if="isEditMode"
						class="flex font-bold mb-2 text-gray-500 text-sm input-div-checkbox"
					>
						<div class="w-1/2 capitalize">
							<div class="w-5/12 flex items-center">
								<input id="all" type="checkbox" v-model="selectAllDayHours" @change="toggleAllDayHours(selectAllDayHours)">
								<label for="all" class="text-sm">Select All</label>
							</div>
						</div>
					</div>

					<div 
						v-for="(list, index) in (isEditMode ? updateFormData.business_hours : shopDetails.business_hours)" 
						:key="list.index" 
						class="flex font-bold mb-2 text-gray-500 text-sm"
						:class="{'input-div-checkbox' : isEditMode}"
					>
						<div class="w-1/2 capitalize">
							<div class="w-5/12 flex items-center">
								<input v-if="isEditMode" :id="index" type="checkbox" v-model="list.active">
								<label :for="index" class="text-sm">{{ index }}</label>
							</div>
						</div>
						<div v-if="!isEditMode" class="w-1/2">
							<span v-if="!list.active">Closed</span>
							<span v-else>{{ list.start }} - {{ list.end }}</span>
						</div>
						<div v-if="isEditMode && list.active" class="w-1/2 flex items-center">
							<div class="w-4/12">
								<select class="w-full border-b text-sm" v-model="list.start">
									<option v-for="time in timeArr" :key="time.index">{{ time }}</option>
								</select>
							</div>
							<div class="w-4/12 text-center text-xs font-bold">to</div>
							<div class="w-4/12">
								<select class="w-full border-b text-sm" v-model="list.end">
									<option v-for="time in timeArr" :key="time.index">{{ time }}</option>
								</select>
							</div>
						</div>
					</div>
				</div>

				<div>
					<h4 class="text-lg font-bold mb-3">Location</h4>

					<div class="map-container w-full border-2 overflow-hidden rounded-lg">
						<GmapMap
							:center="currentLocation"
							:zoom="15"
							:options="{
								zoomControl: true,
								mapTypeControl: true,
								scaleControl: false,
								streetViewControl: false,
								rotateControl: false,
								fullscreenControl: true,
								disableDefaultUI: false
							}"
							style="height: 300px;overflow: hidden;"
							@click="updateMarker"
						>
							<GmapMarker
								:key="index"
								v-for="(list, index) in markers"
								:position="list"
								:draggable="isEditMode ? true : false"
								@dragend="updateMarker"
							/>
						</GmapMap>
					</div>
				</div>
			</div>
			
			<button @click="$router.go(-1)" class="btn border-2 border-c-primary text-c-primary rounded-md py-3 px-6 font-bold mb-8 text-xl">Back to Shop List</button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import "./style.scss";
</style>

<script>
	import ShopDetails from './function.vue'
	export default ShopDetails
</script>