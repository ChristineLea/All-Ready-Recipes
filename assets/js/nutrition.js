// // CALORIE NINJAS API
const API_KEY = "J4fyAOnwuXGtNt+PjYXPZg==g2QzfMyhXiwtkSjP";
// test query
let query = "potato and sausages";

// VALIDATION
// convert kg to pounds

// GET request
$.ajax({
	method: "GET",
	url: "https://api.calorieninjas.com/v1/nutrition?query=" + query,
	headers: { "X-Api-Key": API_KEY },
	contentType: "application/json",
	success: function (result) {
		// access returned data
		const objData = result.items;
		// iterate over returned objects for each ingredient requested
		// for all of the items returned, save each value to an object to access and display data
		for (const item of objData) {
			let obj = {
				name: item.name,
				servingSize: item.serving_size_g,
				calories: item.calories,
				protein: item.protein_g,
				sugar: item.sugar_g,
				fiber: item.fiber_g,
				sodium: item.sodium_mg,
				potassium: item.potassium_mg,
				cholesterol: item.cholesterol_mg,
				carbohydrates: item.carbohydrates_total_g,
				fat: item.fat_total_g,
				saturatedFat: item.fat_saturated_g,
			};
			// pass the object for each of the ingredients to the function to display the data
			displayData(obj);
		}
	},
	// if error - log to console
	error: function ajaxError(jqXHR) {
		console.error("Error: ", jqXHR.responseText);
	},
});
// test to display/output to the user
function displayData(obj) {
	const body = $("body");
	let list = $("<ul>");
	let ingredient = obj.servingSize;
	let lI = $("<li>");
	lI.text(ingredient);
	list.append(lI);
	body.append(list);
}
