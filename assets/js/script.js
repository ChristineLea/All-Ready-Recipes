// Step 1: HTML References
const inputEl = document.querySelector('.ingredients');
const btnEl = document.querySelector('.searchBtn');
const recipeList = document.querySelector('.recipeList');
const recipeModal = document.querySelector('.recipeModal');
const noRecipeMessage = document.querySelector('.noRecipeMessage');
const showRecipeBtn = document.querySelector('.showRecipe');


// Step 3: Add API Key
const apiKey = "8734635d4cfc4d00bb8e0e29263ce8f2";

//Global Variable
let recipeData = [];

// Step 4: Function to fetch data from API
function fetchRecipe(ingredients) {
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${apiKey}&number=2`;

  // GET request using Fetch
  fetch(url)
    .then(response => response.json())
    .then(function(data) {
      recipeData = data;
      displayRecipe(data);
    });
}

// Step 5: render Recipe
function displayRecipe(data) {
  if (data.length > 0) {
    recipeList.innerHTML = '';
    recipeModal.innerHTML = '';

    data.forEach(recipe => {
      // Create image element for recipe
      const imageElement = document.createElement('img');
      imageElement.src = recipe.image;
      imageElement.alt = recipe.title;

      // Create title element for recipe
      const titleElement = document.createElement('h3');
      titleElement.textContent = recipe.title;

      // Append image and title elements to recipe
      const recipeElement = document.createElement('article');
      recipeElement.appendChild(imageElement);
      recipeElement.appendChild(titleElement);

      // Create "Show Recipe" button
      const showRecipeButton = document.createElement('button');
      showRecipeButton.textContent = 'Show Recipe';
      showRecipeButton.addEventListener('click', function() {
        showRecipeModal(recipe.id);
      });

      // Append recipe and button to recipeList
      recipeElement.appendChild(showRecipeButton);
      recipeList.appendChild(recipeElement);

      // Create elements and append to recipeModal
      const recipeId = document.createElement('p');
      recipeId.textContent = `ID: ${recipe.id}`;

      const recipeLikes = document.createElement('p');
      recipeLikes.textContent = `Likes: ${recipe.likes}`;

      const recipeMissedIngredientCount = document.createElement('p');
      recipeMissedIngredientCount.textContent = `Missed Ingredient Count: ${recipe.missedIngredientCount}`;

      const recipeMissedIngredients = document.createElement('ul');
      recipe.missedIngredients.forEach(ingredient => {
        const ingredientItem = document.createElement('li');
        ingredientItem.textContent = ingredient.original;

        const ingredientImage = document.createElement('img');
        ingredientImage.src = ingredient.image;
        ingredientImage.alt = ingredient.name;
        ingredientItem.appendChild(ingredientImage);

        recipeMissedIngredients.appendChild(ingredientItem);
      });

      const recipeUnusedIngredients = document.createElement('ul');
      recipe.unusedIngredients.forEach(ingredient => {
        const ingredientItem = document.createElement('li');
        ingredientItem.textContent = ingredient.original;

        const ingredientImage = document.createElement('img');
        ingredientImage.src = ingredient.image;
        ingredientImage.alt = ingredient.name;
        ingredientItem.appendChild(ingredientImage);


        recipeUnusedIngredients.appendChild(ingredientItem);
      });

      const recipeUsedIngredientCount = document.createElement('p');
      recipeUsedIngredientCount.textContent = `Used Ingredient Count: ${recipe.usedIngredientCount}`;

      const recipeUsedIngredients = document.createElement('ul');
      recipe.usedIngredients.forEach(ingredient => {
        const ingredientItem = document.createElement('li');
        ingredientItem.textContent = ingredient.original;

        const ingredientImage = document.createElement('img');
        ingredientImage.src = ingredient.image;
        ingredientImage.alt = ingredient.name;
        ingredientItem.appendChild(ingredientImage);

        recipeUsedIngredients.appendChild(ingredientItem);
      });

      recipeModal.appendChild(recipeId);
      recipeModal.appendChild(recipeLikes);
      recipeModal.appendChild(recipeMissedIngredientCount);
      recipeModal.appendChild(recipeMissedIngredients);
      recipeModal.appendChild(recipeUnusedIngredients);
      recipeModal.appendChild(recipeUsedIngredientCount);
      recipeModal.appendChild(recipeUsedIngredients);
    });
  } else {
    // Display message if no recipe found
    noRecipeMessage.textContent = "No recipe found.";
  }
}
//selected ingredient chosen by users


function fetchIngredientSuggestions(query) {
  const url = `https://api.spoonacular.com/food/ingredients/autocomplete?query=${query}&number=5&apiKey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(function(data){
      displayIngredientSuggestion(data);
    });
};
//empty array for Unser input selection
let selectedIngredients = [];
// Display Auto Completion 
function displayIngredientSuggestion(data) {
  const suggestionsList = document.querySelector('.suggestionsList');
  suggestionsList.innerHTML = "";

  data.forEach(ingredient => {
    const suggestionItem = document.createElement('li');
    suggestionItem.textContent = ingredient.name;
    suggestionItem.addEventListener('click', function() {
      const selectedIngredient = ingredient.name;
      inputEl.value = '';
      selectedIngredients.push(selectedIngredient);
      //update display of selected ingredients
      displaySelectedIngredients();
      suggestionsList.innerHTML = "";
    });
    suggestionsList.appendChild(suggestionItem);
  });
  
};


