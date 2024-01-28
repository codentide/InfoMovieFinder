// Se importa la función que trae las peliculas del api
import { searchMovies, imgUrl } from "./api.js";

// Elementos del HTML
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const errorMsg = document.querySelector("#error");
const resultsContainer = document.querySelector("#results");

// En caso de recargar se limpia el input
searchInput.value = "";

// Función que recibe un array de películas para manipular la información
function displayMovies(movies) {
	// Se reinicia el feed
	resultsContainer.innerHTML = "";

	// Si el response está vacío manda un mensaje de "not found"
	if (movies.length === 0) {
		const notFoundMsg = document.createElement("p");
		notFoundMsg.textContent = "Not found";
		resultsContainer.appendChild(notFoundMsg);

		return;
	}

	// Cuando traiga el array de resultados (películas)
	// se iterará sobre el para crear html y mostrarlos en pantalla
	movies.forEach((movie) => {
		// Contenedor de la película
		const movieContainer = document.createElement("div");
		movieContainer.classList.add("movie");

		// Poster de la película
		const poster = document.createElement("img");
		poster.classList.add("movie__poster");
		poster.src = `${imgUrl}/${movie.poster_path}`;

		// Contenedor de la información de la película
		const infoBox = document.createElement("div");
		infoBox.classList.add("movie__info");

		// Titulo de la película
		const title = document.createElement("h4");
		title.textContent = movie.title;
		title.classList.add("movie__title");

		// Se separan los datos de la fecha de lanzamiento que viene en un string
		// Esto con el fin de cambiar el formato en el que aparece la fecha
		let dateContent = movie.release_date.split("-");

		// Fecha de lanzamiento de la película
		const date = document.createElement("p");
		// Previamente se separo la fecha en 3 partes para mostrarlo en formato latino
		date.textContent = `${dateContent[2]}/${dateContent[1]}/${dateContent[0]}`;
		date.classList.add("movie__date");

		// Resumen de la película
		// [] Futuramente esto se mostrará aparte y no en la lista de resultados
		const overview = document.createElement("p");
		overview.textContent = movie.overview;
		overview.classList.add("movie__overview");

		// Se introducen los elementos relacionados con información en infoBox
		infoBox.appendChild(title);
		infoBox.appendChild(date);
		infoBox.appendChild(overview);

		// Se introducen el poster y el infoBOx en movieContainer
		movieContainer.appendChild(poster);
		movieContainer.appendChild(infoBox);

		// A su vez movieContainer se introduce en la section de resultados
		resultsContainer.appendChild(movieContainer);
	});
}

// Evento de acción para buscar películas
searchBtn.addEventListener("click", async () => {
	// Validar si el input está vacío
	if (searchInput.value === "") {
		// Aparece un mensaje indicando el error
		errorMsg.classList.add("error");
	} else {
		// Desaparece el mensaje de error
		errorMsg.classList.remove("error");
		try {
			// Envía el valor de búsqueda y recibe el json de la película
			const movies = await searchMovies(searchInput.value);
			// Se envía el array de resultados a la función displayMovies
			displayMovies(movies.results);
		} catch (err) {
			// Muestra de error
			console.error("error: " + err);
		}
	}
});

// [x] Se introduce un valor en el input y se manda a la api
// [x] No se debe permitir buscar si el input está vacío
