<script>
	import { Loader } from '../../components/Loader'
	import { Header } from '../Header'
	import AddUserModal from './modals/AddUserModal.vue'
	import UploadModal from './modals/UploadModal.vue'

	import axios from 'axios'
	
	var Users = {
		components:{
			Loader,
			Header,
			AddUserModal,
			UploadModal,
		},
		data() {
			return {
				requestedHeaders: {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem("auth_token"),
					}
				},
				showLoader : false,
				usersArr:	[],
				isShowAddUserModal: false,
				isShowUploadModal: false,
			}
		},
		created() {
			this.getUsers();
		},
		methods: {
      toggleLoader(opt) {
				let vm = this
      	vm.showLoader = opt;
      },
			getUsers(){
				let vm = this
				vm.toggleLoader(true);
				axios.get(`/user`, vm.requestedHeaders)
        .then((res) => {
          console.log(res);
          if(res.data.status){
						vm.usersArr = res.data.users;
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
			toggleModals(opt, type)	{
				let vm = this
				vm.isShowAddUserModal = type == 'add' ? opt : false;
				vm.isShowUploadModal = type == 'upload' ? opt : false;
			},
			refreshData(type)	{
				let vm = this
				vm.isShowAddUserModal = false;
				vm.isShowUploadModal = false;
				if(type == 'add' || type == 'upload'){
					vm.getUsers();
				}
				vm.toggleLoader(false);
			},
    }
	}
	export default Users
</script>