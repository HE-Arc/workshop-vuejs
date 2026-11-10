# 0. Explication

Ce README retrace l'intégralité du projet et permet de recréer le projet depuis 0 à partir du projet de base donnée.

Toutes les étapes sont décrites à la suite de ce document.

Le workshop utilise la Composition API de Vue 3 (`<script setup>`). Dans la doc officielle, il faut choisir **Composition**

# 1. Introduction

## Vue Devtools

Installer Vue Devtools à partir d'ici : https://devtools.vuejs.org/getting-started/installation

Vue Devtools permet de visualiser la structure et les données de l'application.
Ce qu'il se passe dans l'application et dans chaque composant.

## Vue - Official

Si VSCode est utilisé, alors installez `Vue - Official` (ID : `Vue.volar`). Elle permet d'avoir la couleur syntaxique et l'autocomplétion dans les fichiers `.vue`.

## Prettier (Optionnel)

Le code du workshop est formatté avec [Prettier](https://prettier.io/). Sur VSCode, on le trouve dans les extensions avec l'ID suivant: `esbenp.prettier-vscode`.

Ce n'est pas obligatoire d'utiliser ce formatteur spécifique, mais personnellement je le trouve bien :smile:

## Projet Vue

La méthode d'installation recommandé par les créateurs du framework est d'utiliser un package manager tels que `npm` ou `yarn` afin de créer un template de projet avec toute les dépendances nécessaires (voir [Creating a Vue Application](https://vuejs.org/guide/quick-start.html#creating-a-vue-application)).

Le projet de base a été créé avec la commande suivante (JavaScript, sans fonctionnalité supplémentaire et sans le code d'exemple). Il utilise Vite.

```bash
npm create vue@latest
```

> Cette commande a déjà été exécutée pour le projet de base : il ne faut pas la relancer.

Il faut Node.js 22.18 ou plus récent. Pour lancer le projet, il suffit d'exécuter les commandes suivantes après avoir clone puis d'ouvrir l'adresse affichée dans le terminal.

```bash
cd workshop-vuejs
git switch 2026-start
npm install
npm run dev
```

> **Résultat attendu :** le message vert « You are READY for the workshop ;) » s'affiche dans le navigateur

# 2. Creating the Vue App

## Init app Vue

Dans l'`index.html` il y a un div avec `id="app"` en dessous `<body>`.

```html
<body>
  <div id="app"></div>
  ...
</body>
```

Et donc dans `src/main.js` on crée notre application Vue à partir du composant `App.vue` et on la relie à l'élément HTML avec l'id app.

```js
import { createApp } from "vue";
import "./assets/style.css";
import App from "./App.vue";

createApp(App).mount("#app");
```

Le fichier `src/App.vue` regroupe le JS dans `<script setup>` et le HTML dans `<template>`. Tout ce qui est déclaré dans `<script setup>` est directement utilisable dans le template.

> Dans la suite du document, « le HTML » désigne le `<template>` du composant, et non le fichier `index.html`.

> - Index.html : la page qui charge le src/main.js
> - main.js: Crée l'app
> - App.vue Le main composant

## Expression {{}}

Ajoutons quelques éléments à notre app Vue.
Ajoutons un titre (h1) à notre application à l'aide de Vue.
Il faut donc créer une variable `title` dans le script de `App.vue` et l'utiliser dans le template à l'aide de `{{}}`.

```vue
<script setup>
import { ref } from "vue";

const title = ref("Achat de café Nespresso");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

> `ref()` crée une variable réactive. Dans le script, sa valeur se lit et se modifie avec `.value` (`title.value`). Dans le template, `.value` n'est pas nécessaire.

> **La réactivité.** Quand Vue affiche le template, il retient quelles `ref` sont utilisées. Quand la valeur d'une de ces `ref` change, il met automatiquement à jour l'affichage
>
> Pour test la réactivité on ajoute temporairement ce code dans le script :
>
> ```js
> setTimeout(() => {
>   title.value = "Ceci est un titre différent";
> }, 2000);
> ```
>
> Après 2 secondes, le titre change tout seul dans la page. Sans `ref()`, la variable changerait aussi, mais pas l'affichage. Ce code peut ensuite être supprimé.
>
> Pour plus de détails : https://vuejs.org/guide/essentials/reactivity-fundamentals.html

> {{}} interprète ce qui se trouve dedans, cela permet d'effectuer des opérations en tout genre (concaténation, opération ternaire, etc.)

Il est possible d'interagir avec Vue depuis Vue Devtools en modifiant par exemple la valeur de `title`.

> **Résultat attendu :** le titre « Achat de café Nespresso » s'affiche et change quand on modifie `title` dans Vue Devtools.

## Challenge

Ajouter une description avec la même technique que pour le titre, une expression dans un élément `p` sous `h1`.

# 3. Attribute Binding

v-bind permet de lier un attribut HTML à une expression.
Exemple de syntaxe : `v-bind:src`, `v-bind:class`, `v-bind:disabled`

Ajoutons une image grâce à ce concept.
Il faut créer une nouvelle variable dans le script et ensuite l'utiliser dans le template.

```js
const image = ref("/images/colombia.png");
```

```HTML
<img height="200" v-bind:src="image" />
```

> Raccourci pour v-bind : `v-bind:src` --> `:src`

## Challenge

Ajouter un lien sur le titre en utilisant le binding et `href` de l'élément `<a>`.

# 4. Conditional Rendering

## v-if et v-else

`v-if` et `v-else` permettent d'afficher des choses différentes en fonction de la condition.

Ajoutons un booléen dans le script `inStock` et utilisons-le pour afficher un message différent à l'utilisateur en fonction de sa valeur.

```HTML
<p v-if="inStock">Disponible</p>
<p v-else>Plus de stock</p>
```

## v-else-if

Il est possible d'avoir des conditions plus complexes en utilisant aussi `v-else-if`.

```js
const stock = ref(9);
```

```HTML
<p v-if="stock > 10">Disponible</p>
<p v-else-if="stock <= 10 && stock > 0">Peu de stock</p>
<p v-else>Plus de stock</p>
```

## v-show

`v-show` utilise la visibilité de l'élément, il est de se fait très utile et recommandé lorsque l'on désire afficher et masquer fréquemment des éléments du DOM.

## Challenge

Ajouter une propriété `onSale` permettant d'afficher "En Vente !".

# 5. List Rendering

`v-for` peu s'avérer très utile lorsque l'on désire afficher une liste d'éléments.

```
v-for="item in collection"
```

## Tableaux simples

Commençons par afficher une liste de détails à notre café.
Il faut donc créer un tableau d'élément dans le script.

```js
const details = ref(["Doux", "Harmonieux"]);
```

Puis l'utiliser dans le HTML.

```html
<ul>
  <li v-for="detail in details">{{ detail }}</li>
</ul>
```

## :key

Il est recommandé de donnée une `:key` pour chaque élément de la liste, cela permet de donner un id unique à chaque élément du DOM et permet ainsi à Vue de suivre tous les éléments lorsque le DOM est modifié. Le résultat est l'amélioration des performances et cela peut s'avérer très utile par la suite, lors de l'utilisation des animations. Autant appliquer la bonne pratique dès le départ.

Il faut donc créer des tableaux d'objets.
Créons un nouveau tableau contenant des textes avec un id dans le script.

```js
const carouselImages = ref([
  {
    id: 1,
    text: "Capsule 1",
  },
  {
    id: 2,
    text: "Capsule 2",
  },
  {
    id: 3,
    text: "Tasse",
  },
  {
    id: 4,
    text: "Paquet",
  },
]);
```

Il faut maintenant afficher notre tableau dans le HTML avec l'attribut `:key`.

```html
<div v-for="carouselImage in carouselImages" :key="carouselImage.id">
  {{ carouselImage.text }}
</div>
```

## Challenge

Ajouter un tableau de taille de paquet contenant la quantité de capsules dans un paquet (id, quantity, price) et afficher toutes ces infos à l'utilisateur en utilisant `v-for` et `:key`.

# 6. Event Handeling

Nous allons maintenant voir comment gérer les événements avec Vue grâce à la directive `v-on`.

## Exemple simple

Faisons un exemple en ajoutant un système de panier à notre site.

Commençons par ajouter un bouton permettant d'ajouter des éléments dans notre panier.

Il faut ajouter une var `cart` dans le script qui contiendra la valeur actuelle de notre panier.
Puis ajouter un bouton dans le HTML en y ajoutant la directive `v-on` et en incrémentant le panier de 1 à chaque clique.

```HTML
<button v-on:click="cart += 1">Ajouter au panier</button>
```

> Il existe une syntaxe plus courte pour `v-on`, il s'agit du `@` donc par exemple `v-on:click` donnera `@click`

Ajoutons également un peu d'HTML pour afficher la valeur du panier sur notre page.

```HTML
<div>Panier({{ cart }})</div>
```

Ici nous avons effectué l'opération directement dans le HTML, car notre opération est simple. Dans le cas où nous souhaitons effectuer plusieurs actions, il est largement préférable d'utiliser des méthodes. Cela tombe bien, car Vue permet de faire cela.

## methods

Via la composition API, une méthode est simplement une fonction déclarée dans le script.

Il est maintenant possible d'ajouter une nouvelle méthode afin de pouvoir ensuite l'utiliser dans le HTML.

```js
function addToCart() {
  cart.value += 1;
}
```

```HTML
<button @click="addToCart">Ajouter au panier</button>
```

> `cart.value` fait référence à la valeur de la variable `cart` dans le script

## Carrousel

Ce qui pourrait être vraiment sympa c'est de faire un carrousel pour montrer plusieurs images du café à l'utilisateur.

Nous allons utiliser le tableau d'objet que nous avons créé précédemment `carouelImages`. Il faut ajouter un attribut `image` à chaque objet qui contiendra le lien vers une image dans notre dossier images.

```js
const carouselImages = ref([
  {
    id: 1,
    text: "Capsule 1",
    image: "/images/colombia.png",
  },
  {
    id: 2,
    text: "Capsule 2",
    image: "/images/colombia_de_cote.png",
  },
  {
    id: 3,
    text: "Tasse",
    image: "/images/colombia_tasse.png",
  },
  {
    id: 4,
    text: "Paquet",
    image: "/images/colombia_paquet.png",
  },
]);
```

Ensuite nous pouvons modifier notre HTML comme ceci afin d'afficher les images en dessous de l'image principale. Il ne nous reste plus qu'à ajouter la directive `@mouseover` et la relier à une méthode `updateImage` dans le script qui va changer la valeur de la var `image`

```html
<div>
  <span
    v-for="carouselImage in carouselImages"
    :key="carouselImage.id"
    @mouseover="updateImage(carouselImage.image)"
  >
    <img height="50" :alt="carouselImage.text" :src="carouselImage.image" />
  </span>
</div>
```

Il est possible d'utiliser d'autre événement comme `change` sur des radios p. ex.

> **Résultat attendu :** la page devrait afficher le titre, l'image principale, « Peu de stock », la liste des détails, le panier et 4 miniatures. Le panier augmente de 1 à chaque clic, et l'image principale change au survol d'une miniature.

## Challenge

Créer un nouveau bouton et une nouvelle méthode pour décrémenter le nombre d'objets dans le panier.

# 7. Class & Style Binding

Nous allons voir comment Vue permet d'effectuer des actions sur les styles et les classes.

## :style

Changeons la couleur des détails du café.

Il faut commencer par adapter le tableau `details` dans le script pour répondre à nos nouveaux besoins et profitons-en pour lui donner un attribut id.

```js
const details = ref([
  {
    id: 1,
    text: "Doux",
    color: "#6C99C6",
  },
  {
    id: 2,
    text: "Harmonieux",
    color: "#BF9E74",
  },
]);
```

Dans le HTML il faut donc adapter son utilisation.
Relier l'attribut id à l'élément `key` et il faut également adapter l'utilisation de l'affichage du texte en appelant la propriété `text` de l'objet.
Au niveau du style il suffit d'utiliser `:style` en utilisant l'attribut `color` de `detail` et en le liant à l'attribut css `color`.

```html
<ul>
  <li
    v-for="detail in details"
    :key="detail.id"
    :style="{ color: detail.color }"
  >
    {{ detail.text }}
  </li>
</ul>
```

## camel vs kebab

Il y a 2 manières possibles d'utiliser les attributs css

1. En notation camelCase `:style="{ backgroundColor: detail.color }"` ou
2. En notation 'kebab-case' `:style="{ 'background-color': detail.color }"`

## Objet de style

Il est également possible d'utiliser un objet de style, changeons le style du bouton d'ajout au panier pour illustrer l'exemple :

Dans le JS on crée un objet qui va regrouper tous nos styles et on crée un nouvel object pour le bouton qui contiendra tous ses styles.

```js
const styles = ref({
  roundButton: {
    borderRadius: "20px",
    padding: "10px",
    backgroundColor: "rgba(180, 0, 165, 1)",
    color: "white",
    cursor: "pointer",
  },
});
```

Dans le HTML on ajoute `:style` au bouton. Mais cette fois il suffit d'ajouter notre objet avec une notation bien plus simple, car tous les styles sont déjà contenus dans l'objet JS déjà correctement formaté.

```HTML
<button @click="addToCart" :style="styles.roundButton">
  Ajouter au panier
</button>
```

## :class

Essayons de voir la différence si on utilise les classes css.

Commençons par désactiver les interactions avec notre bouton si le stock est <= 0 en utilisant l'attribut `disabled`.

```html
<button @click="addToCart" :style="styles.roundButton" :disabled="stock <= 0">
  Ajouter au panier
</button>
```

Rendons le tout un peu plus clair visuellement en ajoutant du css dans `src/assets/style.css`.

```css
.disabledButton {
  background-color: #d8d8d8 !important;
  cursor: not-allowed !important;
}
```

> Ne pas oublier `!important` sur nos attributs css, car nous modifions le style ajouté depuis l'élément HTML en inline depuis une classe (priorité : `!important` > style (inline) > classe).

```HTML
<button
  @click="addToCart"
  :style="styles.roundButton"
  :disabled="stock <= 0"
  :class="{ disabledButton: stock <= 0 }"
>
  Ajouter au panier
</button>
```

> Il est possible d'utiliser l'attribut `class` et `:class` sur le même élément HTML, les classes vont être fusionnées

## Opérateur ternaire [ ? : ]

Il est également possible d'effectuer des opérations ternaires. Modifions le style du texte indiquant combien d'articles se trouvent dans le panier.

```html
<div :class="[cart > 0 ? 'cartFilled' : '']">Panier({{ cart }})</div>
```

```css
.cartFilled {
  color: rgb(17, 100, 0);
}
```

> **Résultat attendu :** les détails du café sont coloré. Si on passe `stock` à 0 dans Vue Devtools, le bouton est gris et n'est plus cliquable. Le texte du panier devient vert dès qu'il contient un article.

## Challenge

Changer l'opacité de l'image principale à l'aide d'une classe et lorsqu'il n'y a plus de stock.

# 8. Computed Properties

Vue permet de créer des propriétés calculées.

## Cache

Cela présente des avantages, comme le fait que les propriétés calculées soient mises en cache. Cela veut dire que la propriété est "calculée" une seule fois et ensuite simplement réutilisée (optimisation de la part de Vue), si un élément de cette propriété à changer alors la propriété est calculée à nouveau puis remise en cache.

## Exemple simple avec le titre

Afin de tester cette nouvelle notion, nous allons couper le contenu de notre variable `title` en 2 dans le script.

```js
const action = ref("Achat de café");
const brand = ref("Nespresso");
```

Mais nous souhaitons continuer d'utiliser la var `title` dans le HTML afin de pouvoir utiliser title, action ou brand quand cela est nécessaire.
Nous allons donc créer une propriété calculée et pour se faire il faut importer `computed` depuis `vue` dans le script.
Ensuite nous pouvons créer notre propriété calculée que nous allons nommer `title` afin que son fonctionnement reste identique ou nous l'avions utilisé précédemment.

```js
import { ref, computed } from "vue";

const title = computed(() => action.value + " " + brand.value);
```

> Une propriété calculée est elle aussi réactive : Vue retient de quelles `ref` elle dépend et la recalcule quand elles changent.

## Amélioration du carrousel

Maintenant nous allons simplifier et mettre à profit notre apprentissage des propriétés.
Supprimons la var `image` dans le script et remplaçons la par `const selectedImage = ref(0)` qui sera un index pointant sur l'image actuellement sélectionnée de notre carrousel.

Ensuite, modifions l'appel de la méthode pour mettre cette variable à jour. D'abord, dans la boucle `for` du carrousel ajoutons un index comme ceci `v-for="(carouselImage, index) in carouselImages"`. Puis l'appel à la méthode `@mouseover="updateSelectedImage(index)"` et la méthode dans le JS `function updateSelectedImage(index) { selectedImage.value = index; }`.
Et pour finir créons une nouvelle propriété calculée afin de remplacer la variable image d'avant `const image = computed(() => carouselImages.value[selectedImage.value].image);`.

> **Résultat attendu :** la page ne change pas, le carrousel fonctionne toujours, voir que modifier `brand` dans Vue Devtools change le titre.

## Challenge

Remplacer tous les endroits ou nous avons utilisé `stock <= 0` par une propriété calculée. (Attention aux conditions qui risquent de s'inverser dans certains des cas)

# 9. Components & Props

Les composants sont des éléments très importants à comprendre et à utiliser. Ils permettent de structurer notre projet et dans Vue particulièrement ils ont de nombreux avantages. Le plus évident est le fait qu'ils permettent de mieux structurer notre projet et de regrouper le HTML, le CSS et le JS relatif à un composant dans un même fichier.

## Premier composant

Nous allons maintenant créer notre premier composant nommé `ProductDisplay.vue` dans un nouveau dossier `src/components`.

Créons la structure de base de ce composant
Comme `App.vue`, il contient une section `<script setup>` pour le JS et une section `<template>` qui contiendra le HTML.

```vue
<script setup>
import { ref, computed } from "vue";
</script>

<template></template>
```

Il faut ensuite copier l'HTML qui est en lien direct avec ce composant et qui se trouve pour l'instant dans le template de `App.vue` (tout prendre sauf titre et panier).

Puis copier le JS qui est en lien direct avec ce composant et qui se trouve pour l'instant dans le script de `App.vue` (tout prendre sauf se qui est en lien avec le titre et le panier : `action`, `brand`, `url`, `cart`, `title`).

> Le bouton « Ajouter au panier » ne fonctionne plus pour l'instant, car `cart` est resté dans `App.vue` : un clic provoque l'erreur, il sera réparé plus tard.

Nous pouvons maintenant utiliser notre composant dans le HTML comme une nouvelle balise. Ajoutons notre composant sous le titre, comme avant. Il faut d'abord l'importer dans le script de `App.vue`. ( importer le composant ou on veut l'utiliser)

```js
import ProductDisplay from "./components/ProductDisplay.vue";
```

```html
<ProductDisplay />
```

Pour montrer la puissance de Vue, on peut juste essayer de copier-coller plusieurs fois cet élément dans la page.

## Les PROPS

Les props (propriétés) dans vues permettent de passer des données d'un composant parent à un composant enfant. Pour le sens inverse on utilise des emits car l'enfant peut lire la props mais pas la modifier

Ajoutons maintenant une nouvelle fonctionnalité afin de tester les props des composants. Nous voulons savoir si l'utilisateur est premium et effectuer quelque chose en fonction de cette valeur.

Dans `App.vue` il faut ajouter une var dans le script nommée `premium` à `true` ou `false`.

Ensuite il faut l'envoyer au composant depuis le HTML.

Ici le componant parent (App.vue) qui possède la donnée

```html
<ProductDisplay :premium="premium" />
```

Puis il faut permettre au composant de réceptionner et utiliser cette variable avec `defineProps` dans le script du composant.

La props peut avoir plusieurs paramètres comme `type`, `required`, `default`, etc.

Ici le composant enfant (ProductDisplay.vue) qui réceptionne la donnée

```js
const props = defineProps({
  premium: {
    type: Boolean,
    required: true,
  },
});
```

> `defineProps` n'a pas besoin d'être importé. Dans le template on utilise `premium`, dans le script `props.premium`.

Nous pouvons maintenant créer une propriété calculée(computed) `shipping` dans le composant afin d'utiliser cette prop.

```js
const shipping = computed(() => {
  if (props.premium) {
    return "Free";
  }

  return 2.99;
});
```

Et enfin, utilisons cette propriété calculée dans le composant en dessous des détails.

```HTML
<p>Shipping: {{ shipping }}</p>
```

> **Résultat attendu :** la page ressemble à celle d'avant, avec en plus « Shipping: Free » si `premium` vaut `true`, ou « Shipping: 2.99 » s'il vaut `false`. Le bouton « Ajouter au panier » ne fonctionne pas encore.

## Challenge

Créer un nouveau composant `ProductDetails.vue` prenant le tableau `details` en tant que prop.

# 10. Communicating Events

Nous avons vu dans le chapitre précédent comment passer de l'information d'un composant "parent" à un composant "enfant". Mais comment faire l'inverse ?

Alors une solution est l'utilisation des events.

Pour illustrer notre exemple, nous allons réparer le bouton "Ajouter au panier" que nous avions cassé dans le chapitre précédent.

## Envoyer

Commençons en allant dans `ProductDisplay.vue` en modifiant le contenu de la méthode `addToCart()` par le code suivant qui permet d'envoyer un événement que nous allons ensuite réceptionner.

```js
emit("add-to-cart");
```

Il faut aussi indiquer le nouveau emit en haut du composant après `defineProps`.

```js
const emit = defineEmits(["add-to-cart"]);
```

## Recevoir

Il nous faut donc réceptionner l'événement en ajoutant une directive `v-on` ou `@` à notre déclaration de `ProductDisplay` dans `App.vue`.

`@add-to-cart` peu donc, effectuez quelque chose une fois l'événement réceptionné et dans notre cas nous allons appeler une méthode `updateCart` dans `App.vue` qui va incrémenter `cart` à chaque clique.

```js
function updateCart() {
  cart.value += 1;
}
```

```html
<ProductDisplay :premium="premium" @add-to-cart="updateCart" />
```

## Ajoutons des paramètres

Un event peut aussi tranporter des données, modifions le code pour que le bouton envoie aussi l'id de l'image affichée lors du clic pour savoir quelle photo a convaincu l'utilisateur. C'est l'enfant qui doit l'envoyer, car seulement lui connait l'image sélectionnée.

Il faut tout d'abord modifier notre var `cart` dans le script pour accepter plusieurs entrés en le transformant en tableau.

```js
const cart = ref([]);
```

Puis envoyer la valeur à l'aide du `emit` (dans ProductDisplay.vue) et modifier un peu la méthode de réception.

```js
emit("add-to-cart", carouselImages.value[selectedImage.value].id);
```

Vue transmet automatiquement cette valeur à la méthode qui écoute l'événement. `updateCart` la reçoit en paramètre et l'ajoute au tableau :

```js
function updateCart(id) {
  cart.value.push(id);
}
```

Maintenant nous avons un panier qui contient la liste des id des images affichées au moment du clic par exemple [1, 3, 3]. Nous souhaitons retrouver le fonctionnement d'avant ou nous avions le nombre d'éléments dans le panier, pour cela il suffit d'utiliser `cart.length` aux endroits ou nous utilisons `cart`(dans le App.vue).

> **Résultat attendu :** le bouton « Ajouter au panier » fonctionne de nouveau et le panier affiche le nombre d'articles. Dans Vue Devtools, `cart` contient les `id` des images affichées au moment des clics.

## Challenge

Ajouter un nouveau bouton à `ProductDisplay` permettant de supprimer des objets du panier.

# 11. Forms & V-model

Maintenant nous nous attaquons à la dernière partie.

## Bootstrap c'est délicieux pour les yeux

Pour cette partie nous allons utiliser Bootstrap, histoire d'éviter que nos formulaires soient absolument immondes et illisibles :)

Nous allons changer légèrement le template de `App.vue`.

```html
<div class="container">
  <div class="row"></div>
</div>
```

Et ajouter la classe `col-8` au titre, `col-4` au panier et `col-12` sur un `div` entourant `ProductDisplay`.

## Création d'un composant formulaire

Nous allons maintenant créer un nouveau composant `ReviewForm.vue` à partir du modèle suivant.

```vue
<script setup>
import { ref } from "vue";
</script>

<template>
  <form>
    <h3>Laissez un message</h3>

    <div class="mb-3">
      <label for="name">Nom</label>
      <input id="name" class="form-control" />
    </div>

    <div class="mb-3">
      <label for="review">Message</label>
      <textarea id="review" class="form-control"></textarea>
    </div>

    <div class="mb-3">
      <label for="rating">Note</label>
      <select id="rating" class="form-select">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </div>

    <input class="btn btn-primary mb-5" type="submit" value="Envoyer" />
  </form>
</template>
```

Ajoutons maintenant 3 var qui stockeront les valeurs des champs de notre formulaire.

```js
const name = ref("");
const review = ref("");
const rating = ref(null);
```

## v-model

Nous allons ensuite utiliser une nouvelle directive nommée `v-model` (bidirectionnel) qui permet de faire des modifications bidirectionnelles (si l'utilisateur modifie le champ relié à la var, la var est update et si la var est update, le champ est update également). Contrairement à `v-bind`, (unidirectionnel) qui permet uniquement d'update le DOM à partir des changements effectués sur une var ou une prop.

Ajouter la directive `v-model` à l'input, aux textarea et au select (.number pour le select est un modificateur ou "modifier" qui permet d'effectuer directement des modifications sur la valeur reçue, ici .number convertit l'entrée en float).

```html
<input id="name" class="form-control" v-model="name" />

<textarea id="review" class="form-control" v-model="review"></textarea>

<select id="rating" class="form-select" v-model.number="rating"></select>
```

## Envoyer

Afin d'envoyer le formulaire, nous allons utiliser la directive `@` afin d'écouter l'événement d’envoi du formulaire (.prevent permet d'annuler le rafraîchissement automatique du navigateur).

```html
<form @submit.prevent="onSubmit"></form>
```

Il faut créer la méthode `onSubmit`.

```js
function onSubmit() {
  const productReview = {
    name: name.value,
    review: review.value,
    rating: rating.value,
  };
  emit("review-submitted", productReview);

  name.value = "";
  review.value = "";
  rating.value = "";
}
```

Et indiquer le nouveau emit en haut du script.

```js
const emit = defineEmits(["review-submitted"]);
```

## Recevoir

Importons le composant dans `ProductDisplay.vue` et utilisons-le. On peut directement ajouter la directive `@` permettant de récupérer l'objet envoyé par le formulaire. (Ajouter un peu de bootstrap aussi)

```js
import ReviewForm from "./ReviewForm.vue";
```

```html
<div class="col-6 offset-3">
  <ReviewForm @review-submitted="addReview" />
</div>
```

Maintenant, ajouter un tableau qui stockera nos messages dans le script du composant `ProductDisplay`.

```js
const reviews = ref([]);
```

Et une méthode qui remplit le tableau.

```js
function addReview(review) {
  reviews.value.push(review);
}
```

## Afficher les messages reçus dans un nouveau form

On peut maintenant créer un nouveau composant `ReviewList.vue` capable d'afficher les messages à partir de ce modèle.

```vue
<script setup></script>

<template>
  <h3>Messages :</h3>

  <div class="card mb-3">
    <h5 class="card-header"></h5>

    <div class="card-body">
      <p class="card-text"></p>
    </div>
  </div>
</template>
```

Il faut créer une prop qui réceptionnera nos messages.

```js
defineProps({
  reviews: {
    type: Array,
    required: true,
  },
});
```

Ensuite on itère sur tous les éléments du tableau au bon endroit dans le composant et on affiche les valeurs contenues dans chaque élément.

```HTML
<h3>Messages :</h3>

<div class="card mb-3" v-for="(review, index) in reviews" :key="index">
  <h5 class="card-header">
    {{ review.name }} à noté ça {{ review.rating }} étoiles
  </h5>

  <div class="card-body">
    <p class="card-text">{{ review.review }}</p>
  </div>
</div>
```

Il faut ensuite importer le composant dans `ProductDisplay.vue` et l'utiliser au-dessus du formulaire.

```js
import ReviewList from "./ReviewList.vue";
```

```html
<ReviewList :reviews="reviews" />
```

Ajouter un `v-if` sur le composant afin de l'afficher uniquement si au moins une review a été réalisée.

> **Résultat attendu :** après l'envoi du formulaire, le message apparaît dans la liste « Messages : » et les champs se vident. La liste n'apparaît qu'à partir du premier message.

## Challenge

Ajouter une question à `ReviewForm` : "Recommanderiez-vous ce café ?". Enregistrer et émettre la réponse, et l'afficher dans `ReviewList`.

# 12. Pour aller plus loin

Ce chapitre présente 3 notions qui serviront dans un vrai projet (avec Django ou Laravel par exemple). Il n'y a rien à ajouter au projet : le but est de savoir que ça existe.

## onMounted

`onMounted` permet d'exécuter du code quand le composant apparaît à l'écran. C'est par exemple là qu'on charge des données depuis une API (Django, Laravel, etc.).

```js
import { ref, onMounted } from "vue";

const reviews = ref([]);

onMounted(async () => {
  const response = await fetch("http://localhost:8000/api/reviews/");
  reviews.value = await response.json();
});
```

> Dans notre projet, les messages disparaissent quand on recharge la page. Avec ce code, ils viendraient d'une base de données.

Pour plus de détails : https://vuejs.org/guide/essentials/lifecycle.html

## watch

`watch` permet de lancer une action quand une valeur change. La différence avec une propriété calculée : `computed` calcule une valeur à afficher, `watch` effectue une action (appeler une API, sauvegarder).

Exemple : un champ de recherche qui interroge l'API à chaque modification.

```js
import { ref, watch } from "vue";

const search = ref("");
const products = ref([]);

watch(search, async (text) => {
  const response = await fetch(
    `http://localhost:8000/api/products/?search=${text}`,
  );
  products.value = await response.json();
});
```

```html
<input v-model="search" />
```

Pour plus de détails : https://vuejs.org/guide/essentials/watchers.html

## Slots

Les props permettent de passer des données à un composant. Les slots permettent de lui passer du contenu HTML. C'est utile pour créer des composants réutilisables (carte, fenêtre modale, mise en page, etc.).

```vue
<!-- BaseCard.vue -->
<template>
  <div class="card mb-3">
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>
```

Le contenu placé entre les balises du composant remplace `<slot />`.

```html
<BaseCard>
  <p>N'importe quel contenu ici</p>
</BaseCard>
```

> Par exemple, `ReviewList` pourrait utiliser `BaseCard` au lieu de répéter le HTML de Bootstrap.

Pour plus de détails : https://vuejs.org/guide/components/slots.html

# 13. Conclusion

Nous avons maintenant compris comment fonctionnent tous les concepts principaux de Vue.js

La documentation officielle de Vue 3 est maintenant disponible ici : https://vuejs.org/guide/
Pour démarrer un projet complet, la méthode recommandée est : npm create vue@latest

Vue.js peut être utilisé de plusieurs manières. Seul pour gérer toute l'application (avec Pinia, Vue Router etc,) ou en combinaison avec un autre Framework. Dans ce deuxième cas de figure Vue s'occuperont de la partie FrontEnd et l'autre Framework du BackEnd (laravel par exemple ;))

Pour les améliorations possible penser à l’UX (ex : animations, validations en temps réel avec feedback utilisateur).
