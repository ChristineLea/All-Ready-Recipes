// Step 1: HTML References
const inputEl = document.getElementById('ingredients');
const btnEl = document.getElementById('searchBtn');
const titleEl = document.getElementById('title');
const imgEl = document.getElementById('image');
const containerEl = document.getElementById('container');

// Step 3: Add API Key
const apiKey = "8734635d4cfc4d00bb8e0e29263ce8f2";

// Step 4: Function to fetch data from API
function fetchApi(ingredients) {
  //refer to API documentation and test other endpoints or parameters
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${apiKey}&number=3`;

  // GET request using Fetch
  fetch(url)
  //the first then get response from the server and changed it into json format
    .then(response => response.json())
    .then(function(data) {
      displayRecipe(data);
    });
}

// Step 5: Display Recipe to HTML
function displayRecipe(data) {
  //
  imgEl.innerHTML = '';
  titleEl.innerHTML = '';
  //itterate over each element in the data array
  if (data.length > 0) {
    data.forEach(recipe => {
      const recipeImg = recipe.image;
      const recipeTitle = recipe.title;

      // Create image element
      const imageElement = document.createElement('img');
      imageElement.src = recipeImg;
      imageElement.alt = recipeTitle;
      imgEl.appendChild(imageElement);

      // Create title element
      const titleElement = document.createElement('h2');
      titleElement.textContent = recipeTitle;
      titleEl.appendChild(titleElement);
    });
  }
}

// Step 2: Add an event listener to the search button
btnEl.addEventListener('click', function() {
  const userInput = inputEl.value;
  fetchApi(userInput);
});