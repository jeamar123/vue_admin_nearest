<script>
	import { Loader } from '../../components/Loader'
	import { Header } from '../Header'
	import AddShopModal from './modals/AddShopModal.vue'
	import UploadModal from './modals/UploadModal.vue'

	import axios from 'axios'
	
	var Shops = {
		components:{
			Loader,
			Header,
			AddShopModal,
			UploadModal
		},
		data() {
			return {
				requestedHeaders: {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem("auth_token"),
					}
				},
				showLoader : false,
				shopsArr:	[],
				isShowAddShopModal: false,
				isShowUploadModal: false,
				shopSelected: {},
			}
		},
		created() {
			this.getShopList();
		},
		methods: {
      toggleLoader(opt) {
				let vm = this
      	vm.showLoader = opt;
      },
			goToShopDetails(shop){
				let vm = this;
				vm.$router.push({ name: 'ShopDetails', params: { id: shop._id } });
			},
			getShopList(){
				let vm = this
				vm.toggleLoader(true);
				axios.get(`/shops`, vm.requestedHeaders)
        .then((res) => {
          console.log(res);
          if(res.data.status){
						vm.shopsArr = res.data.shops;
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
				vm.isShowAddShopModal = type == 'add' ? opt : false;
				vm.isShowUploadModal = type == 'upload' ? opt : false;
			},
			refreshData(type)	{
				let vm = this
				vm.isShowAddShopModal = false;
				vm.isShowUploadModal = false;

				if(type == 'add' || type == 'upload'){
					vm.getShopList();
				}
				vm.toggleLoader(false);
			},
    }
	}
	export default Shops
</script>