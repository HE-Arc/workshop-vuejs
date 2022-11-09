app.component("review-form", {
    emits: [
        "review-submitted"
    ],
    template:
      /*html*/
      `
    <form @submit.prevent="onSubmit"> 
        <!--.prevent évite le rafraîchissement du naviguateur-->
      <h3>Laissez deux message</h3>
      
      <div class="form-group">
        <label for="name">Nom</label>
        <input v-model="name" id="name" class="form-control">
      </div>
      <div class="form-group">
        <label for="review">Message</label>      
        <textarea v-model="review" id="review" class="form-control"></textarea>
      </div>
      <div class="form-group">
        <label for="rating">Note</label>
        <select v-model="rating" id="rating" class="form-control">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </div>
      <input class="btn btn-primary mb-5" type="submit" value="Envoyer">
    </form>
    `,
    data() {
      return {
        name: "text",
        review: "review",
        rating: null
      };
    },
    methods: {
        onSubmit () {
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
            }
            this.$emit("review-submitted", productReview);
            this.name = "";
            this.review = "";
            this.rating = null;
        }
    },
  });