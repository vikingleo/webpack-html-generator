import Vue from 'vue'
import 'lib-flexible'
import 'swiper/swiper.scss'
import '../../assets/css/style.scss'

export default {
	name: 'index',
	el: '#app',
	data() {
		return {
			pagetitle: 'index'
		}
	},
	mounted() {
		console.log('is mounted')
	},
	methods: {
	}
}