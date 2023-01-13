// console.log("top")
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  });
// youtube API key

var searchBtn = document.getElementById("searchBtn");
// var display = document.getElementById("display");

searchBtn.addEventListener("click", logArtist);

function logArtist() {
  var input = document.getElementById("Search");
  var lyric = input.value;
  console.log(lyric);
  var mXm =
  "https://proxy.cors.sh/https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=" + lyric + "&apikey=38bfab1d78863e402542205e1d2d9257";
  fetchData();

//take input and fetch data from musixmatch
function fetchData() {
    fetch(mXm, {
        headers: {
            'x-cors-api-key': 'temp_211e4d54773c2e03893b97b548ed8d74'
            }
          })

    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      }
)}
    }

