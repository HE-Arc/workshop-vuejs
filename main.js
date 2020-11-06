Vue.component('review-list', {
    props: {
        reviews: {
            type: Array,
            required: true
          }
    },
    template:
    /*html*/
    `
    <div>
        <h3>Messages :</h3>

        <div class="card mb-3" v-for="(review, index) in reviews" :key="index">
        <h5 class="card-header">
            {{ review.name }} à noté ça {{ review.rating }} étoiles
        </h5>
        
        <div class="card-body">
            <p class="card-text">
            {{ review.review }}
            </p>
        </div>
    </div>
    </div>
    `
  })

Vue.component('review-form', {
    template: 
    /*html*/
    `
    <div>
        <form @submit.prevent="onSubmit">
            <h3>Laissez un message</h3>
            
            <div class="form-group">
            <label for="name">Nom</label>
            <input id="name" class="form-control" v-model="name">
            </div>

            <div class="form-group">
            <label for="review">Message</label>      
            <textarea id="review" class="form-control"  v-model="review"></textarea>
            </div>

            <div class="form-group">
            <label for="rating">Note</label>
            <select id="rating" class="form-control"  v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
            </div>

            <input class="btn btn-primary mb-5" type="submit" value="Envoyer">
        </form>
    </div>
    `,
    data() {
      return {
          name:"",
          review:"",
          rating:null,
      }
    },
    methods: {
        onSubmit() {
            let productReview = {
              name: this.name,
              review: this.review,
              rating: this.rating
            }
            this.$emit('review-submitted', productReview)
          
            this.name = ''
            this.review = ''
            this.rating = ''
          },
    },
    computed: {
    }
  })

Vue.component("product-display",{
    props:{
        premium:{
            type:Boolean,
            default:false,
        }
    },
    template:
    /*html*/
    `
    <div>
        <img :src="image" height="200" alt="colombia">
        <div>
        <span v-for="(carouselImage, index) in carouselImages"
            :key="carouselImage.id"
            @mouseover="updateSelectedImage(index)">
            <img height="50"
            alt="carouselImage.text"
            :src="carouselImage.image">
        </span>
        </div>

        <p v-if="stock>10">Disponible</p>
        <p v-else-if="stock<=10 && stock>0">Peu de stock</p>
        <p v-else>Indisponible</p>

        <p v-show="inSale">en vente</p>

        <ul>
        <li v-for="detail in details"
            :key="detail.id"
            :style="{ backgroundColor: detail.color }">
            {{ detail.text }}
        </li>
        </ul>

        <p>
            Prix de la livraison : {{shipping}}
        </p>

        <div v-for="carouselImage in carouselImages" :key="carouselImage.id">{{carouselImage.text}}</div>

        <button
            v-on:click="addToCart"
            :style="styles.roundButton"
            :disabled="stock <= 0"
            :class="[stock <= 0 ? 'disabledButton' : '']">
            
            Ajouter au panier
        </button>

        <button 
            @click="removeToCart"
            :style="styles.roundButton">
            Enlever au panier
        </button>

        <div class="col-6 offset-3">
            <review-list v-if="reviews.length" :reviews="reviews"></review-list>
            <review-form @review-submitted="addReview"></review-form>
        </div>
    </div>
    `,
    data(){
        return {
            inSale: true,
            stock: 10,
            imageIndex: 0,
            reviews: [],
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
                  image: './images/colombia.png',
                },
                {
                  id:  2,
                  text: 'Capsule 2',
                  image: './images/colombia_de_cote.png',
                },
                {
                  id: 3,
                  text: 'Tasse',
                  image: './images/colombia_tasse.png',
                },
                {
                  id: 4,
                  text: 'Paquet',
                  image: './images/colombia_paquet.png',
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
        }
    },
    methods:{
        addToCart: function(){
            this.$emit("update-cart", 1)
        },
        removeToCart: function(){
            this.$emit("update-cart", -1)
        },
        updateImage: function(carouselImage){
            this.image = carouselImage
        },
        updateSelectedImage(index){
            this.imageIndex = index
        },
        addReview(review){
            this.reviews.push(review)
        },
    },
    computed: {
        image(){
            return this.carouselImages[this.imageIndex].image
        },
        shipping(){
            if(this.premium)
            {
                return 'free'
            }
            return 12001
        },
    },
})

var app = new Vue({
    el: "#app",
    data(){
        return {
            order: "Achat de café",
            brand: "Nespresso",
            description: "L’histoire de NESPRESSO est celle d’une passion inaltérable pour la perfection et d’une quête inlassable d’innovation en faveur de la plus haute qualité.",
            urlNespresso:"https://www.nespresso.com/ch/fr/",
            cart : 0,
        }   
    },
    methods: {
        updateCart(qty)
        {
            this.cart += qty
        },
    },
    computed:
    {
        title(){
            return this.order + ' ' + this.brand
        },
    },
})