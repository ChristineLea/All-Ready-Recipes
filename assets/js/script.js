// Step 1: HTML References
const inputEl = document.querySelector('.ingredients');
const btnEl = document.querySelector('.searchBtn');
const recipeList = document.querySelector('.recipeList');
const recipeModal = document.querySelector('.recipeModal');
const noRecipeMessage = document.querySelector('.noRecipeMessage');
const showRecipeBtn = document.querySelector('.showRecipe');
const favoriteRecipeBtn = document.querySelector('.favoriteRecipes')
const recipeContainer = document.querySelector('.recipeContainer');
const includeSelectedCheckbox = document.querySelector('.includeOnly');
const selectYourIngredient = document.querySelector('.selectYourIngredient');


// Step 3: Add API Key
const apiKey = "8734635d4cfc4d00bb8e0e29263ce8f2";

//Global Variable
let recipeData = [];
let selectedIngredients = [];

// Step 4: Function to fetch data from API
function fetchRecipe(ingredients, ranking) {
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&ranking=${ranking}&apiKey=${apiKey}&number=9`;

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

    data.forEach(recipe => {
      // Create recipe card
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('column', 'is-one-third');

      // Create card content
      const cardContent = document.createElement('div');
      cardContent.classList.add('card', 'content');

      // Create image element for recipe
      const imageElement = document.createElement('img');
      imageElement.src = recipe.image;
      imageElement.alt = recipe.title;

      // Create title element for recipe
      const titleElement = document.createElement('h3');
      titleElement.classList.add('recipe-title');
      titleElement.textContent = recipe.title;

      // Create "View Recipe" button
      const buttonElement = document.createElement('button');
      buttonElement.textContent = 'View Recipe';
      buttonElement.classList.add('button', 'is-primary');
      buttonElement.addEventListener('click', function() {
        showRecipeModal(recipe.id);
      });

      // Append image, title, and button elements to card content
      cardContent.appendChild(imageElement);
      cardContent.appendChild(titleElement);
      cardContent.appendChild(buttonElement);

      // Append card content to recipe card
      recipeCard.appendChild(cardContent);

      // Append recipe card to recipe list
      recipeList.appendChild(recipeCard);
    });
  } else {
    // Display message if no recipe found
    noRecipeMessage.textContent = 'No recipes found.';
  }
}

function fetchIngredientSuggestions(query) {
  const url = `https://api.spoonacular.com/food/ingredients/autocomplete?query=${query}&number=8&apiKey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(function(data){
      displayIngredientSuggestion(data);
    });
};


// Display Auto Completion 
function displayIngredientSuggestion(data) {
  const suggestionsList = document.querySelector('.suggestionsList');
  suggestionsList.innerHTML = "";
  const popularIngredients = ['chicken', 'beef', 'pasta', 'rice', 'tomatoes'];

  //clear the popularIngredients when user engage with inputEl.
  if (inputEl.value.trim() !== '') {
    popularIngredients.length = 0;
  }

  popularIngredients.forEach(ingredient => {
    // TODO: we need clear papularingridents when the user start typing
    const suggestionItem = document.createElement('li');
    suggestionItem.textContent = ingredient;
    suggestionItem.addEventListener('click', function() {
      const selectedIngredient = ingredient;
      inputEl.value = '';
      selectedIngredients.push(selectedIngredient);
      displaySelectedIngredients();
      suggestionsList.innerHTML = "";
    });
    suggestionsList.appendChild(suggestionItem);
  });

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

  const includeSelectedCheckbox = document.querySelector('.includeOnly');

  if (selectedIngredients.length === 1) {
    selectYourIngredient.textContent = 'You have selected the below ingredient. Add more ingredients!';
    noRecipeMessage.textContent = '';
  } else if (selectedIngredients.length > 1 && selectedIngredients.length < 3) {
    selectYourIngredient.textContent = 'Add more ingredients to refine your search for recipes.';
    noRecipeMessage.textContent = '';
    selectYourIngredient.style.color = 'darkblue';
  } else {
    selectYourIngredient.textContent = 'Check "Recipes based on given Ingredients" for meal recipes based on your prefered  ingredients.';
    selectYourIngredient.style.color = 'darkgreen';
    noRecipeMessage.textContent = '';
  }

};


