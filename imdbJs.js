const movieSearch = document.getElementById('input-text');
const searchButton=document.getElementById('search');
const list=document.getElementById('movie-list-box');
const selectedmovie=document.getElementById('selected-movie');
const er=document.getElementById('error');
var id;
let textField = "";
movieSearch.addEventListener("input", async function sear(e) {
  textField = e.target.value;
  const url_search = "https://www.omdbapi.com/?apikey=59cd0769&s=" + textField;
  try {
    const response2 = await fetch(url_search);
    const data2 = await response2.json();
    if (data2.Search) {
      selectedmovie.style.display = "none";
      list.style.display = "block";
      let html = ""; 
      for (let i = 0; i < data2.Search.length; i++) {
        html += `<div class="movies" id="${data2.Search[i].imdbID}">
          <div class="movie-poster">
              <img id="poster" src="${data2.Search[i].Poster}" alt="">
          </div>
          <div class="movie-details">
              <div class="movie-title">
                  <h4 style="color: rgb(0, 171, 54);">Title:</h4>
                  <h4 id="title">${data2.Search[i].Title}</h4>
              </div>
              <div class="movie-year">
                  <h4 style="color: rgb(0, 171, 54);">Year:</h4>
                  <h4 id="year">${data2.Search[i].Year}</h4>
              </div>
              <div class="movie-director">
                  <h4 style="color: rgb(0, 171, 54);">Type:</h4>
                  <h4 id="director">${data2.Search[i].Type}</h4>
              </div>
          </div>
          <div class="fav">
              <i class="fa-solid fa-heart"></i>
          </div>
      </div>`;
      }

      list.innerHTML = html;

      const movieElements = document.getElementsByClassName("movies");
      for (let i = 0; i < movieElements.length; i++) {
        const movieElement = movieElements[i];
        const titleElement = movieElement.querySelector("#title");
        const title = titleElement.textContent;
        const imdbId = movieElement.id;
        movieElement.addEventListener("click", function () {
          textField = title;
          movieSearch.value = title;
          id=imdbId;
          console.log("Clicked movie IMDb ID: " + id);
          sear(e);
        });
      }
    } else {
      list.style.display = "none";
    }
    
  } catch (err) {
    console.error(err);
  }
});

searchButton.addEventListener("click", function (e) {
  const title_search = "https://www.omdbapi.com/?apikey=59cd0769&i=" + id;
  fetch(title_search)
    .then(function (response1) {
      return response1.json();
    })
    .then(function (data1) {
      console.log(data1.Response);
      if (data1.Response) {
        list.style.display = "none";
        selectedmovie.style.display = "block";
        selectedmovie.innerHTML = `<div class="selected-poster">
          <img src="${data1.Poster}" alt="">
        </div>
        <div class="selected-details">
          <div class="box">
            <div class="selec-title">
              <h3>Title:</h3>
            </div>
            <div class="title-name">
              <h3>${data1.Title}</h3>
            </div>
          </div>
          <div class="box">
            <div class="selec-title">
              <h3>Year:</h3>
            </div>
            <div class="title-name">
              <h3>${data1.Year}</h3>
            </div>
          </div>
          <div class="box">
            <div class="selec-title">
              <h3>Director:</h3>
            </div>
            <div class="title-name">
              <h3>${data1.Director}</h3>
            </div>
          </div>
          <div class="box">
            <div class="plot">
              <h3>Actors:</h3>
            </div>
            <div class="actors">
              <h4>${data1.Actors}</h4>
            </div>
          </div>
          <div class="box">
            <div class="plot">
              <h3>Plot:</h3>
            </div>
            <div class="plot-text">
              <h4>${data1.Plot}</h4>
            </div>
          </div>
          <div class="box">
            <div class="selec-title">
              <h3>Imdb Rating:</h3>
            </div>
            <div class="title-name">
              <h3>${data1.imdbRating}</h3>
            </div>
          </div>
          <div class="box">
            <div class="selec-title">
              <h3>Genre:</h3>
            </div>
            <div class="title-name">
              <h3>${data1.Genre}</h3>
            </div>
          </div>
        </div>`;
      }
      else{
        err.style.display="block";
      }
    })
    .catch(function (err) {
      console.error(err);
    });
});
