<template>
  <div>
    <div class="flex">
      <div class="mr-10">
        <div class="input-div w-full mb-4">
          <label for="" class="text-gray-500 font-bold text-xs block">
            Profile Picture
          </label>
          <div 
            class="border rounded relative inline-block h-40 w-40 cursor-pointer"
            :class="{'border-c-error' : formErrors.indexOf('image') != -1}"
          >
            <input type="file" accept="image/*" @change="selectImage($event)" class="absolute top-0 left-0 w-full h-full opacity-0">

            <img :src="imageThumbnail || 'assets/img/noimage.png'" alt="" class="h-full ">
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div class="input-div w-full mb-4">
          <label for="" class="text-gray-500 font-bold text-xs">
            First Name
          </label>
          <input 
            type="text" 
            v-model="formData.first_name" 
            class="w-full p-3 text-sm font-normal rounded border"
            autocomplete="none"
            :class="{'border-c-error' : formErrors.indexOf('first_name') != -1}"
          >
        </div>

        <div class="input-div w-full mb-4">
          <label for="" class="text-gray-500 font-bold text-xs">
            Last Name
          </label>
          <input 
            type="text" 
            v-model="formData.last_name" 
            class="w-full p-3 text-sm font-normal rounded border"
            autocomplete="none"
            :class="{'border-c-error' : formErrors.indexOf('last_name') != -1}"
          >
        </div>
      </div>
    </div>

    <div class="input-div w-full mb-4">
      <label for="" class="text-gray-500 font-bold text-xs">
        Email
      </label>
      <input 
        type="text" 
        v-model="formData.email" 
        class="w-full p-3 text-sm font-normal rounded border"
        autocomplete="none"
        :class="{'border-c-error' : formErrors.indexOf('email') != -1}"
      >
    </div>

    <div class="input-div w-full mb-4">
      <label for="" class="text-gray-500 font-bold text-xs">
        Mobile
      </label>
      <input 
        type="text" 
        v-model="formData.mobile" 
        class="w-full p-3 text-sm font-normal rounded border"
        autocomplete="none"
        :class="{'border-c-error' : formErrors.indexOf('mobile') != -1}"
      >
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
        placeholder="optional"
      >
      </textarea>
    </div>

    <div class="input-div w-full mb-4">
      <label for="" class="text-gray-500 font-bold text-xs">
        Password
      </label>
      <input 
        type="password" 
        v-model="formData.password" 
        class="w-full p-3 text-sm font-normal rounded border"
        autocomplete="none"
        :class="{'border-c-error' : formErrors.indexOf('password') != -1}"
      >
    </div>
    
    <p v-for="list in errMsg" :key="list.index" class="my-2 text-red-400 font-bold  text-center">{{ list }}</p>

    <div class="text-right mt-10">
      <button @click.prevent="closeModal(false, 'add')" class="btn px-6 py-3 mx-1 secondary text-black rounded-md">Close</button>
      <button @click="submitUser()" class="btn px-6 py-3 mx-1 bg-c-primary text-white rounded-md">Submit</button>
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
      formData: {},
      formErrors: [],
      errMsg: [],
      succMsg: '',
      imageThumbnail: null,
  	}
  },
  created() {
  },
  methods: {
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    checkForm(formData){
      let vm = this
      vm.formErrors = [];
      vm.succMsg = '';
      vm.errMsg = [];
      let required = [
        'first_name',
        'last_name',
        'email',
        'mobile',
        'password',
      ];
      let err = 0;
      required.map((key)  =>  {
        if(!formData[key]) {
          err += 1;
          vm.formErrors.push(key);
        }
      });
      if(err > 0){
        vm.errMsg.push('Please input all fields.');
      }
      if(vm.formData.email && vm.validateEmail(vm.formData.email) == false){
        vm.errMsg.push('Email invalid format');
        vm.formErrors.push('email');
        err += 1;
      }
      return err > 0 ? false : true;
    },
		submitUser() {
      let vm = this

      if(vm.checkForm(vm.formData) == false){
        return false;
      }
      var data  = {
        image: vm.formData.image,
        first_name : vm.formData.first_name,
        last_name : vm.formData.last_name,
        mobile : vm.formData.mobile,
        email : vm.formData.email,
        password : vm.formData.password,
      }
      console.log(data);
      let formData = new FormData();
      Object.keys(data).map((key)  =>  {
        formData.append(key, data[key]);
      })
      vm.toggleLoader(true);
      axios.post(`/user/register`, formData, vm.requestedHeaders )
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
    selectImage(ev){
      let vm = this
      if(ev.target.files.length > 0){
        vm.formData.image = ev.target.files[0];
        vm.imageThumbnail = URL.createObjectURL(vm.formData.image);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  
</style>
