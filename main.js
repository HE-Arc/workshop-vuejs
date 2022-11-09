const app = Vue.createApp({
    data: function(){
        return {
            action: "Achat de cafés",
            brand: "Nespresso",
            link: "https://www.nespresso.com",
            description:"super chers ce que tu veux",
            cart: [],
            reviews: []
        }

    },
    methods: {
        updateCart(uid) {
            this.cart.push(uid);
        },
        addReview(productReview) {
            this.reviews.push(productReview);
        }
    },
    computed: {
        title () {
            return this.action + " " + this.brand;
        }
    }    
});
