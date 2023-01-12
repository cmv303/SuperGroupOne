
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  });
// youtube API key
const key = "AIzaSyA4D1jpi2mpVlAlUO9TWKG2mxPCDFda1l4";

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

// Examples so I don't forget
// GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=Ks-_Mh1QhMc&type=video&key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json

// https://www.youtube.com/watch?v=-WowH0liGfE
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


$("#searchBtn").on("click", function( ){
  var input = $("#Search").val()
  console.log("click ", input)
  $("#youtube-title").empty()
  $("#youtube-title").text(input)
  youTubeAPI(input)
}) 

// function displayYouTube(){}

//functions for filterPanel
function searchGenre() {
  $("#filterApplyButton").show();
  let genre = $("#searchGenre").prop("checked");
  let artist = $("#searchArtist").prop("checked");
  let priorGenreSearched = $("#searchPriorGenre").attr("priorvalue");
  let showArr = new array();
  if (genre) {
    showArr.push(["add", "filter", "SEARCH_GENRE"]);
  } else if (genre != priorGenreSearched) {
    showArr.push(["delete", "filter", "SEARCH_GENRE"]);
  }
  searchGenre();

  function searchArtist() {
    let priorArtistSearched = $("#searchPriorAritst").attr("priorvalue");
    let showArr = new array();
    if (artist) {
      showArr.push(["add", "filter", "SEARCH_ARTIST"]);
    } else if (artist != priorArtistSearched) {
      showArr.push(["delete", "filter", "SEARCH_ARTIST"]);
    }
  }
  searchArtist();

  function filtersImplemented() {
    let filtersImplemented = {
      searchChanges: changeJsonString(showArr),
      showGenre: genre,
      showArtist: artist,
    };
    let baseUrl = "" + genre + "&showArtist=" + artist;
    $.ajax(baseUrl).done(function () {
      doSearch(filtersImplemented);
    });
  }
  filtersImplemented(e); //!Not working
  e.addEventListener("click", filtersImplemented);
}
