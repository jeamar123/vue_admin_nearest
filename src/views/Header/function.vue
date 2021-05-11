<script>
	import axios from 'axios';

	var Header = {
		components:	{
		},
		props: {
			title: String,
			toggleSidemenu: Function
		},
		data() {
			return {
				requestedHeaders: {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem("auth_token"),
					}
				},
				routeName : this.title ? this.title : this.$route.name,
				isShowUserProfileMenu: false,
				adminDetails: {},
			}
		},
		created() {
			this.initializeShowHideListener();
			this.getAdmin();
		},
		methods: {
			/*
			 * For ShowHide Toggle Event Listeners
			 */
      initializeShowHideListener()	{
				let vm = this
				window.addEventListener("click",function(e){
					if(vm.isShowUserProfileMenu){
						var el = e.target;
						var parentSelector = document.getElementsByClassName('user-header-toggle')[0];
						if (parentSelector === undefined) {
							parentSelector = document;
						}
						var p = el.parentNode;
						var parentMatch = false;
						if(p == parentSelector){
							parentMatch = true;
						}else{
							while (p !== parentSelector) {
								var o = p;
								if(o == null){
									break;
								}
								p = o.parentNode;
								if(p == parentSelector){
									parentMatch = true;
								}
							}
						}
						vm.isShowUserProfileMenu = parentMatch;
					}
				});
			},
			logout(){
				this.$swal({
					title: 'Confirm!',
					text: 'Are you sure you want to logout?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Yes',
					cancelButtonText: 'No',
				})
				.then((res)	=>	{
					console.log(res);
					if(res.value){
						this.$auth.logout({
							success() {},
							error() {},
							redirect: "/login"
						});
					}
				});
			},
			getAdmin(){
				let vm = this
				axios.get(`/admin?id=${vm.requestedHeaders.headers.Authorization}`, vm.requestedHeaders)
        .then((res) => {
          console.log(res);
          if(res.data.status){
						console.log(res);
						vm.adminDetails = res.data.user;
          }else{
            vm.$swal('Error', res.data.message, 'error');
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          vm.$swal('Error', err.response.data.message, 'error');
        })
			}
    }
	}
	export default Header
</script>