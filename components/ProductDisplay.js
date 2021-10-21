app.component("product-display", {
	props: {
		premiumProp: {
			type: Boolean,
			required: true
		}
	},
	
	emits: ["add-to-cart"],
	
	template: 
	/*html*/
	`
	<p v-if="stock > 10">Disponible</p>
	<p v-else-if="stock <= 10 && stock > 0">Peu de stock</p>
	<p v-else>Plus de stock</p>

	<img
		:src="carouselImages[selectedImage].image"
		alt="colombia"
		height="200"
	/>

	<div>
		<span
			v-for="(carouselImage, index) in carouselImages"
			:key="index"
			@mouseover="updateSelectedImage(index)"
		>
			<img
				height="50"
				:alt="carouselImage.text"
				:src="carouselImage.image"
			/>
		</span>
	</div>

	<ul>
		<li
			v-for="detail in details"
			:key="detail.id"
			:style="{ backgroundColor: detail.color }"
		>
			{{ detail.text }}
		</li>
	</ul>

	<p>Shipping: {{ shipping }}</p>

	<button
		@click="addToCart"
		:style="styles.roundButton"
		:disabled="stock <= 0"
		:class="{ disabledButton:stock <= 0 }"
	>
		Ajouter au panier
	</button>

	<div class="col-6 offset-3">
		<review-list v-if="reviews.length" :reviews="reviews"></review-list>
		<review-form @review-submitted="addReview"></review-form>
	</div>
	`,

	data(){
		return {
			inStock: true,
			stock: 42,
			details: [
				{
				  id: 1,
				  text: 'Doux',
				  color: '#6C99C6'
				},
				{
				  id: 2,
				  text: 'Harmonieux',
				  color: '#BF9E74'
				}
			],
			carouselImages: [
				{
				  id: 1,
				  text: 'Capsule 1',
				  image: './assets/images/colombia.png',
				},
				{
				  id:  2,
				  text: 'Capsule 2',
				  image: './assets/images/colombia_de_cote.png',
				},
				{
				  id: 3,
				  text: 'Tasse',
				  image: './assets/images/colombia_tasse.png',
				},
				{
				  id: 4,
				  text: 'Paquet',
				  image: './assets/images/colombia_paquet.png',
				}
			],
			styles: {
				roundButton: {
				  borderRadius: "20px",
				  padding: "10px",
				  backgroundColor: "rgb(0, 114, 180)",
				  color: "white",
				  cursor: "pointer"
				}
			},
			selectedImage: 0,
			reviews: []
		}
	},

	methods:{
		addReview(review){
			this.reviews.push(review);
		},
		addToCart(){
			this.$emit("add-to-cart");
		},
		updateSelectedImage(index){
			this.selectedImage = index;
		}
	},
	computed:{
		shipping() {
			return this.premiumProp ? "Free" : "La douille";
		}
	}
})