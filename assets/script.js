console.log("top")

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  });
// youtube API key
const key = "AIzaSyA4D1jpi2mpVlAlUO9TWKG2mxPCDFda1l4";
console.log("top2")
function displayYouTube(ytList) {
  $("#resultsList").empty("");
  var list = $("<ul>");
  for (let i = 0; i < ytList.length; i++) {
    var listItem = $("<li>");
    listItem.text(ytList[i].snippet.title);
    list.append(listItem);
  }
  $("#resultsList").append(list);
}

console.log("top3")

// Examples so I don't forget
// GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=Ks-_Mh1QhMc&type=video&key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json

// https://www.youtube.com/watch?v=-WowH0liGfE

console.log("top4")

function youTubeAPI(input) {
  var youTube =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
    input +
    "&type=video&key=" +
    key;
  fetch(youTube)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.items[0].id.videoId);
      displayYouTube(data.items);
    });
}

console.log("top5")

$("#searchBtn").on("click", function( ){
  var input = $("#Search").val()
  console.log("click ", input)
  $("#youtube-title").empty()
  $("#youtube-title").text(input)
  youTubeAPI(input)
})
// function displayYouTube(){}


console.log("top6")

//functions for filterPanel
let selectedGenreArr = [];
let selectedArtistArr = [];
let selectedLyricsArr = [];

function searchByGenre() {
  $("#filterApplyButton").show();
  let genreFilter = $("#searchByGenre").prop("checked");
  let priorGenreSearched = $("#searchPriorGenre").attr("priorvalue");
  if (genreFilter) {
    selectedGenreArr.push(["add", "filter", "SEARCH_BY_GENRE"]);
  } else if (genreFilter != priorGenreSearched) {
    selectedGenreArr.push(["delete", "filter", "SEARCH_BY_GENRE"]);
  }
}
  // searchGenre();
console.log(1);

  function searchByArtist() {
    let artistFilter = $("#searchByArtist").prop("checked");
    let priorArtistSearched = $("#searchPriorArtist").attr("priorvalue");
    if (artistFilter) {
      selectedArtistArr.push(["add", "filter", "SEARCH_BY_ARTIST"]);
    } else if (artistFilter != priorArtistSearched) {
      selectedArtistArr.push(["delete", "filter", "SEARCH_BY_ARTIST"]);
    }
  }
  console.log(2);
  // searchByArtist();

  function filterByLyrics() {
    let lyricsFilter = $("#searchByLyrics").prop("checked");
    let priorLyricsSearched = $("#searchPriorArtist").attr("priorvalue");
    if (lyricsFilter) {
      selectedArtistArr.push(["add", "filter", "SEARCH_BY_LYRICS"]);
    } else if (lyricsFilter != priorLyricsSearched) {
      selectedLyricsArr.push(["delete", "filter", "SEARCH_BY_LYRICS"]);
    }
  }
  console.log(2);
  // searchByLyrics();



  function filtersImplemented(e) {
    e.preventDefault();
    console.log("filter fired")
    let combinedArr = selectedGenreArr.concat(selectedArtistArr);
    let filtersImplemented = {
      searchChanges: JSON.stringify(combinedArr),
      showGenre: genre,
      showArtist: artist,
    };
    let baseUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_artist=justin%20bieber&page_size=3&page=1&s_track_rating=desc&apikey=8eb4ed7bb8315a88d7fe11ff7b000ef1"
    //  + genre + "&showArtist=" + artist;
    $.ajax(baseUrl).done(function(response) {
      doSearch(filtersImplemented);
      
      console.log(response);
    });
  }
  console.log(3)

  var filterApplyButton = $("#filterApplyButton");
  console.log(filterApplyButton, "filter applied");
  filterApplyButton.on("click", filtersImplemented);

