<script>
	import { Loader } from '../../components/Loader'
	import { Header } from '../Header'
	import AddUserModal from './modals/AddUserModal.vue'
	import UpdateUserModal from './modals/UpdateUserModal.vue'

	import axios from 'axios'
	
	var Settings = {
		components:{
			Loader,
			Header,
			AddUserModal,
			UpdateUserModal,
		},
		data() {
			return {
				requestedHeaders: {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem("auth_token"),
					}
				},
				showLoader : false,
				adminsArr : [],
				isShowAddUserModal: false,
				isShowUpdateUserModal: false,
				selectedAdmin: {},
			}
		},
		created() {
			this.getAdmins();
		},
		methods: {
      toggleLoader(opt) {
				let vm = this
      	vm.showLoader = opt;
      },
			getAdmins(){
				let vm = this
				vm.toggleLoader(true);
				axios.get(`/admin`, vm.requestedHeaders)
        .then((res) => {
          console.log(res);
          if(res.data.status){
						vm.adminsArr = res.data.users;
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
			toggleModals(opt, type, data)	{
				let vm = this
				vm.isShowAddUserModal = type == 'add' ? opt : false;
				vm.isShowUpdateUserModal = type == 'update' ? opt : false;

				if(type == 'update'){
					vm.selectedAdmin = data;
				}
			},
			refreshData(type)	{
				let vm = this
				vm.isShowAddUserModal = false;
				vm.isShowUpdateUserModal = false;

				if(type == 'add' || type == 'update'){
					vm.getAdmins();
				}
				vm.toggleLoader(false);
			},
			deleteAdmin(data){
				let vm = this;
				this.$swal({
					title: 'Confirm!',
					text: 'Are you sure you want to delete this admin?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Yes',
					cancelButtonText: 'No',
				})
				.then((res)	=>	{
					console.log(res);
					if(res.value){
						vm.toggleLoader(true);
						axios.delete(`/admin/delete/${data._id}`, vm.requestedHeaders)
						.then((res) => {
							console.log(res);
							if(res.data.status){
								vm.$swal('Success!', res.data.message, 'success');
								vm.getAdmins();
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
				});
			},
    }
	}
	export default Settings
</script>