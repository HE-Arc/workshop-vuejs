const app = Vue.createApp({
  data() {
    return {
      action: 'Commander du café',
      brand: 'Nespresso',
      description: 'L’histoire de NESPRESSO est celle d’une passion inaltérable pour la perfection et d’une quête inlassable d’innovation en faveur de la plus haute qualité.',
      url: 'https://www.nespresso.com/ch/fr/',
      cart: [],
      premium: true,
    }
  },
  methods: { 
    updateCart(id) {
      this.cart.push(id)
    }
  },
  computed: {
    title() {
      return this.action + ' ' + this.brand
    },
  }
});
