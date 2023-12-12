const ingreInDropdown = document.getElementById("ingredient_in_dropdown");
const apparInDropdown = document.getElementById("appareils_in_dropdown");
const ustenInDropdown = document.getElementById("ustensils_in_dropdown");

function getIngredients(data) {
	let ingredientTab = [];

	data.forEach(datas => {
		datas.ingredients.forEach(ingredient => {
			if (ingredient.ingredient && !ingredientTab.includes(ingredient.ingredient)) {
				ingredientTab.push(ingredient.ingredient);
			}
		})
	})
	console.log("les ingrédients", ingredientTab);
	return ingredientTab;
}

function getAppareils(data) {
	let appareilsTab = [];

	data.forEach(datas => {
		if (datas.appliance && !appareilsTab.includes(datas.appliance)) {
			appareilsTab.push(datas.appliance);
		}
	})
	console.log("les appareils", appareilsTab);
	return appareilsTab;
}

function getUstensils(data) {
	let ustensilsTab = [];

	data.forEach(datas => {
		datas.ustensils.forEach(ustensil => {
			if (ustensil && !ustensilsTab.includes(ustensil)) {
				ustensilsTab.push(ustensil);
			}
		})
	})
	console.log("les ustensils", ustensilsTab);
	return ustensilsTab;
}

function displayDataInDropdownMenu(ingredients, appareils, ustensiles) {

	const ingreInput = document.getElementById("ingredient_input");
	const apparInput = document.getElementById("appareils_input");
	const ustenInput = document.getElementById("ustensiles_input");

	ingredients.forEach(ingredient => {
		const ingre = document.createElement( "li" );
		ingre.textContent = ingredient;
		ingreInDropdown.appendChild(ingre);
	})
	// ingreInput.addEventListener("input", filteredCard);

	appareils.forEach(appareil => {
		const appar = document.createElement( "li" );
		appar.textContent = appareil;
		apparInDropdown.appendChild(appar);
	})
	// apparInput.addEventListener("input", filteredCard);

	ustensiles.forEach(ustensil => {
		const usten = document.createElement( "li" );
		usten.textContent = ustensil;
		ustenInDropdown.appendChild(usten);
	})
	// ustenInput.addEventListener("input", filteredCard);

}

function openDropdownMenuCSS(noeud, hiddenSearchbar, chevronBtn) {

	noeud.addEventListener("click", () => {
		if(hiddenSearchbar.classList.contains("hidden")) {
			hiddenSearchbar.classList.remove("hidden");
			chevronBtn.classList.replace("fa-chevron-down", "fa-chevron-up");
		} else {
			hiddenSearchbar.classList.add("hidden");
			chevronBtn.classList.replace("fa-chevron-up", "fa-chevron-down");
		}
	})
}

function openDropdownMenu() {
	const ingredientBtn = document.getElementById("ingredient_button");
	const searchbarMenuIngredient = document.getElementById("ingredient_hidden_section");
	const chevronBtnIngre = document.getElementById("chevron_ingredient_button");

	const appareilsBtn = document.getElementById("appareils_button");
	const searchbarMenuAppareil = document.getElementById("appareils_hidden_section");
	const chevronBtnApp = document.getElementById("chevron_appareils_button");

	const ustensilesBtn = document.getElementById("ustensiles_button");
	const searchbarMenuUstensiles = document.getElementById("ustensiles_hidden_section");
	const chevronBtnUst = document.getElementById("chevron_ustensiles_button");

	openDropdownMenuCSS(ingredientBtn, searchbarMenuIngredient, chevronBtnIngre);
	openDropdownMenuCSS(appareilsBtn, searchbarMenuAppareil, chevronBtnApp);
	openDropdownMenuCSS(ustensilesBtn, searchbarMenuUstensiles, chevronBtnUst);
}

function filteredCard(e) {
	const ingredients = getIngredients(recipes);

	ingreInDropdown.innerHTML = "";

	const searchString = e.target.value.toLowerCase();

	const filteredData = ingredients.filter(element => {
		element.toLowerCase().includes(searchString);
	})

	console.log(filteredData);

	
}

function initCards() {
	const cardsection = document.getElementById("card_section");
	const nbRecipes = document.getElementById("number_of_recipes");
	let add = 0;

	recipes.forEach(data => {
		add = add + 1;
		nbRecipes.textContent = add;
		const recipe = new Recipe(data);
		const card = new RecipeCard(recipe).getReceipeCard();
		cardsection.appendChild(card);
	})
}

function displayPage() {
	const ingredients = getIngredients(recipes);
	const appareils = getAppareils(recipes);
	const ustensils = getUstensils(recipes);

	displayDataInDropdownMenu(ingredients, appareils, ustensils);

	initCards();
	openDropdownMenu();
}


displayPage();