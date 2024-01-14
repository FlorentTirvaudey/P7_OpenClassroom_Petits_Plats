const cardsection = document.getElementById("card_section");

const nbRecipes = document.getElementById("number_of_recipes");

const ingreInDropdown = document.getElementById("ingredient_in_dropdown");
const apparInDropdown = document.getElementById("appareils_in_dropdown");
const ustenInDropdown = document.getElementById("ustensils_in_dropdown");

const hiddenIngredientsList = document.getElementById("hidden_ingredients_in_dropdown");
const hiddenAppareilsList = document.getElementById("hidden_appareils_in_dropdown");
const hiddenUstensilsList = document.getElementById("hidden_ustensils_in_dropdown");

const noeudParent = document.getElementById("search_container_created");


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

// function removeOnclickCross(cross, noeud) {
// 	cross.addEventListener("click", () => {
// 		noeud.remove();
// 	})
// }

function createSearchContainer(element, noeudToRemove, datasFromRecipes) {

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
		const itemToRemove = Array.from(noeudToRemove.children).filter(element => element.textContent === elementContent.textContent)[0];
		searchContainer.remove();
		itemToRemove.remove();
		// console.log(e.target.parentElement.previousElementSibling.textContent)

		// const otherCrossToRemove = document.getElementById("hidden_ustensils_in_dropdown")
		filteredWithTags(recipes);
		// const itemsInNoeudParent = Array.from(noeudParent.children);
		// console.log("itemsInNoeudParent avant vjdgjkgzkj", itemsInNoeudParent)	

		// console.log("e", e.target.parentElement.previousElementSibling.textContent)
		// // itemsInNoeudParent.map(element => element.textContent.toLowerCase() === e.target.parentElement.previousElementSibling.textContent.toLowerCase()).remove();
		// console.log("itemsInNoeudParent", itemsInNoeudParent)	


		// // console.log(itemToRemove);
		// // console.log(searchContainer);

		// if (!itemsInNoeudParent.length) {
			

		// 	const updatedIngredients = getAllIngredients(recipes);
		// 	const updatedAppareils = getAllAppareils(recipes);
		// 	const updatedUstensils = getAllUstensils(recipes);

		// 	updateRecipeCard(recipes, nbRecipes);

		// 	updateDataInDropdownMenu(ingreInDropdown, updatedIngredients, hiddenIngredientsList, recipes);
		// 	updateDataInDropdownMenu(apparInDropdown, updatedAppareils, hiddenAppareilsList, recipes);
		// 	updateDataInDropdownMenu(ustenInDropdown, updatedUstensils, hiddenUstensilsList, recipes);

		// } else {
		

		// // const filteredDatas = Array.from(noeudParent.children).forEach(element => datasFromRecipes.filter(datas => datas.ingredients.find(data => data.ingredient.toLowerCase() === element)
		// // || datas.appliance.trim().toLowerCase().includes(element) 
		// // || datas.ustensils.find(data => data.toLowerCase() === element)));

		// const filteredDatas = recipes.filter(datas =>
		// 	itemsInNoeudParent.find(element =>
		// 		datas.appliance.trim().toLowerCase().includes(element.textContent.toLowerCase())
		// 		|| datas.ingredients.some(data => data.ingredient.toLowerCase() === element.textContent.toLowerCase())
		// 		|| datas.ustensils.some(data => data.toLowerCase() === element.textContent.toLowerCase())
		// 	)
		// );

		// const updatedIngredients = getAllIngredients(filteredDatas);
		// const updatedAppareils = getAllAppareils(filteredDatas);
		// const updatedUstensils = getAllUstensils(filteredDatas);

		// updateRecipeCard(filteredDatas, nbRecipes);

		// updateDataInDropdownMenu(ingreInDropdown, updatedIngredients, hiddenIngredientsList, filteredDatas);
		// updateDataInDropdownMenu(apparInDropdown, updatedAppareils, hiddenAppareilsList, filteredDatas);
		// updateDataInDropdownMenu(ustenInDropdown, updatedUstensils, hiddenUstensilsList, filteredDatas);

		// console.log("filteredDatas in addbfhbjlkefj", filteredDatas)

		// console.log("itemsInNoeudParent last remove", itemsInNoeudParent)	
		
		// }

	})
}

