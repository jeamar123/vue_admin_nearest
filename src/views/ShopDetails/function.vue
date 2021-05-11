<script>
	import { Loader } from '../../components/Loader'
	import { Header } from '../Header'

	import axios from 'axios'
	
	var ShopDetails = {
		components:{
			Loader,
			Header,
		},
		data() {
			return {
				requestedHeaders: {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem("auth_token"),
					}
				},
				showLoader : false,
				shopDetails: {},
				isEditMode: false,
				updateFormData: {},
				timeArr: [],
				currentLocation: {
					lat: 0,
					lng: 0
				},
				markers: [],
				formErrors: [],
				errMsg: [],
				selectAllDayHours: false,
			}
		},
		created() {
			this.getShopInfo();
			this.getTimeList();
		},
		methods: {
      toggleLoader(opt) {
				let vm = this
      	vm.showLoader = opt;
      },
			getTimeList(){
				let vm = this
				fetch('../assets/json/timeList.json')
					.then(resp => resp.json()) // Transform the data into JSON
					.then(res => {
						vm.timeArr = res.time_list;
					})
			},
			getShopInfo(){
				let vm = this
				vm.toggleLoader(true);
				axios.get(`/shops?_id=${vm.$route.params.id}`, vm.requestedHeaders)
        .then((res) => {
          console.log(res);
          if(res.data.status){
						vm.shopDetails = res.data.shop;
						vm.shopDetails.business_hours = JSON.parse(vm.shopDetails.business_hours);
						vm.shopDetails.category = JSON.parse(vm.shopDetails.category);
						vm.shopDetails.status = vm.shopDetails.status == 1 ? true : false;
						let shopLocation = {
							lat: vm.shopDetails.latitude,
							lng: vm.shopDetails.longitude,
						};
						vm.currentLocation = shopLocation;
						vm.markers = [shopLocation];
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
			deleteShop(){
				let vm = this

				this.$swal({
					title: 'Confirm!',
					text: 'Are you sure you want to delete this shop?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Yes',
					cancelButtonText: 'No',
				})
				.then((res)	=>	{
					console.log(res);
					if(res.value){
						vm.toggleLoader(true);
						axios.delete(`/shops/delete/${vm.$route.params.id}`, vm.requestedHeaders)
						.then((res) => {
							console.log(res);
							if(res.data.status){
								vm.$router.replace({ name: 'Shops' });
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
			uploadImage(ev){
				let vm = this
				if(ev.target.files.length > 0){
					var formData = new FormData();
					formData.append('_id', vm.$route.params.id);
					formData.append('image', ev.target.files[0]);
					console.log(formData);
					vm.toggleLoader(true);
					axios.post(`/shops/upload_image`, formData, vm.requestedHeaders)
					.then((res) => {
						console.log(res);
						if(res.data.status){
							vm.shopDetails.image = res.data.file;
							vm.$swal('Success', res.data.message, 'success');
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
			},
			toggleEditMode(opt){
				let vm = this
				vm.isEditMode = opt;

				if(opt == true){
					vm.updateFormData = {
						address: vm.shopDetails.address,
						business_hours: vm.shopDetails.business_hours,
						category: vm.shopDetails.category,
						description: vm.shopDetails.description,
						latitude: vm.shopDetails.latitude,
						longitude: vm.shopDetails.longitude,
						name: vm.shopDetails.name,
						status: "Active",
						_id: vm.shopDetails._id
					};
				}else{
					vm.updateFormData = {};
				}
			},
			updateMarker(position){
				let vm = this
				if(vm.isEditMode){
					vm.updateFormData.latitude = position.latLng.lat();
					vm.updateFormData.longitude = position.latLng.lng();
					vm.markers = [{
						lat: vm.updateFormData.latitude,
						lng: vm.updateFormData.longitude
					}];
				}
			},
			toggleShopStatus(){
				let vm = this
				vm.shopDetails.status = vm.shopDetails.status ? false : true;
				vm.$forceUpdate();
				vm.updateShopStatus(vm.shopDetails.status);
			},
			checkForm(formData){
				let vm = this
				vm.formErrors = [];
				vm.errMsg = [];
				let required = [
					// 'image',
					'name',
					'address',
					'businessHours',
				];
				let err = 0;
				required.map((key)  =>  {
					if(key == 'businessHours'){
						if(vm._.find(vm.shopDetails.business_hours, { 'active': true }) == undefined){
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
			updateShopDetails(){
				let vm = this

				if(vm.checkForm(vm.updateFormData) == false){
					return false;
				}
				var data  = {
					_id : vm.updateFormData._id,
					name : vm.updateFormData.name,
					address : vm.updateFormData.address,
					longitude : vm.updateFormData.longitude,
					latitude : vm.updateFormData.latitude,
					business_hours: JSON.stringify(vm.updateFormData.business_hours),
				}
				vm.toggleLoader(true);
				axios.put(`/shops/update`, data, vm.requestedHeaders )
					.then(res => {
						console.log(res);
						if(res.data.status){
							vm.getShopInfo();
							vm.isEditMode = false;
							vm.$swal('Success!', res.data.message, 'success')
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
			toggleAllDayHours(opt){
				let vm = this
				Object.keys(vm.updateFormData.business_hours).map((index)  =>  {
					vm.updateFormData.business_hours[index].active = opt;
				});
			},
			updateShopStatus(opt){
				let vm = this
				var data  = {
					_id : vm.$route.params.id,
					status : opt,
				}
				vm.toggleLoader(true);
				axios.put(`/shops/update_status`, data, vm.requestedHeaders )
					.then(res => {
						console.log(res);
						if(res.data.status){
							vm.getShopInfo();
							vm.isEditMode = false;
							vm.$swal('Success!', res.data.message, 'success')
						}else{
							vm.shopDetails.status = opt == true ? false : true;
							vm.$swal('Error!', res.data.message, 'error')
						}
						vm.toggleLoader(false);
					})
					.catch((err) => {
						console.log(err);
						console.log(err.response.data.message);
						vm.shopDetails.status = opt == true ? false : true;
						vm.toggleLoader(false);
						vm.$swal('Error', err.response.data.message, 'error');
					})
			},
    }
	}
	export default ShopDetails
</script>