const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector('.main');
const search = document.querySelector('.search');
const form = document.querySelector('.form');

/* =================================== Initially loading the movies =============================================*/
getMovies(APIURL);

/*==================================== Function for loading movies ==============================================*/
async function getMovies(url_link){
	const resp = await fetch(url_link);
	
	const respData = await resp.json();
	console.log(respData);

	displayMovies(respData.results);
}

/* =================================== Function for displaying each of loaded movies ============================*/
function displayMovies(movieNow){
	/* ------- clear main element */
	main.innerHTML = "";
	

	movieNow.forEach((movie)=>{
		const movieElement = document.createElement('div');
		movieElement.classList.add('movie');

		movieElement.innerHTML = `
					<img
						src="${IMGPATH + movie.backdrop_path}"
						alt="movie_icon" 
					/>
					<div class="movie-info">
						<h3>${movie.title}</h3>
						<span class="${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
					</div>
					<div class="overview">
						<h3>Overview:</h3>
						${movie.overview}
					</div>
			`;
		main.appendChild(movieElement);
	});
}

/*==================================== Function for returning rating color classes ==============================*/
function getClassByRate(vote){
	if(vote >= 8){
		return 'green';
	} else if(vote < 8 && vote >= 6){
		return 'orange';
	} else{
		return 'red';
	}
}

/* ============================== Event Listener for when the form is submitted ==================================*/
form.addEventListener('submit', (e)=>{
	e.preventDefault();

	const searchTerm = search.value;
	const ready_url = SEARCHAPI + searchTerm;
	
	if(searchTerm){
		getMovies(ready_url);

		search.value = '';
	}

})