function displaySelectedIngredients(){
  const selectedIngredientContainer = document.querySelector('.selectedIngredients');
  selectedIngredientContainer.innerHTML = '';

  selectedIngredients.forEach(ingredient => {
    const ingredientItem = document.createElement('span');
      ingredientItem.textContent += `${ingredient}, `;
    
    selectedIngredientContainer.appendChild(ingredientItem);

  });
};

// Step 2: Add an event listener to the search button
btnEl.addEventListener('click', function() {
  const userInput = selectedIngredients.join(', ');
  fetchRecipe(userInput);

});

//step 1 autocompletion
//add eventlistener to Input typing
inputEl.addEventListener('input', function() {
  const query = inputEl.value;
  fetchIngredientSuggestions(query);


});

//add eventlistener to input click
inputEl.addEventListener('click', function() {
  const query = inputEl.value;
  
  fetchIngredientSuggestions(query);
});



function showRecipeModal(recipeId) {
  const selectedRecipe = recipeData.find(recipe => recipe.id === recipeId);

  if (selectedRecipe) {
    recipeModal.style.display = 'block';
    recipeModal.innerHTML = '';
    const recipeTitle = document.createElement('h2');
    recipeTitle.textContent = selectedRecipe.title;
    recipeModal.appendChild(recipeTitle);

    const recipeIdElement = document.createElement('div');
    recipeIdElement.textContent = `ID: ${selectedRecipe.id}`;
    recipeModal.appendChild(recipeIdElement);

    const recipeLikes = document.createElement('div');
    recipeLikes.textContent = `Likes: ${selectedRecipe.likes}`;
    recipeModal.appendChild(recipeLikes);

    const recipeMissedIngredientCount = document.createElement('div');
    recipeMissedIngredientCount.textContent = `Missed Ingredient Count: ${selectedRecipe.missedIngredientCount}`;
    recipeModal.appendChild(recipeMissedIngredientCount);

    const recipeMissedIngredients = document.createElement('ul');
    selectedRecipe.missedIngredients.forEach(ingredient => {
      const ingredientItem = document.createElement('li');
      ingredientItem.textContent = ingredient.original;

      const ingredientImage = document.createElement('img');
      ingredientImage.src = ingredient.image;
      ingredientImage.alt = ingredient.name;
      ingredientItem.appendChild(ingredientImage);

      recipeMissedIngredients.appendChild(ingredientItem);
    });
    recipeModal.appendChild(recipeMissedIngredients);

    const recipeUnusedIngredients = document.createElement('ul');
    selectedRecipe.unusedIngredients.forEach(ingredient => {
      const ingredientItem = document.createElement('li');
      ingredientItem.textContent = ingredient.original;

      const ingredientImage = document.createElement('img');
      ingredientImage.src = ingredient.image;
      ingredientImage.alt = ingredient.name;
      ingredientItem.appendChild(ingredientImage);

      recipeUnusedIngredients.appendChild(ingredientItem);
    });
    recipeModal.appendChild(recipeUnusedIngredients);

    const recipeUsedIngredientCount = document.createElement('div');
    recipeUsedIngredientCount.textContent = `Used Ingredient Count: ${selectedRecipe.usedIngredientCount}`;
    recipeModal.appendChild(recipeUsedIngredientCount);

    const recipeUsedIngredients = document.createElement('ul');
    selectedRecipe.usedIngredients.forEach(ingredient => {
      const ingredientItem = document.createElement('li');
      ingredientItem.textContent = ingredient.original;

      const ingredientImage = document.createElement('img');
      ingredientImage.src = ingredient.image;
      ingredientImage.alt = ingredient.name;
      ingredientItem.appendChild(ingredientImage);

      recipeUsedIngredients.appendChild(ingredientItem);
    });
    recipeModal.appendChild(recipeUsedIngredients);


  } else {
    recipeModal.style.display = 'none';
  }
}

showRecipeBtn.addEventListener('click', showRecipeModal);




