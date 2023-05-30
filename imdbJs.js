const movieSearch = document.getElementById('input-text');
const searchButton=document.getElementById('search');
const list=document.getElementById('movie-list-box');
const selectedmovie=document.getElementById('selected-movie');
const er=document.getElementById('error');
const fav=document.getElementById('favourites');
const fav_box=document.getElementById('favour');
const noFav=document.getElementById('no-fav');
var id;
let textField = "";
const heartColors = {}; // Object to store the heart icon colors
let redHeartPosters = [];
movieSearch.addEventListener("input", async function sear(e) {
  textField = e.target.value;
  const url_search = "https://www.omdbapi.com/?apikey=59cd0769&s=" + textField;
  try {
    const response2 = await fetch(url_search);
    const data2 = await response2.json();
    if (data2.Search) {
      
      selectedmovie.style.display = "none";
      list.style.display = "block";
      fav_box.style.display="none";
      let html = "";
      for (let i = 0; i < data2.Search.length; i++) {
        const imdbID = data2.Search[i].imdbID;
        const heartColor = heartColors[imdbID]? "red" : ""; // Get the stored heart icon color
        html += `<div class="movies" id="${imdbID}">
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
              <i id="dil" class="fa-solid fa-heart" style="color: ${heartColor}"></i>
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
        const heartIcon = movieElement.querySelector(".fa-heart");

        movieElement.addEventListener("click", function () {
          textField = title;
          movieSearch.value = title;
          id = imdbId;
          console.log("Clicked movie IMDb ID: " + id);
          sear(e);
        });
        heartIcon.addEventListener("click", function (event) {
          event.stopPropagation();
          const imdbID = movieElement.id;
          const color = heartColors[imdbID] ? "" : "red"; 
          heartIcon.style.color = color;
          heartColors[imdbID] = color === "red";
          const posterSrc = movieElement.querySelector("#poster").getAttribute("src");
          const index = redHeartPosters.indexOf(posterSrc);
          
          if (color === "red" && index === -1) {
            redHeartPosters.push(posterSrc);
          } else if (color !== "red" && index !== -1) {
            redHeartPosters.splice(index, 1);
          }
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

        fav_box.style.display="none";
        list.style.display = "none";
        selectedmovie.style.display = "block";
        console.log("poster",data1.Poster);
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
fav.addEventListener("click", function(e) {
  let favhtml = "";
  list.style.display = "none";
  selectedmovie.style.display = "none";
  const u = "https://www.omdbapi.com/?apikey=59cd0769&i=";

  // Create an array to store all the fetch requests
  const fetchPromises = [];

  if (heartColors.length !== 0) {

    fav_box.style.display = "flex";

    for (let i in heartColors) {
      if (heartColors[i] === true) {
        const posLink = u + i;

        // Add the fetch request to the array
        fetchPromises.push(
          fetch(posLink)
            .then(function(res) {
              return res.json();
            })
            .then(function(d) {
              console.log("p", d.Poster);
              favhtml += `<div class="fav-list">
                <img src="${d.Poster}" alt="">
              </div>`;
            })
        );
      }
    }

    
    Promise.all(fetchPromises)
      .then(function() {
        fav_box.innerHTML = favhtml;
      })
      .catch(function(error) {
        console.error(error);
      });
  }
});
