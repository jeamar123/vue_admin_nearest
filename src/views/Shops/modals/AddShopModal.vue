<template>
  <div>
      <div class="flex w-full">
        <div class="w-1/2 mr-4">
          <div class="input-div w-full mb-4">
            <label for="" class="text-gray-500 font-bold text-xs block mb-3">
              Cover Image
            </label>
            <div 
              class="border rounded relative w-auto inline-block h-64 cursor-pointer"
              :class="{'border-c-error' : formErrors.indexOf('image') != -1}"
            >
              <input type="file" accept="image/*" @change="selectImage($event)" class="absolute top-0 left-0 w-full h-full opacity-0">

              <img :src="imageThumbnail || 'assets/img/noimage.png'" alt="" class="h-full">
            </div>
          </div>

          <div class="input-div w-full mb-4">
            <label for="" class="text-gray-500 font-bold text-xs">
              Name
            </label>
            <input 
              type="text" 
              v-model="formData.name" 
              class="w-full p-3 text-sm font-normal rounded border"
              autocomplete="none"
              :class="{'border-c-error' : formErrors.indexOf('name') != -1}"
            >
          </div>

          <div class="input-div w-full mb-4">
            <label for="" class="text-gray-500 font-bold text-xs">
              Business category
            </label>
            
            <!-- <select 
              v-model="formData.category" 
              class="w-full p-3 text-sm font-normal rounded border"
              autocomplete="none"
              :class="{'border-c-error' : formErrors.indexOf('name') != -1}"
            >
              <option value="">Food</option>
              <option value="">Books</option>
              <option value="">Cars</option>
              <option value="">Entertainment</option>
              <option value="">Others</option>
            </select> -->
            <div class="relative flex w-full p-2 rounded border" tabindex="0" @blur="isCategoryListShow = false" :class="{'border-c-error' : formErrors.indexOf('category') != -1}">
              <div class="flex"> 
                <div v-for="(list, index) in categoryArr" :key="list.index" class="rounded pl-3 pr-1 py-1 mr-1 bg-gray-500 text-white text-sm flex items-center">
                  {{ list }} 
                  <span @click="removeSelectedCategory(index)" class="cursor-pointer ml-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
              <input type="text" class="flex-1" v-model="categoryInput" @focus="isCategoryListShow = true"  autocomplete="none" >

              <div 
                class="absolute top-12 left-0 w-full max-h-32 bg-gray-200 overflow-auto"
                :class="{
                  'hidden' : !isCategoryListShow
                }"
              >
                <div v-if="filteredCategoryList.length == 0 && categoryInput.length != 0" class="px-3 py-2 text-sm cursor-pointer hover:bg-gray-300 italic" @click="selectCategory(categoryInput)">
                  New Category: {{ categoryInput }}
                </div>
                <div 
                  v-for="list in filteredCategoryList" 
                  :key="list.index" 
                  class="px-3 py-2 text-sm cursor-pointer hover:bg-gray-300" 
                  :class="{'hidden' : categoryArr.indexOf(list.name) > -1}"
                  @click="selectCategory(list.name)">{{ list.name }}</div>
              </div>
            </div>
          </div>

          <div class="input-div w-full mb-4">
            <label for="" class="text-gray-500 font-bold text-xs">
              Address
            </label>
            <textarea 
              rows="3" 
              v-model="formData.address" 
              class="w-full p-3 text-sm font-normal rounded border"
              autocomplete="none"
              style="resize: none;"
              :class="{'border-c-error' : formErrors.indexOf('address') != -1}"
            >
            </textarea>
          </div>

          <div class="input-div w-full mb-4">
            <label for="" class="text-gray-500 font-bold text-xs">
              Description
            </label>
            <textarea 
              rows="3" 
              v-model="formData.description" 
              class="w-full p-3 text-sm font-normal rounded border"
              autocomplete="none"
              style="resize: none;"
              :class="{'border-c-error' : formErrors.indexOf('description') != -1}"
            >
            </textarea>
          </div>

          <div class="flex items-center mt-14">
            <div 
              class="toggle-btn-div flex border-2 rounded items-center w-20 cursor-pointer"
              :class="{'border-gray-300': !formData.status, 'border-c-primary': formData.status}"
              @click="toggleShopStatus()"
            >
              <div 
                class="w-1/2 py-1"
                :class="{'bg-c-primary rounded-r-sm': formData.status}"
              >
                <svg :class="{'text-gray-300': !formData.status, 'text-c-primary': formData.status}" xmlns="http://www.w3.org/2000/svg" class="mx-auto w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div 
                class="w-1/2 py-1 border-l border-gray-100"
                :class="{'bg-gray-300 rounded-l-sm': !formData.status}"
              >
                <svg :class="{'text-gray-300': !formData.status, 'text-c-primary': formData.status}" xmlns="http://www.w3.org/2000/svg" class="mx-auto w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <label for="" class="font-bold ml-3">
              Status: <span class="inline-block ml-2" :class="{'text-gray-300': !formData.status, 'text-c-primary': formData.status}">{{ formData.status ? 'Active' : 'Inactive' }}</span> 
            </label>
           
          </div>
        </div>
        <div class="w-2/3 ml-4">
          <div id="map-container" class="w-full mb-4">
            <label for="" class="text-gray-500 font-bold text-xs block mb-3">
              Select location
            </label>
            <p v-if="formErrors.indexOf('latitude') != -1 || formErrors.indexOf('longitude') != -1" class="text-c-error my-4">Please set your location.</p>
            <GmapMap
              :center="currentLocation"
              :zoom="12"
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
                :draggable="true"
                @dragend="updateMarker"
              />
            </GmapMap>
          </div>

          <div class="flex w-full mb-8">
            <div class="input-div w-1/2 mb-2 mr-2">
              <label for="" class="text-gray-500 font-bold text-xs">
                Latitude
              </label>
              <input 
                type="text" 
                v-model="formData.latitude" 
                class="w-full p-3 text-sm font-normal rounded border bg-gray-100"
                autocomplete="none"
                readonly
                :class="{'border-c-error' : formErrors.indexOf('latitude') != -1}"
              >
            </div>
            <div class="input-div w-1/2 mb-2 ml-2">
              <label for="" class="text-gray-500 font-bold text-xs">
                Longitude
              </label>
              <input 
                type="text" 
                v-model="formData.longitude" 
                class="w-full p-3 text-sm font-normal rounded border bg-gray-100"
                autocomplete="none"
                readonly
                :class="{'border-c-error' : formErrors.indexOf('longitude') != -1}"
              >
            </div>
          </div>


          <label for="" class="text-gray-500 font-bold text-xs mb-3 block">
            Business hours
          </label>
          <p v-if="formErrors.indexOf('selectedHours') != -1" class="text-c-error mb-4">Please select at least one.</p>
          <div class="w-full mb-4">
            <div class="input-div-checkbox mb-3 flex items-center">
              <div class="w-5/12 flex items-center">
                <input id="all" type="checkbox" v-model="selectAllDayHours" @change="toggleAllDayHours(selectAllDayHours)">
                <label for="all" class="text-sm">Select All</label>
              </div>
            </div>
            <div v-for="(weekday, index) in businessHours" :key="weekday.index" class="input-div-checkbox mb-3 flex items-center">
              <div class="w-5/12 flex items-center">
                <input :id="index" type="checkbox" v-model="weekday.active">
                <label :for="index" class="text-sm">{{ index }}</label>
              </div>
              <div v-if="weekday.active" class="w-7/12 flex items-center">
                <div class="w-4/12">
                  <select class="w-full border-b text-sm" v-model="weekday.start">
                    <option v-for="list in timeArr" :key="list.index">{{ list }}</option>
                  </select>
                </div>
                <div class="w-4/12 text-center text-xs font-bold">to</div>
                <div class="w-4/12">
                  <select class="w-full border-b text-sm" v-model="weekday.end">
                    <option v-for="list in timeArr" :key="list.index">{{ list }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
      

      <div class="text-right mt-10">
        <button @click.prevent="closeModal(false, 'add')" class="btn px-6 py-3 mx-1 secondary text-black rounded-md">Close</button>
        <button @click="submitShop()" class="btn px-6 py-3 mx-1 bg-c-primary text-white rounded-md">Submit</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    closeModal: Function,
    modalSuccess: Function,
    toggleLoader: Function,
  },
  data() {
  	return {
      requestedHeaders: {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("auth_token"),
        }
      },
      formData: {
        selectedHours: [],
        status: true,
      },
      currentLocation: {
        lat: 0,
        lng: 0
      },
      formErrors: [],
      errMsg: [],
      succMsg: '',
      weekNames: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
      ],
      timeArr: [],
      markers: [],
      imageThumbnail: null,
      businessHours: {
        monday: { active: true, start: '9:00am', end: '8:00pm' },
        tuesday: { active: true, start: '9:00am', end: '8:00pm' },
        wednesday: { active: true, start: '9:00am', end: '8:00pm' },
        thursday: { active: true, start: '9:00am', end: '8:00pm' },
        friday: { active: true, start: '9:00am', end: '8:00pm' },
        saturday: { active: true, start: '9:00am', end: '8:00pm' },
        sunday: { active: true, start: '9:00am', end: '8:00pm' },
      },
      selectAllDayHours: true,
      categoryInput: '',
      isCategoryListShow: false,
      categoryArr: [],
      categoryList: [],
  	}
  },
  created() {
    setTimeout(() => {
      this.geolocation();
    }, 1000);
    this.getTimeList();
    this.getCategoryList();
  },
  computed: {
    filteredCategoryList: function(){
      if(this.categoryInput != ''){
        return this.categoryList.filter((value) => {
          return value.name.toLowerCase().includes(this.categoryInput); 
        })
      }else{
        return this.categoryList;
      }
    },
  },
  methods: {
    getTimeList(){
      let vm = this
      fetch('../assets/json/timeList.json')
        .then(resp => resp.json()) // Transform the data into JSON
        .then(res => {
          vm.timeArr = res.time_list;
        })
    },
    checkForm(formData){
      let vm = this
      vm.formErrors = [];
      vm.succMsg = '';
      vm.errMsg = [];
      let required = [
        // 'image',
        'name',
        'address',
        'description',
        'selectedHours',
        'latitude',
        'longitude',
        'category',
      ];
      let err = 0;
      required.map((key)  =>  {
        console.log(key);
        if(key == 'selectedHours'){
          if(vm._.find(vm.businessHours, { 'active': true }) == undefined){
            err += 1;
            vm.formErrors.push(key);
          }
        }else if(key == 'category'){
          if(vm.categoryArr.length == 0){
            err += 1;
            vm.formErrors.push(key);
          }
        }else{
          if(!formData[key]) {
            err += 1;
            vm.formErrors.push(key);
          }
        }
      });
      if(err > 0){
        vm.errMsg.push('Please input all fields.');
      }
      return err > 0 ? false : true;
    },
		submitShop() {
      let vm = this

      console.log(vm._.find(vm.businessHours, { 'active': true }));

      if(vm.checkForm(vm.formData) == false){
        return false;
      }
      var data  = {
        image : vm.formData.image,
        name : vm.formData.name,
        address : vm.formData.address,
        longitude : vm.formData.longitude,
        latitude : vm.formData.latitude,
        business_hours: JSON.stringify(vm.businessHours),
        category : JSON.stringify(vm.categoryArr),
        status: vm.formData.status
      }
      let formData = new FormData();
      Object.keys(data).map((key)  =>  {
        formData.append(key, data[key]);
      })
      vm.toggleLoader(true);
      axios.post(`/shops`, formData, vm.requestedHeaders )
        .then(res => {
          console.log(res);
          if(res.data.status){
            vm.$swal('Success!', res.data.message, 'success')
            vm.modalSuccess('add');
          }else{
            vm.$swal('Error!', res.data.message, 'error')
          }
          vm.toggleLoader(false);
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.data.message);
          vm.toggleLoader(false);
          vm.$swal('Error', err.response.data.message, 'error');
        })
		},
    toggleShopStatus(){
      let vm = this
      vm.formData.status = vm.formData.status ? false : true;
      vm.$forceUpdate();
    },
    updateMarker(position){
      let vm = this
      vm.formData.latitude = position.latLng.lat();
      vm.formData.longitude = position.latLng.lng();
      vm.markers = [{
        lat: vm.formData.latitude,
        lng: vm.formData.longitude
      }];
    },
    geolocation(){
      let vm = this
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          vm.currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          console.log(vm.currentLocation);
        },
        (err)  =>{
          console.log(err);
          vm.currentLocation = {
            lat: 8.477760184158099,
            lng: 124.6438021462732,
          }
          this.$forceUpdate();
        }, 
        {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
    },
    selectImage(ev){
      let vm = this
      if(ev.target.files.length > 0){
        vm.formData.image = ev.target.files[0];
        vm.imageThumbnail = URL.createObjectURL(vm.formData.image);
      }
    },
    toggleAllDayHours(opt){
      let vm = this
      Object.keys(vm.businessHours).map((index)  =>  {
        vm.businessHours[index].active = opt;
      });
    },
    categoryInputChanged(value){
      let vm = this
      if(value != ''){
        vm.isCategoryListShow = true;
      }else{
        vm.isCategoryListShow = false;
      }
    },
    selectCategory(value){
      let vm = this
      let index = vm.categoryArr.indexOf(value);
      if(index == -1){
        vm.categoryArr.push(value);
      }
      vm.categoryInput = '';
      vm.isCategoryListShow = false;
    },
    removeSelectedCategory(index){
      let vm = this
      vm.categoryArr.splice(index, 1);
    },
    getCategoryList(){
      let vm = this
      vm.toggleLoader(true);
      axios.get(`/categories`, vm.requestedHeaders)
      .then((res) => {
        console.log(res);
        if(res.data.status){
          vm.categoryList = res.data.categories;
        }else{
          vm.$swal('Error', res.data.message, 'error');
        }
        vm.toggleLoader(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        vm.toggleLoader(false);
        vm.$swal('Error', err.response.data.message, 'error');
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  
</style>
