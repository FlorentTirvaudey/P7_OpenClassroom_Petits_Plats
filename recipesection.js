const ingreInDropdown = document.getElementById("ingredient_in_dropdown");
const apparInDropdown = document.getElementById("appareils_in_dropdown");
const ustenInDropdown = document.getElementById("ustensils_in_dropdown");

const hiddenUstensilsList = document.getElementById("hidden_ustensils_in_dropdown"); // en teste ajout dans le dropdown menu

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

function createSearchContainer(element) {
	const noeudParent = document.getElementById("search_container_created"); // à définir dans l'html

	const searchContainer = document.createElement( "div" );
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
}

// function createContainerInDropdown() {
// 	const selectHiddenItems = document.createElement( "li" );
// 	selectHiddenItems.textContent = e.target.innerHTML;
// 	selectList.appendChild(selectHiddenItems);
// }

function displayDataInDropdownMenu(noeud, datas, selectList, hiddenSection) {

	datas.forEach(data => {

		const li = document.createElement( "li" );
		li.setAttribute("class", "cursor-pointer");
		li.textContent = data;
		noeud.appendChild(li);
		
		li.addEventListener("click", e => {
			createSearchContainer(e.target.innerHTML);
			console.log("je suis le noeud ul AVANT LES IF", selectList)

			// tabTest.push(e.target.innerHTML);
			// tabTest.forEach(items => {
			// 	if (items !== e.target.innerHTML)
			// })
			// selectList.children.forEach(childrens => {
			// 	if (childrens.textContent !== e.target.innerHTML) {
				if (e.target.innerHTML){
					if (!selectList.children || selectList.children) {
						// selectList.children.forEach(children => {
							// if (children.innerHTML == )
							const selectHiddenItems = document.createElement( "li" );
							selectHiddenItems.textContent = e.target.innerHTML;
							selectList.appendChild(selectHiddenItems);
							if (selectList.children) {
								console.log("je passe par là", hiddenSection);
								hiddenSection.classList.remove('hidden');
								console.log("je suis le noeud ul", selectList)
							}
						// })
					}
				}
			// })
		})
	})
}

function updateDataInDropdownMenu(noeud, datas) {

	noeud.innerHTML = "";
	
	datas.forEach(data => {
		const li = document.createElement( "li" );
		li.textContent = data;
		noeud.appendChild(li);
	})
}

function filteredInDropdownMenu(noeud, e, datas) {
	// const inputValue = document.getElementById(idInput).value.trim().toLowerCase();
	const eventValue = e.target.value.trim().toLowerCase();
	console.log(e.target);

	if (!eventValue || eventValue.length < 3) {
		updateDataInDropdownMenu(noeud, datas);
	} else if (eventValue.length >= 3){
		const filteredDatas = datas.filter(element => element.toLowerCase().includes(eventValue));
		updateDataInDropdownMenu(noeud, filteredDatas);
	}
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
	const ingreInput = document.getElementById("ingredient_input");
	const apparInput = document.getElementById("appareils_input");
	const ustenInput = document.getElementById("ustensiles_input");

	const ustenHiddenSection = document.getElementById("hidden_section_ustensils"); // en test ajout dans le dropdown menu

	const ingredients = getIngredients(recipes);
	const appareils = getAppareils(recipes);
	const ustensils = getUstensils(recipes);

	displayDataInDropdownMenu(ingreInDropdown, ingredients);
	displayDataInDropdownMenu(apparInDropdown, appareils);
	displayDataInDropdownMenu(ustenInDropdown, ustensils, hiddenUstensilsList, ustenHiddenSection);

	ingreInput.addEventListener("input", (e) => {
		filteredInDropdownMenu(ingreInDropdown, e, ingredients);
	})
	apparInput.addEventListener("input", (e) => {
		filteredInDropdownMenu(apparInDropdown, e, appareils);
	})
	ustenInput.addEventListener("input", (e) => {
		filteredInDropdownMenu(ustenInDropdown, e, ustensils);
	})

	initCards();
	openDropdownMenu();
}

displayPage();


// algo : faire une liste où tu concatènes tout les ingrédients ensemble (tu regroupes les éléments) pour pouvoir faire une recherche ciblée

/* 
	Questions :
	- est-ce qu'il faut utilisé une factory pattern pour les items dans les dropdown menu ? 
*/