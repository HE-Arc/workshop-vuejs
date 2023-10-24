const app = Vue.createApp({
  data: function () {
    return {
      action: "Achat de café",
      brand: "Nespresso",
      message: "Bonjour, veuillez choisir votre café",
      cart: 0,
      lien: "https://www.nespresso.com/ch/en/",
    };
  },
  methods: {},
  computed: {
    title() {
      return this.action + " " + this.brand;
    },
  },
});
