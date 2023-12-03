class RecipeCard {
    constructor(recipe) {
        this._recipe = recipe;
    }

    getReceipeCard() {
        const article = document.createElement( "article" );
        article.setAttribute("class", "bg-white rounded-[20px]");

        const imgContainer = document.createElement( "div" );
        imgContainer.setAttribute("class", "relative h-[35%] w-[100%] overflow-hidden");

        const img = document.createElement( "img" );
        img.setAttribute("class", "rounded-t-[10px] h-[100%] w-[100%] object-cover")
        img.setAttribute("src", `/assets/pictures/Photos+P7+JS+Les+petits+plats/Photos P7 JS Les petits plats/${this._recipe.image}`);

        const timerContainer = document.createElement( "div" );
        timerContainer.setAttribute("class", "absolute flex top-[20px] right-[30px] rounded-[10px] bg-[#FFD15B] p-[10px]");
        timerContainer.textContent = this._recipe.time + " min";

        const recipeContainer = document.createElement( "div" );
        recipeContainer.setAttribute("class", "ml-[20px] mr-[20px]");

        const recipeTitle = document.createElement( "h2" );
        recipeTitle.setAttribute("class", "font-['Anton'] font-bold text-[1.6em] mt-[25px] mb-[35px]");
        recipeTitle.textContent = this._recipe.name;

        const recipeDescription = document.createElement( "div" );
        recipeDescription.setAttribute("class", "font-['Manrope'] text-[1.0em]");

        const firstTitle = document.createElement( "h3" );
        firstTitle.setAttribute("class", "uppercase text-zinc-500 tracking-[.10em] font-bold");
        firstTitle.textContent = "Recette";

        const description = document.createElement( "p" );
        description.setAttribute("class", "mt-[15px] mb-[35px]");
        description.textContent = this._recipe.description;

        const secondTitle = document.createElement( "h3" );
        secondTitle.setAttribute("class", "uppercase text-zinc-500 tracking-[.10em] font-bold");
        secondTitle.textContent = "Ingrédients";

        const gridDetailsContainer = document.createElement( "div" );
        gridDetailsContainer.setAttribute("class", "grid grid-cols-2 mt-[15px] mb-[25px] w-[350px] gap-[50px]");

        this._recipe.ingredients.forEach(data => {
            const gridDetails = document.createElement( "div" );
            gridDetails.setAttribute("class", "flex flex-col");

            const ingredientName = document.createElement( "span" );
            ingredientName.textContent = data.ingredient;

            gridDetails.appendChild(ingredientName);

            const quantity = document.createElement( "span" );
            quantity.setAttribute("class", "text-zinc-500");
            if (data.quantity) {
    
                if (!data.unit) {
                    quantity.textContent = data.quantity;
                } else {
                    quantity.textContent = data.quantity + " " + data.unit;
                }
            } else {
                quantity.textContent = "-";
            }
            gridDetails.appendChild(quantity);

            gridDetailsContainer.appendChild(gridDetails);
        })

        recipeDescription.appendChild(firstTitle);
        recipeDescription.appendChild(description);
        recipeDescription.appendChild(secondTitle);
        recipeDescription.appendChild(gridDetailsContainer);

        recipeContainer.appendChild(recipeTitle);
        recipeContainer.appendChild(recipeDescription);

        imgContainer.appendChild(img);
        imgContainer.appendChild(timerContainer);

        article.appendChild(imgContainer);
        article.appendChild(recipeContainer);

        return article;
    }
}