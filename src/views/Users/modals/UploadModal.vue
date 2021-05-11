<template>
  <div>
    <button @click.prevent="downloadExcelTemplate()" class="btn flex rounded text-sm font-bold items-center py-2 px-3 bg-c-secondary text-white cursor-pointer mb-5">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
      Download Template
    </button>

    <div class="border-2 border-dashed rounded-md w-full h-60 p-5 text-gray-400 flex flex-col justify-center items-center relative">
      <input ref="excelInputFile" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" @change="uploadExcel($event)" class="absolute top-0 left-0 w-full h-full opacity-0">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-14 mx-auto my-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <p class="text-center text-lg font-bold">Drag or click to upload</p>
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
  	}
  },
  created() {
  },
  methods: {
    downloadExcelTemplate(){
      window.open(`${process.env.VUE_APP_URL}excel_templates/upload_users.xlsx`);
    },
    uploadExcel(ev){
      let vm = this
      if(ev.target.files.length > 0){
        var formData = new FormData();
        formData.append('file', ev.target.files[0]);
        vm.$refs.excelInputFile.value = null;
        vm.toggleLoader(true);
        axios.post(`/user/upload_users`, formData, vm.requestedHeaders)
        .then((res) => {
          console.log(res);
          if(res.data.status){
            vm.$swal('Success', res.data.message, 'success');
            vm.modalSuccess('upload');
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
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>
