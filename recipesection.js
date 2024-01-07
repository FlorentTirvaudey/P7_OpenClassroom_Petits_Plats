const cardsection = document.getElementById("card_section");

const nbRecipes = document.getElementById("number_of_recipes");

const ingreInDropdown = document.getElementById("ingredient_in_dropdown");
const apparInDropdown = document.getElementById("appareils_in_dropdown");
const ustenInDropdown = document.getElementById("ustensils_in_dropdown");

const hiddenIngredientsList = document.getElementById("hidden_ingredients_in_dropdown");
const hiddenAppareilsList = document.getElementById("hidden_appareils_in_dropdown");
const hiddenUstensilsList = document.getElementById("hidden_ustensils_in_dropdown");

function getAllIngredients(data) {
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

function getAllAppareils(data) {
	let appareilsTab = [];

	data.forEach(datas => {
		if (datas.appliance && !appareilsTab.includes(datas.appliance)) {
			appareilsTab.push(datas.appliance);
		}
	})
	console.log("les appareils", appareilsTab);
	return appareilsTab;
}

function getAllUstensils(data) {
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

function removeOnclickCross(cross, noeud) {
	cross.addEventListener("click", () => {
		noeud.remove();
	})
}

function createSearchContainer(element, noeudToRemove) {
	const noeudParent = document.getElementById("search_container_created");

	const searchContainer = document.createElement( "div" );
	searchContainer.setAttribute("id", "search_item_in_new_container");
	searchContainer.setAttribute("class", "flex flex-row justify-between items-center p-6 bg-yellow-400 rounded-[15px] w-[20%]");

	const elementContent = document.createElement( "span" );
	elementContent.setAttribute("class", "flex align-middle text-2xl");
	elementContent.textContent = element;

	const crossButton = document.createElement( "button" );
	crossButton.setAttribute("class", "text-2xl");

	const crossIcon = document.createElement( "i" );
	crossIcon.setAttribute("class", "fa-solid fa-xmark");

	crossButton.appendChild(crossIcon);

	searchContainer.appendChild(elementContent);
	searchContainer.appendChild(crossButton);

	noeudParent.appendChild(searchContainer);

	crossButton.addEventListener("click", e => {
		// const otherCrossToRemove = document.getElementById("search_item_in_dropdown");

		// console.log(e.target.parentElement.previousElementSibling.textContent)

		// const otherCrossToRemove = document.getElementById("hidden_ustensils_in_dropdown")
		

		const itemToRemove = Array.from(noeudToRemove.children).filter(element => element.textContent === elementContent.textContent)[0];
		console.log(itemToRemove);
		console.log(searchContainer);

		searchContainer.remove();
		itemToRemove.remove();
	})
}

function createContainerInDropdown(element, noeudParent) {
	const selectHiddenItems = document.createElement( "li" );
	selectHiddenItems.setAttribute("class", "flex text-xl justify-between align-middle px-2 py-2");
	selectHiddenItems.setAttribute("id", "search_item_in_dropdown");
	selectHiddenItems.textContent = element;

	// const elementInHiddenList = document.createElement( "span" );
	// elementInHiddenList.setAttribute("class", "font-['Manrope']");
	// elementInHiddenList.textContent = element;

	const crossButtonInDropdown = document.createElement( "button" );
	crossButtonInDropdown.setAttribute("class", "text-xl hidden");

	const crossInDropdown = document.createElement( "i" );
	crossInDropdown.setAttribute("class", "fa-solid fa-xmark");

	crossButtonInDropdown.appendChild(crossInDropdown);

	selectHiddenItems.appendChild(crossButtonInDropdown);

	noeudParent.appendChild(selectHiddenItems);

	// selectHiddenItems.addEventListener("mouseover", () => {
	// 	crossButtonInDropdown.removeAttribute("hidden");
	// 	console.log("test")
	// })

	crossButtonInDropdown.addEventListener("click", e => {
		const otherCrossToRemove = document.getElementById("search_item_in_new_container");
		console.log(e)
		selectHiddenItems.remove();
		otherCrossToRemove.remove();
	})
}

function isAlreadyInChild(noeud, element) {
	let result = false;

	for (let i = 0; i < noeud.children.length; i++) {
		console.log("celui dans le child", noeud.children);
		console.log("celui où on clique", element);
		if (noeud.children[i].innerText === element) {
			result = true;
		}
	}
	return result;
}

function displayDataInDropdownMenu(noeud, datas, selectList) {

	datas.forEach(data => {

		const li = document.createElement( "li" );
		li.setAttribute("class", "cursor-pointer");
		li.textContent = data;
		noeud.appendChild(li);
		
		li.addEventListener("click", e => {
			if (e.target.innerText){
				if (!selectList.children.length || !(isAlreadyInChild(selectList, e.target.innerText))) {
					createSearchContainer(e.target.innerText, selectList);
					createContainerInDropdown(e.target.innerText, selectList);
					selectList.classList.remove('hidden');
				}
			}	
		})
	})
}

function updateDataInDropdownMenu(noeud, datas, selectList) {

	noeud.innerHTML = "";

	datas.forEach(data => {
		const li = document.createElement( "li" );
		li.setAttribute("class", "cursor-pointer");
		li.textContent = data;
		noeud.appendChild(li);

		li.addEventListener("click", e => {
			if (e.target.innerText){
				if (!selectList.children.length || !(isAlreadyInChild(selectList, e.target.innerText))) {
					createSearchContainer(e.target.innerText, selectList);
					createContainerInDropdown(e.target.innerText, selectList);
					selectList.classList.remove('hidden');
				}
			}
		})
	})
}

function filteredInDropdownMenu(noeud, e, datas, selectList) {

	const eventValue = e.target.value.trim().toLowerCase();

	console.log(e.target);

	if (!eventValue || eventValue.length < 3) {
		updateDataInDropdownMenu(noeud, datas, selectList);
	} else if (eventValue.length >= 3){
		const filteredDatas = datas.filter(element => element.toLowerCase().includes(eventValue));
		updateDataInDropdownMenu(noeud, filteredDatas, selectList);
	}
}

function displayRecipeCards(datas) {
	let add = 0;

	datas.forEach(data => {
		add = add + 1;
		nbRecipes.textContent = add;

		const recipe = new Recipe(data);
		const card = new RecipeCard(recipe).getReceipeCard();
		cardsection.appendChild(card);
	})
}

function updateRecipeCard(datas) {
	cardsection.innerHTML = "";
	nbRecipes.innerHTML = "";

	let add = 0;

	datas.forEach(data => {
		add = add + 1;
		nbRecipes.textContent = add;

		const recipe = new Recipe(data);
		const card = new RecipeCard(recipe).getReceipeCard();
		cardsection.appendChild(card);
	})	

	if (add === 0) {
		nbRecipes.innerHTML = "0";

		const noRecipe = document.createElement( "span" );
		noRecipe.textContent = "Aucune recette ne correspond à votre recherche";
		noRecipe.setAttribute("class", "text-2xl font-['Anton']")

		cardsection.appendChild(noRecipe);
	}
}

function filteredRecipeCard(datas, e, ingredients, appareils, ustensils, ingreInput, apparInput, ustenInput) {

	const eventValue = e.target.value.trim().toLowerCase();
	
	if (!eventValue || eventValue.length < 3) {
		updateRecipeCard(datas, nbRecipes);

		updateDataInDropdownMenu(ingreInDropdown, ingredients, hiddenIngredientsList);
		updateDataInDropdownMenu(apparInDropdown, appareils, hiddenAppareilsList);
		updateDataInDropdownMenu(ustenInDropdown, ustensils, hiddenUstensilsList);

		console.log("datas", datas)

		ingreInput.addEventListener("input", (e) => {
			filteredInDropdownMenu(ingreInDropdown, e, ingredients, hiddenIngredientsList);
		})
		apparInput.addEventListener("input", (e) => {
			filteredInDropdownMenu(apparInDropdown, e, appareils, hiddenAppareilsList);
		})
		ustenInput.addEventListener("input", (e) => {
			filteredInDropdownMenu(ustenInDropdown, e, ustensils, hiddenUstensilsList);
		})

	} else if (eventValue.length >= 3){
		const filteredDatas = datas.filter(element => element.name.toLowerCase().includes(eventValue) 
		|| element.description.toLowerCase().includes(eventValue) 
		|| element.ingredients.forEach(data => {
			data.ingredient.toLowerCase().includes(eventValue);
		})
		);
		
		const updatedIngredients = getAllIngredients(filteredDatas);
		const updatedAppareils = getAllAppareils(filteredDatas);
		const updatedUstensils = getAllUstensils(filteredDatas);

		updateRecipeCard(filteredDatas, nbRecipes);

		updateDataInDropdownMenu(ingreInDropdown, updatedIngredients, hiddenIngredientsList);
		updateDataInDropdownMenu(apparInDropdown, updatedAppareils, hiddenAppareilsList);
		updateDataInDropdownMenu(ustenInDropdown, updatedUstensils, hiddenUstensilsList);
		
		ingreInput.addEventListener("input", (e) => {
			filteredInDropdownMenu(ingreInDropdown, e, updatedIngredients, hiddenIngredientsList);
		})
		apparInput.addEventListener("input", (e) => {
			filteredInDropdownMenu(apparInDropdown, e, updatedAppareils, hiddenAppareilsList);
		})
		ustenInput.addEventListener("input", (e) => {
			filteredInDropdownMenu(ustenInDropdown, e, updatedUstensils, hiddenUstensilsList);
		})
	}
}


function displayPage() {
	const ingreInput = document.getElementById("ingredient_input");
	const apparInput = document.getElementById("appareils_input");
	const ustenInput = document.getElementById("ustensiles_input");

	const mainInput = document.getElementById("main_input");

	const ingredients = getAllIngredients(recipes);
	const appareils = getAllAppareils(recipes);
	const ustensils = getAllUstensils(recipes);

	displayDataInDropdownMenu(ingreInDropdown, ingredients, hiddenIngredientsList);
	displayDataInDropdownMenu(apparInDropdown, appareils, hiddenAppareilsList);
	displayDataInDropdownMenu(ustenInDropdown, ustensils, hiddenUstensilsList);

	displayRecipeCards(recipes);

	ingreInput.addEventListener("input", (e) => {
		filteredInDropdownMenu(ingreInDropdown, e, ingredients, hiddenIngredientsList);
	})
	apparInput.addEventListener("input", (e) => {
		filteredInDropdownMenu(apparInDropdown, e, appareils, hiddenAppareilsList);
	})
	ustenInput.addEventListener("input", (e) => {
		filteredInDropdownMenu(ustenInDropdown, e, ustensils, hiddenUstensilsList);
	})

	mainInput.addEventListener("input", e => {
		filteredRecipeCard(recipes, e, ingredients, appareils, ustensils, ingreInput, apparInput, ustenInput);
	})

	openDropdownMenu();
}

displayPage();