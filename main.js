const app = Vue.createApp({
    data: function(){
        return {
            action: "Achat de cafés",
            brand: "Nespresso",
            description:"super chers ce que tu veux",
            selectedImage: 0,
            link: "https://www.nespresso.com",
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
            cart: 0,
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
            this.cart += 1;
        },
        updateImage (_image) {
            this.image = _image;
        },
        updateSelectedImage (index) {
            this.selectedImage = index
        }
    },
    computed: {
        title () {
            return this.action + " " + this.brand;
        },
        image () {
            return this.carouselImages[this.selectedImage].image;
        }
    }    
});

app.component('product-display', {
    template:
    /*html*/
    `
    <h1>Coucou les minous</h1>
    `,
    data() {
      return {
      }
    },
    methods: {
    },
    computed: {
    }
  });



