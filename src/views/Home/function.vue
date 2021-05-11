<script>
	import { Loader } from '../../components/Loader'
	import { Header } from '../Header'

	// import axios from 'axios'
	
	var Home = {
		components:{
			Loader,
			Header,
		},
		data() {
			return {
				requestedHeaders: {
					headers: {
						Authorization: localStorage.getItem("auth_token"),
					}
				},
				showLoader : false,
				categoriesArr:	['Entertainment', 'Health', 'Transportation', 'Food', 'Sports'],
			}
		},
		created() {
		},
		methods: {
      toggleLoader(opt) {
				let vm = this
      	vm.showLoader = opt;
      },
			goToShopDetails(shop){
				let vm = this;
				vm.$router.push({ name: 'ShopInfo', params: { shop: shop } });
			},
    }
	}
	export default Home
</script>