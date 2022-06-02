const API_URL = 'https://api.themoviedb.org/3/';


async function getTrendingMoviesPreview() {

    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY)
    const data = await res.json();
    const { results } = data;
    console.log('Trending', results)

    results.forEach(movie => {
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
        const movieContainer = document.createElement('div');
        const movieImg = document.createElement('img');
        movieContainer.classList.add('movie-container');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer);
    });
}

async function getCategoriesPreview() {
    const res = await fetch(API_URL + 'genre/movie/list?api_key=' + API_KEY);
    const data = await res.json();
    const {genres} = data;
    console.log('Categories', genres)
    genres.map(category  => {
        const categoriesPreview = document.querySelector('.categoriesPreview-list');
        const categoryContainer = document.createElement('div');
        const categoryTitle = document.createElement('h3');
        categoryContainer.classList.add('category-container');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        categoryTitle.innerText = category.name;

        categoryContainer.appendChild(categoryTitle);
        categoriesPreview.appendChild(categoryContainer);

    });
}













































getCategoriesPreview();
getTrendingMoviesPreview();