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

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) =>{
        entry
        if(entry.isIntersecting){
            const url = entry.target.getAttribute('data-src');
            entry.target.setAttribute('src', url)
        }
    })
});

function renderMovies(container, movies, {lazyLoad = false, clean = true} = {}) {
    if(clean){
        container.innerHTML = ''
    }
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => { 
            location.hash = '#movie=' + movie.id 
        });



        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute( 
            lazyLoad ?  'data-src' : 'src',
            'https://image.tmdb.org/t/p/w300' + movie.poster_path,
            );
        
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', 'https://images.unsplash.com/photo-1584754166504-b8f21be4e0f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=572&q=80')
        })
    

        if(lazyLoad){
            lazyLoader.observe(movieImg);
        }

        movieContainer.appendChild(movieImg);
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
    renderMovies(trendingMoviesPreviewList, results, {lazyLoad: true});
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
    renderMovies(genericSection, results, {lazyLoad: true});
}


async function getMoviesBySearch(query) {
    const { data } = await api('/search/movie', {
        params: {
            query,
        }
    });
    const results = data.results;
    renderMovies(genericSection, results);
}


async function getMoviesByTrends() {
    const { data } = await api('trending/movie/day');
    const results = data.results;
    renderMovies(genericSection, results, true);

    const btnLoadMore = document.createElement('button');
    btnLoadMore.innerText = 'loader'
    btnLoadMore.addEventListener('click', getPaginatedTrendingMovies)
    genericSection.appendChild(btnLoadMore);

}


async function getMovieById(movie_id) {
    const { data: movie } = await api('/movie/' + movie_id, {
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
    renderCategoriesList(movieDetailCategoriesList, movie.genres)
    getRelateMovieById(movie_id)
}


async function getRelateMovieById(movie_id) {
    const { data } = await api('/movie/' + movie_id + '/recommendations', {
    });
    const results = data.results;

    renderMovies(relatedMoviesContainer, results, true)
}

let page = 1;

async function getPaginatedTrendingMovies(){
    page ++;
    const { data } = await api('trending/movie/day', {
        params: {
            page
        }
    });
    const results = data.results;
    renderMovies(genericSection, results, {
        lazyLoad: true,
        clean: false,
    });

    const btnLoadMore = document.createElement('button');
    btnLoadMore.innerText = 'loader'
    btnLoadMore.addEventListener('click', getPaginatedTrendingMovies)
    genericSection.appendChild(btnLoadMore)
    }
