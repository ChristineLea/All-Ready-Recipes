// apiKey = 'de46f6983ee94b56baf6329b006b7d66';

// var submitButton = document.getElementById("submit-button");

// //fetch API: https://api.spoonacular.com/food/jokes/random

// submitButton.addEventListener("click", function (event) {
//   event.preventDefault();
//   const
// });

// const queryURL = `https://api.spoonacular.com/food/jokes/random=&apiKey${apiKey}`;
// //check API working: https://api.spoonacular.com/food/jokes/random=&apikey=de46f6983ee94b56baf6329b006b7d66.get_a_random_food_joke!

// fetch(queryURL)
// .then(function (response){
//     return response.json();
// })
// .then(function (data) {
//   console.log(data);
//   //display data funtion - call here?
// })

apiKey = "16b91a08af5b4fe2b3b56ce186f16689";

var submitButton = document.getElementById("submit-button");

//api.humorapi.com/jokes/search?number=1apiKey${apikey}
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  fetchAPI();
});

function fetchAPI() {
  const queryURL = `https://api.humorapi.com/jokes/search?keywords=food&api-key${apikey}`;
  //https://api.humorapi.com/jokes/search?keywords=food&max-length=30&api-key=87051f333fb249f5b0e68c48284fc5f
  //https://api.humorapi.com/jokes/search?keywords=food&api-key=16b91a08af5b4fe2b3b56ce186f16689
  console.log(queryURL);

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //display data funtion - call here?
    });
}
