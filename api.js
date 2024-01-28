// Clave del api para acceder a ella
const apiKey = "cf33fcebdd4bda0ac92bf506556825f4";
// Url base para hacer las peticiones de películas
const baseUrl = "https://api.themoviedb.org/3/search/movie";
// Url para traer las imágenes
const imgUrl = "https://image.tmdb.org/t/p/w500";

// Función asíncrona para buscar las películas desde el fetch
async function searchMovies(query) {
	try {
		// Una vez traído el response, se convierte en json y se
		const res = await fetch(`${baseUrl}?api_key=${apiKey}&query=${query}`);
		return res.json();
	} catch (err) {
		// Si ocurre un error relacionado con la petición se muestra el error en consola y se propaga el error
		console.error("Error: " + err);
		throw err;
	}
}

export { searchMovies, imgUrl };
