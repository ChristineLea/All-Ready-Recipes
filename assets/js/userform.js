//select element by ID
const submitButton = document.getElementById("submit-button");
const ingredients = document.getElementById("user-ingredients");

//event listener to save search from userInput:
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var userIngredients = ingredients.value.trim();

  localStorage.setItem("ingredients", JSON.stringify(userIngredients));
  console.log(userIngredients);
});
