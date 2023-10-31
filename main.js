const app = Vue.createApp({
  data: function () {
    return {
      action: "Achat de café",
      brand: "Nespresso",
      message: "Bonjour, veuillez choisir votre café",
      cart: [],
      premium: true,
      lien: "https://www.nespresso.com/ch/en/",
    };
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    }
  },
  computed: {
    title() {
      return this.action + " " + this.brand;
    },
  },
});