function createContainerInDropdown(element, noeudParent, datasFromRecipes) {
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
	// 	crossButtonInDropdown.classList.remove("hidden");
	// 	console.log("test")
	// })

	crossButtonInDropdown.addEventListener("click", e => {
		const otherCrossToRemove = document.getElementById("search_item_in_new_container");
		console.log(e)

		// const itemToRemove = Array.from(noeudToRemove.children).filter(element => element.textContent === elementContent.textContent)[0];

		selectHiddenItems.remove();
		otherCrossToRemove.remove();
	})
}

function filteredWithTags(datasFromRecipes) {

	// const ingreInput = document.getElementById("ingredient_input");
	// const apparInput = document.getElementById("appareils_input");
	// const ustenInput = document.getElementById("ustensiles_input");

	// // const ingredients = getAllIngredients(recipes);
	// // const appareils = getAllAppareils(recipes);
	// // const ustensils = getAllUstensils(recipes);

	// const eventValue = e.target.textContent.trim().toLowerCase();
	// // console.log("dataRecipes.ustensils ici", datasFromRecipes[0].ustensils);

	// const filteredDatas = datasFromRecipes.filter(element => element.ingredients.find(data => data.ingredient.toLowerCase() === eventValue)
	// || element.appliance.trim().toLowerCase().includes(eventValue) 
	// || element.ustensils.find(data =>
	// 	// console.log("data en comparaison", data.trim().toLowerCase())
	// 	// console.log("eventValue en comparaison", eventValue)
	// 	data.toLowerCase() === eventValue
	// ));
	// // console.log("test un deux", datasFromRecipes.filter(element => element.ustensils.find(data => data.toLowerCase() === eventValue)))

	// // const vardetest = datasFromRecipes.forEach(element => {
	// // 	element.ustensils.forEach(data => {
	// // 		if(!data.trim().toLowerCase().includes(eventValue)) {
	// // 			console.log("ne correspond pas", data.trim().toLowerCase())
	// // 		}
	// // 	})
	// // })

	// // const filteredDatas = datasFromRecipes.filter(element => element.name.toLowerCase().includes(eventValue) 
	// // 	|| element.description.toLowerCase().includes(eventValue) 
	// // 	|| element.ingredients.forEach(data => {
	// // 		data.ingredient.toLowerCase().includes(eventValue);
	// // 		if(data.ingredient.toLowerCase().includes(eventValue)) {
	// // 			console.log("true include");
	// // 		}
	// // 	})
	// // 	);
		
	// console.log("les datas filtrer avec tags ghgfg", filteredDatas);
	// console.log("les datas dans dataRecipe", datasFromRecipes)

	// const updatedIngredients = getAllIngredients(filteredDatas);
	// const updatedAppareils = getAllAppareils(filteredDatas);
	// const updatedUstensils = getAllUstensils(filteredDatas);

	// updateRecipeCard(filteredDatas, nbRecipes);

	// updateDataInDropdownMenu(ingreInDropdown, updatedIngredients, hiddenIngredientsList, filteredDatas);
	// updateDataInDropdownMenu(apparInDropdown, updatedAppareils, hiddenAppareilsList, filteredDatas);
	// updateDataInDropdownMenu(ustenInDropdown, updatedUstensils, hiddenUstensilsList, filteredDatas);

	const itemsInNoeudParent = Array.from(noeudParent.children);
		console.log("itemsInNoeudParent avant vjdgjkgzkj", itemsInNoeudParent)	

		// console.log("e", e.target.parentElement.previousElementSibling.textContent)
		// itemsInNoeudParent.map(element => element.textContent.toLowerCase() === e.target.parentElement.previousElementSibling.textContent.toLowerCase()).remove();
		console.log("itemsInNoeudParent", itemsInNoeudParent)	

		console.log("tell me the truth", datasFromRecipes)	

		// console.log(itemToRemove);
		// console.log(searchContainer);

		if (!itemsInNoeudParent.length) {
			

			const updatedIngredients = getAllIngredients(recipes);
			const updatedAppareils = getAllAppareils(recipes);
			const updatedUstensils = getAllUstensils(recipes);

			updateRecipeCard(recipes, nbRecipes);

			updateDataInDropdownMenu(ingreInDropdown, updatedIngredients, hiddenIngredientsList, recipes);
			updateDataInDropdownMenu(apparInDropdown, updatedAppareils, hiddenAppareilsList, recipes);
			updateDataInDropdownMenu(ustenInDropdown, updatedUstensils, hiddenUstensilsList, recipes);

		} else {
		

		// const filteredDatas = Array.from(noeudParent.children).forEach(element => datasFromRecipes.filter(datas => datas.ingredients.find(data => data.ingredient.toLowerCase() === element)
		// || datas.appliance.trim().toLowerCase().includes(element) 
		// || datas.ustensils.find(data => data.toLowerCase() === element)));
		console.log(itemsInNoeudParent);
		// const filteredDatas = datasFromRecipes.filter(datas =>
		// 	itemsInNoeudParent.forEach(element =>
		// 		datas.appliance.trim().toLowerCase().includes(element.textContent.toLowerCase())
		// 		|| datas.ingredients.some(data => data.ingredient.toLowerCase().includes(element.textContent.toLowerCase()))
		// 		|| datas.ustensils.some(data => data.toLowerCase().includes(element.textContent.toLowerCase()))
		// 	)
		// );
		 let filteredDatas = recipes;
		 itemsInNoeudParent.forEach(element => {
			filteredDatas = filteredDatas.filter(data =>
				data.appliance.trim().toLowerCase().includes(element.textContent.toLowerCase())
				|| data.ingredients.some(data => data.ingredient.toLowerCase().includes(element.textContent.toLowerCase()))
				|| data.ustensils.some(data => data.toLowerCase().includes(element.textContent.toLowerCase())))
		 }
		);

		// const filteredDatas = itemsInNoeudParent.forEach(element => {
		// 	datasFromRecipes.filter(datas =>
		// 		datas.appliance.trim().toLowerCase().includes(element.textContent.toLowerCase())
		// 		|| datas.ingredients.some(data => data.ingredient.toLowerCase().includes(element.textContent.toLowerCase()))
		// 		|| datas.ustensils.some(data => data.toLowerCase().includes(element.textContent.toLowerCase()))
		// 	)
		// }
		// );

		console.log(filteredDatas);
		const updatedIngredients = getAllIngredients(filteredDatas);
		const updatedAppareils = getAllAppareils(filteredDatas);
		const updatedUstensils = getAllUstensils(filteredDatas);

		updateRecipeCard(filteredDatas, nbRecipes);

		updateDataInDropdownMenu(ingreInDropdown, updatedIngredients, hiddenIngredientsList, filteredDatas);
		updateDataInDropdownMenu(apparInDropdown, updatedAppareils, hiddenAppareilsList, filteredDatas);
		updateDataInDropdownMenu(ustenInDropdown, updatedUstensils, hiddenUstensilsList, filteredDatas);
	
		
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
				if (!selectList.children.length || !(isAlreadyInChild(selectList, e.target.innerText))) {
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
					// console.log("data in update", datasFromRecipes)
				}
			}
		})
	})
}

