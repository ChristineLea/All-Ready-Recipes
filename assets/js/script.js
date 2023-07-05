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
