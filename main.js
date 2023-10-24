const app = Vue.createApp({
    data: function() {
        return {
            title: "Achat de café Nespresso",
            message: "Bonjour, veuillez choisir votre café",
            image: "./assets/images/colombia.png",
            lien: "https://www.nespresso.com/ch/en/",
            inStock: true,
            stock: 10,
            onSale: true,
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
            cart : 0,
            styles: {
                roundButton: {
                  borderRadius: '20px',
                  padding: '10px',
                  backgroundColor: 'rgb(0, 114, 180)',
                  color: 'white',
                  cursor: 'pointer'
                }
              },
        };        
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
        removeFromCart() {
            this.cart -= 1;
        },
        updateImage(newImage) {
            this.image = newImage;
        }
    }
});