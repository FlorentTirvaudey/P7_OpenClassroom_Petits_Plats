const ingreInDropdown = document.getElementById("ingredient_in_dropdown");
const apparInDropdown = document.getElementById("appareils_in_dropdown");
const ustenInDropdown = document.getElementById("ustensils_in_dropdown");

const hiddenUstensilsList = document.getElementById("hidden_ustensils_in_dropdown"); // en teste ajout dans le dropdown menu

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

// function displayDataInDropdownMenu(ingredients, appareils, ustensiles) {

// 	const ustenInput = document.getElementById("ustensiles_input");

// 	ustensiles.forEach(ustensil => {
// 		const usten = document.createElement( "li" );
// 		usten.setAttribute("class", "cursor-pointer");
// 		usten.textContent = ustensil;
// 		ustenInDropdown.appendChild(usten);

// 		usten.addEventListener("click", e => {
// 			const hiddenUsten = document.createElement( "li" );
// 			hiddenUsten.textContent = e.target.innerHTML;
// 			hiddenUstensilsList.appendChild(hiddenUsten);
// 		})
// 	})
// }

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

function createSearchContainer(element) {
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

	crossButton.addEventListener("click", () => {
		const otherCrossToRemove = document.getElementById("search_item_in_dropdown");

		searchContainer.remove();
		otherCrossToRemove.remove();
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

	crossButtonInDropdown.addEventListener("click", () => {
		const otherCrossToRemove = document.getElementById("search_item_in_new_container");

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

function displayDataInDropdownMenu(noeud, datas, selectList, hiddenSection) {

	datas.forEach(data => {

		const li = document.createElement( "li" );
		li.setAttribute("class", "cursor-pointer");
		li.textContent = data;
		noeud.appendChild(li);
		
		li.addEventListener("click", e => {
			if (e.target.innerText){
				if (!selectList.children.length || !(isAlreadyInChild(selectList, e.target.innerText))) {
					createSearchContainer(e.target.innerText);
					createContainerInDropdown(e.target.innerText, selectList);
					hiddenSection.classList.remove('hidden');
				}
			}	
		})
	})
}

function updateDataInDropdownMenu(noeud, datas, selectList, hiddenSection) {

	noeud.innerHTML = "";

	console.log("test")
	
	datas.forEach(data => {
		const li = document.createElement( "li" );
		li.setAttribute("class", "cursor-pointer");
		li.textContent = data;
		noeud.appendChild(li);

		li.addEventListener("click", e => {
			if (e.target.innerText){
				if (!selectList.children.length || !(isAlreadyInChild(selectList, e.target.innerText))) {
					createSearchContainer(e.target.innerText);
					createContainerInDropdown(e.target.innerText, selectList);
					hiddenSection.classList.remove('hidden');
				}
			}
		})
	})
}

function filteredInDropdownMenu(noeud, e, datas, hiddenUstensilsList, ustenHiddenSection) {

	const eventValue = e.target.value.trim().toLowerCase();

	console.log(e.target);

	if (!eventValue || eventValue.length < 3) {
		updateDataInDropdownMenu(noeud, datas, hiddenUstensilsList, ustenHiddenSection);
	} else if (eventValue.length >= 3){
		const filteredDatas = datas.filter(element => element.toLowerCase().includes(eventValue));
		updateDataInDropdownMenu(noeud, filteredDatas, hiddenUstensilsList, ustenHiddenSection);
	}
}

function filteredInDropdownMenu(noeud, e, datas, hiddenUstensilsList, ustenHiddenSection) {

	const eventValue = e.target.value.trim().toLowerCase();

	console.log(datas);

	if (!eventValue || eventValue.length < 3) {
		updateDataInDropdownMenu(noeud, datas, hiddenUstensilsList, ustenHiddenSection);
	} else if (eventValue.length >= 3){
		const filteredDatas = datas.filter(element => element.toLowerCase().includes(eventValue));
		updateDataInDropdownMenu(noeud, filteredDatas, hiddenUstensilsList, ustenHiddenSection);
	}
}

function displayRecipeCards(datas, noeudCards, noeudNbRecipes) {
	let add = 0;

	datas.forEach(data => {
		add = add + 1;
		noeudNbRecipes.textContent = add;

		const recipe = new Recipe(data);
		const card = new RecipeCard(recipe).getReceipeCard();
		noeudCards.appendChild(card);
	})
}

function updateRecipeCard(datas, noeudCards, noeudNbRecipes) {
	noeudCards.innerHTML = "";
	noeudNbRecipes.innerHTML = "";

	let add = 0;

	datas.forEach(data => {
		add = add + 1;
		noeudNbRecipes.textContent = add;

		const recipe = new Recipe(data);
		const card = new RecipeCard(recipe).getReceipeCard();
		noeudCards.appendChild(card);
	})	
}

function filterInDropdownWithFilterRecipes(noeud, e, datas) {
	noeud.innerHTML = "";

	datas.forEach(element => {

	})
}

function filteredRecipeCard(datas, e, noeudCards, noeudNbRecipes, ingreInput, apparInput, ustenInput, hiddenUstensilsList, ustenHiddenSection) {

	const eventValue = e.target.value.trim().toLowerCase();

	if (!eventValue || eventValue.length < 3) {
		updateRecipeCard(datas, noeudCards, noeudNbRecipes);
		updateDataInDropdownMenu(ustenInDropdown, datas, hiddenUstensilsList, ustenHiddenSection);
		console.log("datas", datas)
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

		// console.log("updated datas ingredients", updatedIngredients);

		updateRecipeCard(filteredDatas, noeudCards, noeudNbRecipes);

		// displayDataInDropdownMenu(ingreInDropdown, updatedIngredients);
		// displayDataInDropdownMenu(apparInDropdown, updatedAppareils);
		// displayDataInDropdownMenu(ustenInDropdown, updatedUstensils, hiddenUstensilsList, ustenHiddenSection);

		// filteredInDropdownMenu(ingreInDropdown, e, updatedIngredients);
		// filteredInDropdownMenu(apparInDropdown, e, updatedAppareils);
		// filteredInDropdownMenu(ustenInDropdown, e, updatedUstensils, hiddenUstensilsList, ustenHiddenSection);


		// updateDataInDropdownMenu(ingreInput, updatedIngredients, hiddenUstensilsList, ustenHiddenSection);
		// updateDataInDropdownMenu(apparInput, updatedAppareils, hiddenUstensilsList, ustenHiddenSection);
		updateDataInDropdownMenu(ustenInDropdown, updatedUstensils, hiddenUstensilsList, ustenHiddenSection);
		
		ingreInput.addEventListener("input", (e) => {
			filteredInDropdownMenu(ingreInDropdown, e, updatedIngredients);
		})
		apparInput.addEventListener("input", (e) => {
			filteredInDropdownMenu(apparInDropdown, e, updatedAppareils);
		})
		ustenInput.addEventListener("input", (e) => {
			filteredInDropdownMenu(ustenInDropdown, e, updatedUstensils, hiddenUstensilsList, ustenHiddenSection);
		})
	}
}


function displayPage() {
	const cardsection = document.getElementById("card_section");
	const nbRecipes = document.getElementById("number_of_recipes");

	const ingreInput = document.getElementById("ingredient_input");
	const apparInput = document.getElementById("appareils_input");
	const ustenInput = document.getElementById("ustensiles_input");

	const ustenHiddenSection = document.getElementById("hidden_ustensils_in_dropdown");

	const mainInput = document.getElementById("main_input");

	const ingredients = getAllIngredients(recipes);
	const appareils = getAllAppareils(recipes);
	const ustensils = getAllUstensils(recipes);

	displayDataInDropdownMenu(ingreInDropdown, ingredients);
	displayDataInDropdownMenu(apparInDropdown, appareils);
	displayDataInDropdownMenu(ustenInDropdown, ustensils, hiddenUstensilsList, ustenHiddenSection);

	displayRecipeCards(recipes, cardsection, nbRecipes);

	ingreInput.addEventListener("input", (e) => {
		filteredInDropdownMenu(ingreInDropdown, e, ingredients);
	})
	apparInput.addEventListener("input", (e) => {
		filteredInDropdownMenu(apparInDropdown, e, appareils);
	})
	ustenInput.addEventListener("input", (e) => {
		filteredInDropdownMenu(ustenInDropdown, e, ustensils, hiddenUstensilsList, ustenHiddenSection);
	})

	mainInput.addEventListener("input", e => {
		filteredRecipeCard(recipes, e, cardsection, nbRecipes, ingreInput, apparInput, ustenInput, hiddenUstensilsList, ustenHiddenSection);
	})

	openDropdownMenu();
}

displayPage();


// algo : faire une liste où tu concatènes tout les ingrédients ensemble (tu regroupes les éléments) pour pouvoir faire une recherche ciblée

/* 
	Questions :

	*/