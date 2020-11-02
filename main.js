var app = new Vue({
    el: "#app",
    data(){
        return {
            title: "Achate de café nespresso",
            description: "L’histoire de NESPRESSO est celle d’une passion inaltérable pour la perfection et d’une quête inlassable d’innovation en faveur de la plus haute qualité.",
            image: "./images/colombia.png",
            urlNespresso:"https://www.nespresso.com/ch/fr/",
            inSale: true,
            stock: 10,
            details: ["Doux", "Harmonieux", "Bien veineux", "Onctueux"],
            carouselImages: [
                {
                    id: 1, 
                    text: "capsule 1",
                },
                {
                    id: 2, 
                    text: "capsule 2",
                },
                {
                    id: 3, 
                    text: "capsule 3",
                },
                {
                    id: 4, 
                    text: "capsule 4",
                },
                
            ]
        }
    }
})