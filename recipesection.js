  //import recipes from "./data/recipes.js";
// import require from "./requirejs"
//  const recipes = require("./data/recipes2.json");

// console.log(recipes)

function initCards() {
	const cardsection = document.getElementById("card_section");
	console.log(cardsection)

	recipes.forEach(data => {
		const card = new RecipeCard(data).getReceipeCard();
		// const buildcard = card.getReceipeCard();
		cardsection.appendChild(card);
		console.log(data);

	})
	// data.forEach(dataflux => {

	// })

	// console.log(recipes)
}


initCards();