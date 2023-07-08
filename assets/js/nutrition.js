// CALORIE NINJAS API
const API_KEY = "J4fyAOnwuXGtNt+PjYXPZg==g2QzfMyhXiwtkSjP";
// test query
let query = "mashed potatos and sausages";

// GET request
$.ajax({
	method: "GET",
	url: "https://api.calorieninjas.com/v1/nutrition?query=" + query,
	headers: { "X-Api-Key": API_KEY },
	contentType: "application/json",
	success: function (result) {
		// access returned data
		const objData = result.items[0];
		// save each data category to an object
		let obj = {
			name: objData.name,
			servingSize: objData.serving_size_g,
			calories: objData.calories,
			protein: objData.protein_g,
			sugar: objData.sugar_g,
			fiber: objData.fiber_g,
			sodium: objData.sodium_mg,
			potassium: objData.potassium_mg,
			cholesterol: objData.cholesterol_mg,
			carbohydrates: objData.carbohydrates_total_g,
			fat: objData.fat_total_g,
			saturatedFat: objData.fat_saturated_g,
		};
		// pass the object to the function to display the data
			displayData(obj);
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
	let ingredient = obj.name;
	let lI = $("<li>");
	lI.text(ingredient);
	list.append(lI);
	body.append(list);
}
