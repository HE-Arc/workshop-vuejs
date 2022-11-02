const app = Vue.createApp({
    data: function(){
        return {
            title: "Achat de cafés Nespresso",
            description:"super chers ce que tu veux",
            image: "assets/images/colombia_de_cote.png",
            link: "https://www.nespresso.com",
            inStock: 10,
            details: [
                "Doux",
                "Volupteux",
                "Chouette",
                "mais nul quand-même"
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
            stringCart: "Ajouter au panier"
        }
    },
    methods: {
        addToCart () {
            this.cart += 1;
        },
        updateImage (_image) {
            this.image = _image;
        }
    }

});