function filteredInDropdownMenu(noeud, e, datas, selectList, datasFromRecipes) {

	const eventValue = e.target.value.trim().toLowerCase();

	// console.log(e.target);

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

	const eventValue = event.trim().toLowerCase();
	
	if (!eventValue || eventValue.length < 3) {
		updateRecipeCard(datas, nbRecipes);

		updateDataInDropdownMenu(ingreInDropdown, ingredients, hiddenIngredientsList, datas);
		updateDataInDropdownMenu(apparInDropdown, appareils, hiddenAppareilsList, datas);
		updateDataInDropdownMenu(ustenInDropdown, ustensils, hiddenUstensilsList, datas);

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
		let filteredDatas = datas.filter(element => element.name.toLowerCase().includes(eventValue) 
		|| element.description.toLowerCase().includes(eventValue) 
		|| element.ingredients.forEach(data => {
			data.ingredient.toLowerCase().includes(eventValue);
			if(data.ingredient.toLowerCase().includes(eventValue)) {
				console.log("true include");
			}
		})
		);
		// if (childrens) {
			// filteredDatas = filteredDatas.filter(element => element.ingredients.find(data => data.ingredient.toLowerCase() === eventValue)
			// || element.appliance.trim().toLowerCase().includes(eventValue) 
			// || element.ustensils.find(data =>
			// 	data.toLowerCase() === eventValue
			// ));
		// }
		// filtrer en fonction des childrens et plus de l'event =/= filterwithtags
		
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
	const ingreInput = document.getElementById("ingredient_input");
	const apparInput = document.getElementById("appareils_input");
	const ustenInput = document.getElementById("ustensiles_input");

	const mainInput = document.getElementById("main_input");

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

	openDropdownMenu();
}

displayPage();