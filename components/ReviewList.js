app.component("review-list", {
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
        <div v-for="(review, index) in reviews" :key="index" class="card mb-3">
            <h5 class="card-header">
                {{review.name}} a noté: {{review.rating}} étoiles le site.
            </h5>
            <div class="card-body">
                <p class="card-text">
                {{review.review}}
                </p>
        </div>
        </div>
        `
  });