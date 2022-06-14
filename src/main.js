const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    },
});

//UTILS
function renderMovies(container, movies) {
    container.innerHTML = ''
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        const movieImg = document.createElement('img');
        movieContainer.classList.add('movie-container');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        movieContainer.appendChild(movieImg);
        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id
        })
        container.appendChild(movieContainer);
    });
}

function renderCategoriesList(container, listMovies) {
    container.innerHTML = '';
    listMovies.map(category => {
        const categoryContainer = document.createElement('div');
        const categoryTitle = document.createElement('h3');
        categoryContainer.classList.add('category-container');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        categoryTitle.innerText = category.name;
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        })
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}

//LLAMADOS A LA API

async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
    const results = data.results;
    renderMovies(trendingMoviesPreviewList, results);
}

async function getCategoriesPreview() {
    const res = await api('genre/movie/list');
    const { genres } = res.data;
    renderCategoriesList(categoriesPreviewList, genres);
}


async function getMoviesByCategory(id) {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        }
    });
    const results = data.results;
    renderMovies(genericSection, results);
}


async function getMoviesBySearch(query){
    const {data} = await api('/search/movie', {
        params: {
             query, 
        }
    });
    const results = data.results;
        renderMovies(genericSection,results);
}


async function getMoviesByTrends(){
    const {data} = await api('/movie/popular');
    const  results = data.results;
    renderMovies(genericSection, results);
}


async function getMovieById(movie_id){
    const {data: movie} = await api('/movie/' + movie_id, {
    });

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path
    headerSection.style.background = `url(${movieImgUrl})`
    movieDetailTitle.textContent = movie.original_title;
    movieDetailScore.textContent = movie.vote_average;
    movieDetailDescription.textContent = movie.overview;
    headerSection.style.background = `
    linear-gradient(
    180deg, rgba(0, 0, 0, 0.35) 19.27%,
     rgba(0, 0, 0, 0) 29.17%), url(${movieImgUrl})`;
    renderCategoriesList(movieDetailCategoriesList,movie.genres)
    getRelateMovieById(movie_id)
}


async function getRelateMovieById(movie_id){
    const {data} = await api('/movie/' + movie_id + '/recommendations', {
    });
    const  results = data.results;

    renderMovies(relatedMoviesContainer, results)
}












































getCategoriesPreview();
getTrendingMoviesPreview();