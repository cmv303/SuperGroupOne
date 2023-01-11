// youtube API key
const key = "AIzaSyA4D1jpi2mpVlAlUO9TWKG2mxPCDFda1l4"

var youTube = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=dogs&type=video&key=AIzaSyA4D1jpi2mpVlAlUO9TWKG2mxPCDFda1l4"

// Examples so I don't forget 
// GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=Ks-_Mh1QhMc&type=video&key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json

// https://www.youtube.com/watch?v=-WowH0liGfE
$("button").on("click", function( ){
  console.log("click ",this.value)
})
var input = $("#videoId").value 

fetch(youTube)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        console.log(data.items[0].id.videoId);
        // displayYouTube();
      });

    
      

// function displayYouTube(){}