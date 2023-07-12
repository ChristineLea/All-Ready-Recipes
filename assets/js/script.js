// Step 1: HTML References
const inputEl = document.querySelector('.ingredients');
const btnEl = document.querySelector('.searchBtn');
const recipeList = document.querySelector('.recipeList');
const recipeModal = document.querySelector('.recipeModal');
const noRecipeMessage = document.querySelector('.noRecipeMessage');
const showRecipeBtn = document.querySelector('.showRecipe');
const favoriteRecipeBtn = document.querySelector('.favoriteRecipes');
const recipeContainer = document.querySelector('.recipeContainer');
const includeSelectedCheckbox = document.querySelector('.includeOnly');
const selectYourIngredient = document.querySelector('.selectYourIngredient');

// Step 3: Add API Key
const apiKey = "8734635d4cfc4d00bb8e0e29263ce8f2";

//Global Variable
let recipeData = [];
let selectedIngredients = [];

// Step 4: Function to fetch data from API
function fetchRecipe(ingredients, ranking, ignorePantry) {
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&ranking=${ranking}&ingnorePantry=${ignorePantry}&apiKey=${apiKey}&number=9`;

  // GET request using Fetch
  fetch(url)
    .then(response => response.json())
    .then(function(data) {
      recipeData = data;
      displayRecipe(data);
    });
}

// Step 5: render Recipe with Instructions
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

// Step 6: Fetch recipe instructions for a given recipe ID
function fetchRecipeInstructions(recipeId) {
  const url = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        return data[0].steps;
      }
      return [];
    });
}

// Step 7: Display recipe instructions in the modal
function displayRecipeInstructions(steps) {
  const instructionsList = document.createElement('ul');
  steps.forEach(step => {
    const instructionItem = document.createElement('li');
    instructionItem.textContent = step.step;
    instructionsList.appendChild(instructionItem);
  });

  const recipeInstructions = document.createElement('div');
  recipeInstructions.classList.add('recipe-instructions');
  recipeInstructions.appendChild(instructionsList);

  recipeModal.appendChild(recipeInstructions);
}

function fetchIngredientSuggestions(query) {
  const url = `https://api.spoonacular.com/food/ingredients/autocomplete?query=${query}&number=8&apiKey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(function(data){
      displayIngredientSuggestion(data);
    });
}

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
}

function displaySelectedIngredients() {
  const selectedIngredientContainer = document.querySelector('.selectedIngredients');
  selectedIngredientContainer.innerHTML = '';

  selectedIngredients.forEach(ingredient => {
    const ingredientItem = document.createElement('span');
    ingredientItem.textContent += `${ingredient}, `;

    selectedIngredientContainer.appendChild(ingredientItem);
  });

  if (selectedIngredients.length === 1) {
    selectYourIngredient.textContent = 'You have selected the below ingredient. Add more ingredients!';
    noRecipeMessage.textContent = '';
  } else if (selectedIngredients.length > 1 && selectedIngredients.length < 3) {
    selectYourIngredient.textContent = 'Add more ingredients to refine your search for recipes.';
    noRecipeMessage.textContent = '';
    selectYourIngredient.style.color = 'darkblue';
  } else {
    selectYourIngredient.textContent = '\u2713 the box to get recipe based on Selected Ingredients';
    selectYourIngredient.style.color = 'darkgreen';
    noRecipeMessage.textContent = '';
  }
}

// Step 2: Add an event listener to the search button
btnEl.addEventListener('click', function() {
  const userInput = selectedIngredients.join(', ');
  const includeSelectedOnly = includeSelectedCheckbox.checked;
  let ranking = 1;
  let ignorePantry = false;

  if (includeSelectedOnly) {
    ranking = 2;
    ignorePantry = true;
  }

  fetchRecipe(userInput, ranking, ignorePantry);
});

//pass a message to User if they check "recipes based on given ingredients"
includeSelectedCheckbox.addEventListener('change', function() {
  const ignorePantryMessage = document.querySelector('.ignorePantryMessage');
  ignorePantryMessage.classList.toggle('hide-element', !this.checked);

  if (this.checked) {
    ignorePantryMessage.textContent = 'Typical Pantry Items such as water, salt and pepper will be ignored from Missed-Ingredient-Count';
  } else {
    ignorePantryMessage.textContent = '';
  }
});

// Step 1: Autocompletion
// Add event listener to Input typing
inputEl.addEventListener('input', function() {
  const query = inputEl.value;
  fetchIngredientSuggestions(query);
});

// Add event listener to input click
inputEl.addEventListener('click', function() {
  const query = inputEl.value;
  
  fetchIngredientSuggestions(query);
});

function showRecipeModal(recipeId) {
  const selectedRecipe = recipeData.find(recipe => recipe.id === recipeId);

  if (selectedRecipe) {
    recipeModal.style.display = 'block';
    recipeModal.innerHTML = '';

    const likeBtn = document.createElement('button');
    likeBtn.classList.add('button', 'is-link', 'is-rounded', 'like-btn', 'right');
    likeBtn.textContent = 'Like';
    likeBtn.addEventListener('click', function() {
      // Save selected recipe to localStorage 
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

    // Fetch and display recipe instructions
    fetchRecipeInstructions(recipeId)
      .then(steps => {
        displayRecipeInstructions(steps);
      })
      .catch(error => {
        console.log('Error fetching recipe instructions:', error);
      });

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
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

// Save selected Recipe to LocalStorage and Favourite
function addToFavorites(recipe) {
  const favorite = getFavoriteFromStorage();

  // Check if the selected recipe already exists
  if (favorite.some(favorite => favorite.id === recipe.id)) {
    return; // If recipe already exists, do nothing.
  }
  favorite.push(recipe);
  saveFavoriteToStorage(favorite);
}

// Function to get favorites from localStorage
function getFavoriteFromStorage() {
  const favoritesJSON = localStorage.getItem('favorites');
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
}

// Function to save to localStorage
function saveFavoriteToStorage(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Add event listener to the favoriteRecipes element
favoriteRecipeBtn.addEventListener('click', function() {
  displayFavoriteRecipes();
});

function displayFavoriteRecipes() {
  recipeList.innerHTML = '';
  const favoriteRecipes = getFavoriteFromStorage();

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
    noRecipeMessage.textContent = 'No favorite recipes found. You have not liked any recipes yet.';
  }
}
// Retrieve ingredients from localStorage and fetch recipe
const storedIngredients = localStorage.getItem("ingredients");
if (storedIngredients) {
  const userInput = JSON.parse(storedIngredients);
  fetchRecipe(userInput);
}
