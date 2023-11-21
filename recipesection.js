async function fetchData() {
	try {
		const response = await fetch("data/recipes.js");
		const data = await response.value;
		return data;
	} catch (error) {
		console.log("Une erreur s'est produite :", error);
	}
}

async function initCards() {
	const data = fetchData();
	console.log(data);
}


initCards();