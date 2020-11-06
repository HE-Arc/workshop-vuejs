var app = new Vue({
    el: "#app",
    data(){
        return {
            title: "Achat de café nespresso",
            description: "L’histoire de NESPRESSO est celle d’une passion inaltérable pour la perfection et d’une quête inlassable d’innovation en faveur de la plus haute qualité.",
            image: "./images/colombia.png",
            urlNespresso:"https://www.nespresso.com/ch/fr/",
            inSale: true,
            cart : 0,
            stock: 10,
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
    methods: {
        addToCart: function(){
            this.cart +=1
        },
        removeToCart: function(){
            this.cart-=1
        },
        updateImage: function(carouselImage){
            this.image=carouselImage
        },
    },
})