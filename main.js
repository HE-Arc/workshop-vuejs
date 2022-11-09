const app = Vue.createApp({
    data: function(){
        return {
            action: "Achat de cafés",
            brand: "Nespresso",
            link: "https://www.nespresso.com",
            description:"super chers ce que tu veux",
            cart: 0
        }

    },
    methods: {
        updateCart() {
            this.cart += 1;
        }
    },
    computed: {
        title () {
            return this.action + " " + this.brand;
        }
    }    
});
