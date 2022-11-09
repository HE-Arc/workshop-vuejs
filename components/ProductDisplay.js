app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        uid: {
            type: Number,
            required: true
        }
    },
    emits: [
        "add-to-cart"
    ],
    template:
    /*html*/
    `
    <div>
        <img v-bind:src="image" height="200">
        
        <div>
        <span v-for="(image, index) in carouselImages" :key="image.id" @mouseover="updateSelectedImage(index)">
            <img :src="image.image" :alt="image.text" height="50">
        </span>
        </div>

        <p v-if="inStock > 5">
        Disponible
        </p>
        <p v-else-if="inStock <= 5 && 0 < inStock">
        Peu de stock
        </p>
        <p v-else>
        Indisponible
        </p>
        <p v-show="inStock > 5">
        Test
        </p>

        <ul>
        <li v-for="detail in details" :key="detail.id" :style="{color: detail.color}">
            {{detail.text}}
        </li>
        </ul>

        <p>
        Shipping: {{shipping}}
        </p>

        <button v-on:click="addToCart" :style="styles.roundButton" :disabled="inStock <= 0" :class="{disabledButton: inStock <= 0}">{{stringCart}}</button>
    </div>
    `,
    data() {
      return {
        selectedImage: 0,
            inStock: 10,
            details: [                
                {
                    text : "Doux",
                    id: 0,
                    color: "#659875"
                },                
                {
                    text : "Volupteux",
                    id: 1,
                    color: "#331023"
                },                
                {
                    text : "Chouette",
                    id: 2,
                    color: "#10ff00"
                },                
                {
                    text : "mais",
                    id: 3,
                    color: "#55ff44"
                }
            ],
            carouselImages: [
                {
                    id: 1,
                    text: "Capsule 1",
                    image: "assets/images/colombia_de_cote.png"
                },
                {
                    id: 2,
                    text: "Capsule 2",
                    image: "assets/images/colombia_paquet.png"
                },
                {
                    id: 3,
                    text: "Capsule 3",
                    image: "assets/images/colombia_tasse.png"
                }
            ],
            stringCart: "Ajouter au panier",
            styles: {
                roundButton: {
                    borderRadius: "20px",
                    padding: "10px",
                    backgroundColor: "rgb(0, 114, 180)",
                    color: "white",
                    cursor: "pointer"
                  }
            }
      }
    },
    methods: {
        addToCart () {
            this.$emit("add-to-cart", this.uid)
        },
        updateImage (_image) {
            this.image = _image;
        },
        updateSelectedImage (index) {
            this.selectedImage = index
        }
    },
    computed: {
        image () {
            return this.carouselImages[this.selectedImage].image;
        },
        shipping () {
            if(this.premium) {
                return "Free shipping";
            }
            return 99999.99;
        }
    }

  });