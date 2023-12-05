class DropdownIngredient {
    constructor(data, type){
        this._data = data;
    }

    getIngredients() {
        let dataTab = [];
    
        this._data.forEach(datas => {
            datas.ingredients.forEach(ingredient => {
                if (ingredient.ingredient && !ingredientTab.includes(ingredient.ingredient)) {
                    ingredientTab.push(ingredient.ingredient);
                }
            })
        })
        console.log("les ingrédients", ingredientTab);
        return ingredientTab;
    }

    displayIngredientInDropdownMenu() {

    }
}