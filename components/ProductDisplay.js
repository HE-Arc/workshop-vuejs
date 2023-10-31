app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
    emits: ["add-to-cart"],
  },
  template:
    /*html*/
    `
    <img height="200" :src="image" :class="[inStock ? '' : 'stockEmpty']" />
    <div>
      <span
        v-for="(carouselImage, index) in carouselImages"
        :key="carouselImage.id"
        @mouseover="updateSelectedImage(index)"
      >
        <img height="50" :alt="carouselImage.text" :src="carouselImage.image" />
      </span>
    </div>
    <p v-if="inStock">Disponible</p>
    <p v-else>Plus de stock</p>

    <p v-if="stock > 10">Disponible</p>
    <p v-else-if="stock <= 10 && inStock">Peu de stock</p>
    <p v-else>Plus de stock</p>

    <p>Shipping: {{ shipping }}</p>

    <p v-show="onSale">En vente!</p>

    <product-details :details="details"></product-details>

    <div v-for="carouselImage in carouselImages" :key="carouselImage.id">
      {{ carouselImage.text }}
    </div>

   <div v-for="paquet in paquets" :key="paquets.id">
    Id: : {{ paquet.id}}
    Quantité:  {{ paquet.quantity}}
    Prix:  {{ paquet.price}}
   </div>

   <button 
   @click="addToCart"
   :style="styles.roundButton" 
   :disabled = "!inStock"
   :class="{ disabledButton: !inStock }" 
   >Ajouter au panier
  </button>
   <button 
   @click="removeFromCart" 
   :style="styles.roundButton" 
   :disabled = "!inStock"
   :class="{ disabledButton: !inStock }"
   >Enlever du panier
  </button>
  <div class="col-6 offset-3">
  <review-form @review-submitted="addReview"></review-form>
  <review-list v-if="reviews.length" :reviews="reviews"></review-list>
  </div>
    `,
  data() {
    return {
      selectedImage: 0,
      stock: 10,
      onSale: true,
      details: [
        {
          id: 1,
          text: "Doux",
          color: "#6C99C6",
        },
        {
          id: 2,
          text: "Harmonieux",
          color: "#BF9E74",
        },
      ],
      carouselImages: [
        {
          id: 1,
          text: "Capsule 1",
          image: "./assets/images/colombia.png",
        },
        {
          id: 2,
          text: "Capsule 2",
          image: "./assets/images/colombia_de_cote.png",
        },
        {
          id: 3,
          text: "Tasse",
          image: "./assets/images/colombia_tasse.png",
        },
        {
          id: 4,
          text: "Paquet",
          image: "./assets/images/colombia_paquet.png",
        },
      ],
      styles: {
        roundButton: {
          borderRadius: "20px",
          padding: "10px",
          backgroundColor: "rgb(0, 114, 180)",
          color: "white",
          cursor: "pointer",
        },
      },
      paquets: [
        {
          id: 1,
          quantity: 4,
          price: 3.5,
        },
        {
          id: 2,
          quantity: 10,
          price: 8.5,
        },
        {
          id: 3,
          quantity: 20,
          price: 15,
        },
      ],
      reviews: [],
    };
  },
  methods: {
    updateImage(newImage) {
      this.image = newImage;
    },
    updateSelectedImage(index) {
      this.selectedImage = index;
    },
    addToCart() {
      this.$emit("add-to-cart", this.carouselImages[this.selectedImage].id);
    },
    removeFromCart() {
      this.cart -= 1;
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },
  computed: {
    image() {
      return this.carouselImages[this.selectedImage].image;
    },
    inStock() {
      return this.stock > 0;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }

      return 2.99;
    },
  },
});
