app.component('review-list', {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template:
  /*html*/
  `
  <h3>Messages :</h3>

  <div class="card mb-3" v-for="(review, index) in reviews" :key="index">
    <h5 class="card-header">
      {{ review.name }} à noté ça {{ review.rating }} étoiles
    </h5>

    <div class="card-body">
      <p class="card-text">
        {{ review.review }}
      </p>
    </div>
  </div>
  `
});
