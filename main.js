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
        };
    },
});