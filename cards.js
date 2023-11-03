async function fetchData() {
	try {
		const response = await fetch("data/photographers.json"); // à voir comment fecth les données
		const data = await response.json();
		return data;
	} catch (error) {
		console.log("Une erreur s'est produite :", error);
	}
}


