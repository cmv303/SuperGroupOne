document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
});

//target the search button for a click event
var searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", logLyric);

//
function logLyric() {
  var inputBox = document.getElementById("Search");
  var lyric = inputBox.value;
  console.log(lyric);
  var mXm =
    "https://proxy.cors.sh/https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=" +
    lyric +
    "&apikey=38bfab1d78863e402542205e1d2d9257";
  fetchData();

  //take input and fetch song data from musixmatch
  function fetchData() {
    fetch(mXm, {
      headers: {
        // allows us to bypass the CORS error, 
        // will need to replace temp api key before presentation (expires on sunday)
        "x-cors-api-key": "temp_211e4d54773c2e03893b97b548ed8d74",
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  }
}

// Hope's youtube API key:
// const key = "AIzaSyA4D1jpi2mpVlAlUO9TWKG2mxPCDFda1l4";

// LaShawn's youtube API key:
const key = "AIzaSyD2OrpKeJ6CUDPO-oZ5KB2mmLdWD0PSh8c"

// this function currently returns youtube videos matching the user input,
$("#searchBtn").on("click", function () {
  var input = $("#Search").val();
  console.log("click ", input);
  $("#youtube-title").empty();
  $("#youtube-title").text(input);
  youTubeAPI(input);
});

// can we store the musixmatch data and run through here so youtube vids match musixmatch songs?
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
      // this was an experiment to capture the videoID of the returned data
      console.log(data.items[0].id.videoId);
      displayYouTube(data.items);
    });
}

//display youtube data
// creates a list item for each returned youtube video
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

//functions for filterPanel
let selectedGenreArr = [];
let selectedArtistArr = [];

function searchGenre() {
  $("#filterApplyButton").show();
  let genre = $("#searchGenre").prop("checked");
  let artist = $("#searchArtist").prop("checked");
  let priorGenreSearched = $("#searchPriorGenre").attr("priorvalue");
  if (genre) {
    selectedGenreArr.push(["add", "filter", "SEARCH_GENRE"]);
  } else if (genre != priorGenreSearched) {
    selectedGenreArr.push(["delete", "filter", "SEARCH_GENRE"]);
  }
}
// searchGenre();
console.log(1);
function searchArtist() {
  let priorArtistSearched = $("#searchPriorAritst").attr("priorvalue");
  if (artist) {
    selectedArtistArr.push(["add", "filter", "SEARCH_ARTIST"]);
  } else if (artist != priorArtistSearched) {
    selectedArtistArr.push(["delete", "filter", "SEARCH_ARTIST"]);
  }
}
console.log(2);
// searchArtist();

function filtersImplemented(e) {
  e.preventDefault();
  console.log("filter fired");
  let combinedArr = selectedGenreArr.concat(selectedArtistArr);
  let filtersImplemented = {
    searchChanges: JSON.stringify(combinedArr),
    showGenre: genre,
    showArtist: artist,
  };
  let baseUrl =
    "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_artist=justin%20bieber&page_size=3&page=1&s_track_rating=desc&apikey=8eb4ed7bb8315a88d7fe11ff7b000ef1";
  //  + genre + "&showArtist=" + artist;
  $.ajax(baseUrl).done(function (response) {
    doSearch(filtersImplemented);
    console.log(response);
  });
}
//filtersImplemented(e); //!Not working
//e.addEventListener("click", filtersImplemented);

// This function creates an <iframe> (and YouTube player)

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: "M7lc1UVf-VE",
    playerVars: {
      playsinline: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// The API calls this function when the player's state changes.
// The function indicates that when playing a video (state=1),
// the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}

// console.log("top")
// console.log("top2")
// console.log("top3")
// console.log("top4")
// console.log("top5")
// console.log("top6");

// Examples so I don't forget (Hope)
// GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=Ks-_Mh1QhMc&type=video&key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json

// https://www.youtube.com/watch?v=-WowH0liGfE
