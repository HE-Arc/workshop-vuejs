app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    }
  },
  emits: ["add-to-cart"],
  template: 
  /*html*/
  `
  <div>
    <img height="200"
      v-bind:src="image"
      :class="[ inStock ? '' : 'out-of-stock-img' ]">
  </div>

  <div>
    <span v-for="(carouselImage, index) in carouselImages"
    :key="carouselImage.id"
    @mouseover="updateSelectedImage(index)">
    <img height="50"
      :src="carouselImage.image"
      :alt="carouselImage.text">
    </span>
  </div>

  <p v-if="stock > 10">Disponible</p>
  <p v-else-if="stock <= 10 && stock > 0">Peu de stock</p>
  <p v-else>Plus de stock</p>

  <product-details :details="details"></product-details>

  <p>Shipping: {{ shipping }}</p>

  <button
    @click="addToCart"
    :style="styles.roundButton"
    :disabled="!inStock"
    :class="{ disabledButton: !inStock }">
    Ajouter au panier
  </button>

  <div class="col-6 offset-3">
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
  </div>
  `,
  data() {
    return {
      selectedImage: 0,
      stock: 9,
      styles: {
        roundButton: {
          borderRadius: "20px",
          padding: "10px",
          backgroundColor: "rgb(0, 114, 180)",
          color: "white",
          cursor: "pointer"
        }
      },
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
          id: 2,
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
      reviews: []
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.carouselImages[this.selectedImage].id)
    },
    updateSelectedImage(index) {
      this.selectedImage = index
    },
    addReview(review) {
      this.reviews.push(review)
    }
  },
  computed: {
    image() {
      return this.carouselImages[this.selectedImage].image
    },
    inStock() {
      return this.stock > 0
    },
    shipping() {
      if (this.premium) {
        return 'Free'
      }

      return 2.99
    }
  }
});
