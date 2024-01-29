let apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGZhNjY5ODMwYTU1ZDIwMjMxM2Y1MWI4MjAzZmQ0MyIsInN1YiI6IjY1Yjc3MmZmYTBiNjkwMDBlM2NlMDJhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qYrAFWcjpO2XY1igXtGtP5UwBTEwz9viCmTTULLYSEU'
let headers = {
    'Authorization': `Bearer ${apiKey}`
}

let imageUrl = 'https://image.tmdb.org/t/p/original'



async function getMovies() {
    let response = await fetch('https://api.themoviedb.org/3/movie/top_rated',
        {
            headers,
        })

    let data = await response.json()
    movieCard.textContent = ''
    data.results.forEach((movieData) => {
        addMovieCards(movieData)
    });
}

async function movieSearch(name = '') {
    let response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${name}`,
        {
            headers,
        })

    let data = await response.json()
    movieCard.textContent = ''
    data.results.forEach((movieData) => {
        addMovieCards(movieData)
    })
}
getMovies()



let template = document.querySelector('#template')
let movieCard = document.querySelector('.movie_card')


function addMovieCards(movieData) {
    let newMovieCard = template.cloneNode(true)
    newMovieCard.content.querySelector('img').src = imageUrl + movieData.poster_path
    newMovieCard.content.querySelector('.card_title').textContent = movieData.title
    newMovieCard.content.querySelector('.card_rating').textContent = `Rating: ${movieData.vote_average.toFixed(1)}`
    newMovieCard.content.querySelector('.date').textContent = `Release date: ${movieData.release_date}`
    movieCard.appendChild(newMovieCard.content)
}


let searchForm = document.querySelector('.search_form')

searchForm.search.addEventListener('input', inputInterval(() => {
    let movieName = searchForm.search.value
    if (movieName !== '') {
        movieSearch(movieName)
    } else {
        getMovies()
    }

})

)


function inputInterval(func) {
    let id
    return () => {
        clearInterval(id)
        id = setTimeout(() => {
            func()
        }, 700)
    }
}