// Step 2: Add an event listener to the search button
btnEl.addEventListener('click', function() {
  const userInput = selectedIngredients.join(', ');
  const includeSelectedOnly = includeSelectedCheckbox.checked;
  let ranking = 1; // Default ranking for maximizing used ingredients

  if (includeSelectedOnly) {
    ranking = 2; // Set ranking to minimize missing ingredients
  }

  fetchRecipe(userInput, ranking);
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

    // Hide other visible elements
    recipeContainer.classList.add('hide-element');

    const likeBtn = document.createElement('button');
    likeBtn.classList.add('button', 'is-link', 'is-rounded', 'like-btn', 'right');
    likeBtn.textContent = 'Like';
    likeBtn.addEventListener('click', function() {
      //safe selected recipe to localStroge 
      addToFavorites(selectedRecipe);
      likeBtn.textContent = 'Liked';
      likeBtn.style.backgroundColor = 'green';

    });
 
    recipeModal.appendChild(likeBtn);

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

    //create close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close Recipe Details';
    closeBtn.classList.add('close-btn');
    closeBtn.addEventListener('click', function() {
      recipeModal.style.display = 'none';
      recipeContainer.classList.remove('hide-element');
    });
  
    recipeModal.appendChild(closeBtn);

  } else {
    recipeModal.style.display = 'none';

    // Show other elements
    recipeContainer.classList.remove('hide-element');
  }
}

//save Selected Recipe to LocalStorage and Favourite
function addToFavorites(recipe) {
  const favorite = getFavoriteFromStorege();

  //check if the selected recipe already exist
  if (favorite.some(favorite => favorite.id === recipe.id)) {
    return; // if recipe already exit, nothing will be done.
  }
  favorite.push(recipe);
  saveFavoriteToStorage(favorite);
};

//function to bet favourite from localSroge
function getFavoriteFromStorege() {
  const favoritesJSON = localStorage.getItem('favorites');
  return favoritesJSON? JSON.parse(favoritesJSON):[];
};

//function to save to localStroge
function saveFavoriteToStorage(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};


//  add event listener to the favoriteRecipes element
 favoriteRecipeBtn.addEventListener('click', function() {
  displayFavoriteRecipes();
 });

 function displayFavoriteRecipes() {
  recipeList.innerHTML = '';
  const favoriteRecipes = getFavoriteFromStorege();

  if (favoriteRecipes.length > 0) {
    favoriteRecipes.forEach(recipe => {
      const recipeElement = document.createElement('article');
      recipeElement.dataset.recipeId = recipe.id;

      const imageElement = document.createElement('img');
      imageElement.src = recipe.image;
      imageElement.alt = recipe.title;

      const titleElement = document.createElement('h3');
      titleElement.textContent = recipe.title;

      const showRecipeButton = document.createElement('button');
      showRecipeButton.textContent = 'Show Recipe';
      showRecipeButton.addEventListener('click', function() {
        showRecipeModal(recipe.id);
      });

      recipeElement.appendChild(imageElement);
      recipeElement.appendChild(titleElement);
      recipeElement.appendChild(showRecipeButton);
      recipeList.appendChild(recipeElement);
    });
  } else {
    noRecipeMessage.textContent = 'No favorite recipes found.';
  }
}


// Retrieve ingredients from localStorage and fetch recipe
// const storedIngredients = localStorage.getItem("ingredients");
// if (storedIngredients) {
//   const userInput = JSON.parse(storedIngredients);
//   fetchRecipe(userInput);
// }









