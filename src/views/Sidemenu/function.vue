<script>
	// import axios from 'axios'
	var Sidemenu = {
		props:	{
			toggleSidemenu: Function,
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
		async created() {
		},
		methods: {
			logout(){
				this.$swal({
					title: 'Confirm!',
					text: 'Are you sure you want to logout?',
					icon: 'warning',
					showCancelButton: true,
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
			}
    }
	}
	export default Sidemenu
</script>