<template>
  <div>
    <form @submit.prevent="submitCategory()" class="">
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
      

      <div class="text-right mt-10">
        <button @click.prevent="closeModal(false, 'add')" class="btn px-6 py-3 mx-1 secondary text-black rounded-md">Close</button>
        <button class="btn px-6 py-3 mx-1 bg-c-primary text-white rounded-md">Submit</button>
      </div>
    </form>
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
  	}
  },
  created() {
  },
  methods: {
    checkForm(formData){
      let vm = this
      vm.formErrors = [];
      vm.succMsg = '';
      vm.errMsg = [];
      let required = [
        'name',
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
      return err > 0 ? false : true;
    },
		submitCategory() {
      let vm = this

      if(vm.checkForm(vm.formData) == false){
        return false;
      }
      var data  = {
        name : vm.formData.name,
      }
      vm.toggleLoader(true);
      axios.post(`/categories`, data, vm.requestedHeaders )
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
  }
}
</script>

<style lang="scss" scoped>
  
</style>
