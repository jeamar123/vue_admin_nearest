<script>
	import { Loader } from '../../components/Loader'
	import { Header } from '../Header'
	import AddCategoryModal from './modals/AddCategoryModal.vue'
	import UpdateCategoryModal from './modals/UpdateCategoryModal.vue'

	import axios from 'axios'
	
	var Categories = {
		components:{
			Loader,
			Header,
			AddCategoryModal,
			UpdateCategoryModal,
		},
		data() {
			return {
				requestedHeaders: {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem("auth_token"),
					}
				},
				showLoader : false,
				categoriesArr:	[],
				isShowAddCategoryModal: false,
				isShowUpdateCategoryModal: false,
				selectedCategory: {},
			}
		},
		created() {
			this.getCategoryList();
		},
		methods: {
      toggleLoader(opt) {
				let vm = this
      	vm.showLoader = opt;
      },
			getCategoryList(){
				let vm = this
				vm.toggleLoader(true);
				axios.get(`/categories`, vm.requestedHeaders)
        .then((res) => {
          console.log(res);
          if(res.data.status){
						vm.categoriesArr = res.data.categories;
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
				vm.isShowAddCategoryModal = type == 'add' ? opt : false;
				vm.isShowUpdateCategoryModal = type == 'update' ? opt : false;

				if(type == 'update'){
					vm.selectedCategory = data;
				}
			},
			refreshData(type)	{
				let vm = this
				vm.isShowAddCategoryModal = false;
				vm.isShowUpdateCategoryModal = false;

				if(type == 'add' || type == 'update'){
					vm.getCategoryList();
				}
				vm.toggleLoader(false);
			},
			deleteCategory(data){
				let vm = this;
				this.$swal({
					title: 'Confirm!',
					text: 'Are you sure you want to delete this category?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Yes',
					cancelButtonText: 'No',
				})
				.then((res)	=>	{
					console.log(res);
					if(res.value){
						vm.toggleLoader(true);
						axios.delete(`/categories/delete/${data.id}`, vm.requestedHeaders)
						.then((res) => {
							console.log(res);
							if(res.data.status){
								vm.$swal('Success!', res.data.message, 'success');
								vm.getCategoryList();
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
	export default Categories
</script>