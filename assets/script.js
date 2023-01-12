// youtube API key
const APIKey = "AIzaSyA4D1jpi2mpVlAlUO9TWKG2mxPCDFda1l4";
//example
var youTube =
  "https://www.googleapis.com/youtube/v3/search?part=snippet&q=dogs&type=video&key=AIzaSyA4D1jpi2mpVlAlUO9TWKG2mxPCDFda1l4";


fetch(youTube)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        displayYouTube(data);
      })

    function displayYouTube(data){
    console.log(data.items[0].id.videoId);
    // need a for loop to get multiple videoIds
    var video = data.items[0].id.videoId;
    var videoURL = "https://www.youtube.com/watch?v=" + video;
    //creates a url we can plug into the iframe src
    //need to look into iframe stuff because it throws an error when I try to display
    console.log(videoURL);
}

var mxmAPI = "38bfab1d78863e402542205e1d2d9257";

// var mXm = "http://api.musixmatch.com/ws/1.1/track.search?q_artist=justin_bieber&page_size=3&page=1&s_track_rating=desc&apikey=" + mxmAPI 

//won't work in local, have to test it in the browser or deploy it! 
  // paste the url in browser to see what it returns and then use that data to write a new function, 
  // once we have it written we can deploy to see if it works!
fetch("https://api.musixmatch.com/ws/1.1/track.search?q_artist=justin_bieber&page_size=3&page=1&s_track_rating=desc&apikey=38bfab1d78863e402542205e1d2d9257", {
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded"
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data));

// }
// fetch(mXm)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });

// Examples so I don't forget
// GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=Ks-_Mh1QhMc&type=video&key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json

// https://www.youtube.com/watch?v=-WowH0liGfE
