const app = Vue.createApp({
	data() {
		return {
			brand: "NESPRESSO",
			action: "Achat de café",
			description: "L’histoire de NESPRESSO est une passion inaltérable pour la perfection et d’une quête inlassable d’innovation en faveur de la plus haute qualité.",
			cart: 0,
			premium: false
		}
	},

	methods: {
		updateCart(){
			this.cart += 1;
		}
	},

	computed: {
		title(){
			return this.action + " " + this.brand;
		}
	}
});

