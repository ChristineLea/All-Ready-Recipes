//select element by ID
const submitButton = document.getElementById("submit-button");
const ingredients = document.getElementById("user-ingredients");

//array = 9 as max jokes returned will be 10
const numberArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const indexArrNumber = getRandom(numberArr);
console.log(indexArrNumber);

//Random infex number generator to be used to access index in array for joke:
function getRandom(numberArr) {
  const randomIndex = Math.floor(Math.random() * numberArr.length);
  console.log(randomIndex);
  const indexNumber = numberArr[randomIndex];
  return indexNumber;
}

//event listener to save search from userInput and run random joke:
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  fetchAPI();
  storeIngrediants();
});

//apikey for random joke generator
apiKey = "522e16255e6e4508a3f423199e9dc76f";
//previous ApiKey (use when quota reached)  16b91a08af5b4fe2b3b56ce186f16689

//fetch random joke API tagged for food jokes and 10 jokes returned:
function fetchAPI() {
  const queryURL = `https://api.humorapi.com/jokes/search?include-tags=food&number=10&api-key=${apiKey}`;

  console.log(queryURL);

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //call display data function:
      displayJoke(data);
    });
}

//display joke code
const jokeElement = document.getElementById("print-text");
const deleteButton = document.getElementById("delete-button");

function displayJoke(data) {
  //check data is array of jokes
  console.log(data);
  //check indexarrnumber returnign whole value for i
  console.log(indexArrNumber);
  console.log(data.jokes[indexArrNumber].joke);
  //append joke text to p element in HTML
  jokeElement.innerText = data.jokes[indexArrNumber].joke;
  console.log(data.jokes[indexArrNumber].joke);

  //makes visible delete button:
  document.getElementById("delete-button").style.display = "block";
}

//then action move to HTML page two

function storeIngrediants() {
  var userIngredients = ingredients.value.trim();
  localStorage.setItem("ingredients", JSON.stringify(userIngredients));
  console.log(userIngredients);
}
