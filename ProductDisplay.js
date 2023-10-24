app.component("product-display", {
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

    <p v-show="onSale">En vente!</p>

    <ul>
      <li
        v-for="detail in details"
        :key="detail.id"
        :style="{ color: detail.color }"
      >
        {{ detail.text }}
      </li>
    </ul>

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
      this.cart += 1;
    },
    removeFromCart() {
      this.cart -= 1;
    },
  },
  computed: {
    image() {
      return this.carouselImages[this.selectedImage].image;
    },
    inStock() {
      return this.stock > 0;
    },
  },
});
