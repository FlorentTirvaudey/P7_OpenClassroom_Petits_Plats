const cardsection = document.getElementById("card_section");

const nbRecipes = document.getElementById("number_of_recipes");

const ingreInDropdown = document.getElementById("ingredient_in_dropdown");
const apparInDropdown = document.getElementById("appareils_in_dropdown");
const ustenInDropdown = document.getElementById("ustensils_in_dropdown");

const hiddenIngredientsList = document.getElementById("hidden_ingredients_in_dropdown");
const hiddenAppareilsList = document.getElementById("hidden_appareils_in_dropdown");
const hiddenUstensilsList = document.getElementById("hidden_ustensils_in_dropdown");

const ingreInput = document.getElementById("ingredient_input");
const apparInput = document.getElementById("appareils_input");
const ustenInput = document.getElementById("ustensiles_input");

const tagsSection = document.getElementById("search_container_created");

function getAllIngredients(data) {
	let ingredientTab = [];

	data.forEach(datas => {
		datas.ingredients.forEach(ingredient => {
			if (ingredient.ingredient && !ingredientTab.includes(ingredient.ingredient)) {
				ingredientTab.push(ingredient.ingredient);
			}
		})
	})
	return ingredientTab;
}

function getAllAppareils(data) {
	let appareilsTab = [];

	data.forEach(datas => {
		if (datas.appliance && !appareilsTab.includes(datas.appliance)) {
			appareilsTab.push(datas.appliance);
		}
	})
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

function createSearchContainer(element, noeudToRemove, datasFromRecipes) {

	const searchContainer = document.createElement( "div" );
	searchContainer.setAttribute("id", "search_item_in_new_container");
	searchContainer.setAttribute("class", "flex flex-row justify-between items-center p-2 md:p-3 bg-yellow-400 rounded-[5px] md:rounded-[10px] w-[88px] md:w-[160px] lg:w-[200px]");

	const elementContent = document.createElement( "span" );
	elementContent.setAttribute("class", "flex align-middle text-[0.7em] md:text-[1.0em]");
	elementContent.textContent = element;

	const crossButton = document.createElement( "button" );
	crossButton.setAttribute("class", "text-[0.5em] md:text-[0.8em]");

	const crossIcon = document.createElement( "i" );
	crossIcon.setAttribute("class", "fa-solid fa-xmark");

	crossButton.appendChild(crossIcon);

	searchContainer.appendChild(elementContent);
	searchContainer.appendChild(crossButton);

	tagsSection.appendChild(searchContainer);

	crossButton.addEventListener("click", () => {
		const itemToRemove = Array.from(noeudToRemove.children).filter(element => element.textContent === elementContent.textContent)[0];

		if (itemToRemove) {
			itemToRemove.remove();
		}
		searchContainer.remove();

		filteredWithTags(recipes);
	})
}

function createSearchContainerFromMainInput(element, datasFromRecipes) {

	const searchContainer = document.createElement( "div" );
	searchContainer.setAttribute("id", "search_item_in_new_container");
	searchContainer.setAttribute("class", "flex flex-row justify-between items-center p-2 md:p-3 bg-yellow-400 rounded-[5px] md:rounded-[10px] w-[88px] md:w-[160px]");

	const elementContent = document.createElement( "span" );
	elementContent.setAttribute("class", "flex align-middle text-[0.7em] md:text-[1.0em]");
	elementContent.textContent = element;

	const crossButton = document.createElement( "button" );
	crossButton.setAttribute("class", "text-[0.5em] md:text-[0.8em]");

	const crossIcon = document.createElement( "i" );
	crossIcon.setAttribute("class", "fa-solid fa-xmark");

	crossButton.appendChild(crossIcon);

	searchContainer.appendChild(elementContent);
	searchContainer.appendChild(crossButton);

	tagsSection.appendChild(searchContainer);

	crossButton.addEventListener("click", () => {

		searchContainer.remove();

		filteredWithTags(recipes);
	})
}

function createContainerInDropdown(element, tagsSection, datasFromRecipes) {
	const selectHiddenItems = document.createElement( "li" );
	selectHiddenItems.setAttribute("class", "flex text-[1em] justify-between align-middle py-[0.7em] group-hover:block");
	selectHiddenItems.setAttribute("id", "search_item_in_dropdown");
	selectHiddenItems.textContent = element;

	const crossButtonInDropdown = document.createElement( "button" );
	crossButtonInDropdown.setAttribute("class", "text-[0.7em] md:text-[0.9em] hidden");

	const crossInDropdown = document.createElement( "i" );
	crossInDropdown.setAttribute("class", "fa-solid fa-xmark");

	crossButtonInDropdown.appendChild(crossInDropdown);

	selectHiddenItems.appendChild(crossButtonInDropdown);

	tagsSection.appendChild(selectHiddenItems);

	selectHiddenItems.addEventListener("mouseover", () => {
		crossButtonInDropdown.classList.remove("hidden");
	})

	selectHiddenItems.addEventListener("mouseout", () => {
		crossButtonInDropdown.classList.add("hidden");
	})

	crossButtonInDropdown.addEventListener("click", () => {
		const otherCrossToRemove = document.getElementById("search_item_in_new_container");

		selectHiddenItems.remove();
		otherCrossToRemove.remove();

		filteredWithTags(recipes);
	})
}

function filteredWithTags(datasFromRecipes) {

	const itemsInTagsSection = Array.from(tagsSection.children);
		if (!itemsInTagsSection.length) {
			
			const ingredients = getAllIngredients(recipes);
			const appareils = getAllAppareils(recipes);
			const ustensils = getAllUstensils(recipes);

			updateRecipeCard(recipes, nbRecipes);

			updateDataInDropdownMenu(ingreInDropdown, ingredients, hiddenIngredientsList, recipes);
			updateDataInDropdownMenu(apparInDropdown, appareils, hiddenAppareilsList, recipes);
			updateDataInDropdownMenu(ustenInDropdown, ustensils, hiddenUstensilsList, recipes);

			ingreInput.addEventListener("input", (e) => {
				filteredInDropdownMenu(ingreInDropdown, e, ingredients, hiddenIngredientsList, recipes);
			})
			apparInput.addEventListener("input", (e) => {
				filteredInDropdownMenu(apparInDropdown, e, appareils, hiddenAppareilsList, recipes);
			})
			ustenInput.addEventListener("input", (e) => {
				filteredInDropdownMenu(ustenInDropdown, e, ustensils, hiddenUstensilsList, recipes);
			})

		} else {
		
		 let filteredDatas = recipes;
		 itemsInTagsSection.forEach(element => {
			filteredDatas = filteredDatas.filter(data =>
				data.appliance.trim().toLowerCase().includes(element.textContent.toLowerCase())
				|| data.ingredients.some(data => data.ingredient.toLowerCase().includes(element.textContent.toLowerCase()))
				|| data.ustensils.some(data => data.toLowerCase().includes(element.textContent.toLowerCase())))
		 }
		);

		const updatedIngredients = getAllIngredients(filteredDatas);
		const updatedAppareils = getAllAppareils(filteredDatas);
		const updatedUstensils = getAllUstensils(filteredDatas);

		updateRecipeCard(filteredDatas, nbRecipes);

		updateDataInDropdownMenu(ingreInDropdown, updatedIngredients, hiddenIngredientsList, filteredDatas);
		updateDataInDropdownMenu(apparInDropdown, updatedAppareils, hiddenAppareilsList, filteredDatas);
		updateDataInDropdownMenu(ustenInDropdown, updatedUstensils, hiddenUstensilsList, filteredDatas);

		ingreInput.addEventListener("input", (e) => {
			filteredInDropdownMenu(ingreInDropdown, e, updatedIngredients, hiddenIngredientsList, recipes);
		})
		apparInput.addEventListener("input", (e) => {
			filteredInDropdownMenu(apparInDropdown, e, updatedAppareils, hiddenAppareilsList, recipes);
		})
		ustenInput.addEventListener("input", (e) => {
			filteredInDropdownMenu(ustenInDropdown, e, updatedUstensils, hiddenUstensilsList, recipes);
		})
		}
}

function isAlreadyInChild(noeud, element) {
	let result = false;

	for (let i = 0; i < noeud.children.length; i++) {
		if (noeud.children[i].innerText === element) {
			result = true;
		}
	}
	return result;
}

function displayDataInDropdownMenu(noeud, datas, selectList, datasFromRecipes) {

	datas.forEach(data => {

		const li = document.createElement( "li" );
		li.setAttribute("class", "cursor-pointer");
		li.textContent = data;
		noeud.appendChild(li);
		
		li.addEventListener("click", e => {
			if (e.target.innerText){
				if (!selectList.children.length || !(isAlreadyInChild(selectList, e.target.innerText.trim().toLowerCase()))) {
					createSearchContainer(e.target.innerText, selectList, datasFromRecipes);
					createContainerInDropdown(e.target.innerText, selectList);
					selectList.classList.remove('hidden');
					filteredWithTags(datasFromRecipes);
				}
			}	
		})
	})
}

function updateDataInDropdownMenu(noeud, datas, selectList, datasFromRecipes) {

	noeud.innerHTML = "";

	datas.forEach(data => {
		const li = document.createElement( "li" );
		li.setAttribute("class", "cursor-pointer");
		li.textContent = data;
		noeud.appendChild(li);

		li.addEventListener("click", e => {
			if (e.target.innerText){
				if (!selectList.children.length || !(isAlreadyInChild(selectList, e.target.innerText))) {
					createSearchContainer(e.target.innerText, selectList, datasFromRecipes);
					createContainerInDropdown(e.target.innerText, selectList, datasFromRecipes);
					selectList.classList.remove('hidden');
					filteredWithTags(datasFromRecipes);
				}
			}
		})
	})
}

function filteredInDropdownMenu(noeud, e, datas, selectList, datasFromRecipes) {

	const eventValue = e.target.value.trim().toLowerCase();

	if (!eventValue || eventValue.length < 3) {
		updateDataInDropdownMenu(noeud, datas, selectList, datasFromRecipes);
	} else if (eventValue.length >= 3){
		const filteredDatas = datas.filter(element => element.toLowerCase().includes(eventValue));
		updateDataInDropdownMenu(noeud, filteredDatas, selectList, datasFromRecipes);
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

function filteredRecipeCard(datas, event, ingredients, appareils, ustensils, ingreInput, apparInput, ustenInput) {

	const itemsInTagsSection = Array.from(tagsSection.children);

	const eventValue = event.trim().toLowerCase();
	
	if ((!eventValue || eventValue.length < 3) && !itemsInTagsSection.length) {
		updateRecipeCard(datas, nbRecipes);

		updateDataInDropdownMenu(ingreInDropdown, ingredients, hiddenIngredientsList, datas);
		updateDataInDropdownMenu(apparInDropdown, appareils, hiddenAppareilsList, datas);
		updateDataInDropdownMenu(ustenInDropdown, ustensils, hiddenUstensilsList, datas);

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
		let filteredDatas = datas.filter(element => element.name.toLowerCase().includes(eventValue) 
		|| element.description.toLowerCase().includes(eventValue) 
		|| element.ingredients.forEach(data => {
			data.ingredient.toLowerCase().includes(eventValue);
		})
		);
		
		const updatedIngredients = getAllIngredients(filteredDatas);
		const updatedAppareils = getAllAppareils(filteredDatas);
		const updatedUstensils = getAllUstensils(filteredDatas);

		updateRecipeCard(filteredDatas, nbRecipes);

		updateDataInDropdownMenu(ingreInDropdown, updatedIngredients, hiddenIngredientsList, filteredDatas);
		updateDataInDropdownMenu(apparInDropdown, updatedAppareils, hiddenAppareilsList, filteredDatas);
		updateDataInDropdownMenu(ustenInDropdown, updatedUstensils, hiddenUstensilsList, filteredDatas);
		
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

	const mainInput = document.getElementById("main_input");

	const mainInputButton = document.getElementById("main_input_button");

	const ingredients = getAllIngredients(recipes);
	const appareils = getAllAppareils(recipes);
	const ustensils = getAllUstensils(recipes);

	displayDataInDropdownMenu(ingreInDropdown, ingredients, hiddenIngredientsList, recipes);
	displayDataInDropdownMenu(apparInDropdown, appareils, hiddenAppareilsList, recipes);
	displayDataInDropdownMenu(ustenInDropdown, ustensils, hiddenUstensilsList, recipes);

	displayRecipeCards(recipes);

	ingreInput.addEventListener("input", (e) => {
		filteredInDropdownMenu(ingreInDropdown, e, ingredients, hiddenIngredientsList, recipes);
	})
	apparInput.addEventListener("input", (e) => {
		filteredInDropdownMenu(apparInDropdown, e, appareils, hiddenAppareilsList, recipes);
	})
	ustenInput.addEventListener("input", (e) => {
		filteredInDropdownMenu(ustenInDropdown, e, ustensils, hiddenUstensilsList, recipes);
	})

	mainInput.addEventListener("input", e => {
		filteredRecipeCard(recipes, e.target.value, ingredients, appareils, ustensils, ingreInput, apparInput, ustenInput);
	})

	mainInputButton.addEventListener("click", () => {
		const inputValue = mainInput.value.trim().toLowerCase();

		if (inputValue.length >= 3) {
			createSearchContainerFromMainInput(inputValue);
	
			filteredWithTags(recipes);
		}
	})

	openDropdownMenu();
}

displayPage();