searchFormBtn.addEventListener('click', () => {
    location.hash = `#search=${searchFormInput.value.trim()}`;
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends'
});

arrowBtn.addEventListener('click', () =>{
    searchFormInput.value = '';
    location.hash = window.history.back();
});

window.addEventListener('hashchange', navigator, false);
window.addEventListener('load', navigator, false);


function navigator() {
    console.log('Location', { location })
    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage()
    }
    else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }
    document.documentElement.scrollTo = 0;
}



function homePage() {
    console.log('Home!!');
    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');


    getCategoriesPreview();
    getTrendingMoviesPreview();
}

function categoriesPage() {
    console.log('Category!!', {hash} = location.hash);
    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.remove('header-arrow--white');
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    
    const [ ,categoryInfo] = location.hash.split('='); //Return = [#category]=[12-Adventure]
    const [id, categoryName] =  categoryInfo.split('-'); //[12]-[Adventure]
    headerCategoryTitle.innerHTML = categoryName;
    getMoviesByCategory(id);
}

function movieDetailsPage() {
    console.log('Movie!!');
    headerSection.classList.add('header-container--long')
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    
    const [ , idMovie] = location.hash.split('=');
    getMovieById(idMovie);

}

function searchPage() {
    console.log('Search!!');
    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.remove('header-arrow--white');
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [ , query] = location.hash.split('=');
    getMoviesBySearch(query);

}

function trendsPage() {
    console.log('Trends!!');
    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.remove('header-arrow--white');
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias'

    getMoviesByTrends();

}

