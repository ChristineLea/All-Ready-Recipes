// ACCORDION JQUERY FUNCTION
// Initialise
$(function () {
	$("#accordion").accordion({
		collapsible: true,
	});
});

// This is a prototype object which acts as a blueprint to create new objects from
class RecipeObject {
	// constructor function will take in the recipe data as params
	constructor(id, title, ingredients, intolerances, maxCookTime, img, bool) {
		// example of a recipe object in which data will be stored & displayed
		this.id = id;
		this.title = title;
		this.ingredients = ingredients;
		this.intolerances = intolerances;
		this.maxCookTime = maxCookTime;
		this.img = img;
		this.addToSavedRecipe = bool;
	} // this method will be called to populate the accordion in saved recipe section
	displayAccordion() {
		// Method will populate the recipeObject property values to the accordion (saved recipes)
		// for example
		let recipeTitleEl = document.querySelector("#ui-id-1");
		recipeTitleEl.textContent(`${this.title}`);

		let accordionEl = document.querySelector("#accordion"); // or #card
		accordionEl.append(recipeTitleEl);
		// we then continue this process to add in the remaining property values
	} // this method will be called to populate the card in recipe suggestion section
	displayCard() {
		// Method will populate the recipeObject property values to the card (recipe suggestions)
		// for example
		let recipeTitleEl = document.querySelector("#card-title");
		recipeTitleEl.textContent(`${this.title}`);

		let cardEl = document.querySelector("#card");
		cardEl.append(recipeTitleEl);
		// we then continue this process to add in the remaining property values
	}
}

// From the "blueprint" above we can create New objects
let recipeId = new RecipeObject( // Sample object which will be created when recipe is displayed in the RECIPE suggestion section
	id,
	title,
	ingredients,
	intolerances,
	maxCookTime,
	img,
	bool
);
// This can then be used to display on CARD & ACCORDIAN as it will inherit the methods
recipeId.displayCard();

/* This code functionality will execute from the RECIPE SUGGESTIONS HTML page
WHEN a user selects save/button/icon/heart (recipeIdBtn) it will reference the recipe by its id, save to local storage
and display in in the SAVED RECIPE accordion. */

// 1. Variable which will reference the save button icon of a given recipe ID
let recipeIdBtn = $(".recipeIdBtn");
// 2. Event when save button is clicked
recipeIdBtn.on("click", function () {
	// 3. DOM traversal up to parent element which will be the recipe container with the recipe ID
	let recipeId = $(this).prev().parent().attr("id");
	// 4. Pass recipeId as an argument to the addSavedRecipe() function
	addSavedRecipe(recipeId);
});
function addSavedRecipe(id) {
	id.displayAccordion(); // This will populate the HTML accordian using the recipe id as a reference to the recipe object

	localStorage.setItem("recipeId", JSON.stringify(id));
}