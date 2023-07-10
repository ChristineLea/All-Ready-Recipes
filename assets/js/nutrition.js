// // CALORIE NINJAS API
const API_KEY = "J4fyAOnwuXGtNt+PjYXPZg==g2QzfMyhXiwtkSjP";
// test query
let query = "I live in melbourne";

// VALIDATION
// convert kg to pounds

// ON SUBMIT clear alertUser()
function alertUser() {
	$("#info").append("<p>No ingredient/s or food item/s were entered. Please try again.</p>");
	return;
}
// GET request
$.ajax({
	method: "GET",
	url: "https://api.calorieninjas.com/v1/nutrition?query=" + query,
	headers: { "X-Api-Key": API_KEY },
	contentType: "application/json",
	success: function (result) {
		// access returned data
		const objData = result.items;
		// check if return obj is empty - due to no food/ingredients entered
		if (result.items.length === 0) {
			// return a function to output a notifcation to user
			alertUser();
			console.log("empty");
		} else {
			// Pass ingredient/Food data to function so it can be stored in an object and accessed to display
			sortObjData(objData);
		}
	},
	// if error - log to console
	error: function ajaxError(jqXHR) {
		console.error("Error: ", jqXHR.responseText);
	},
});

// function to sort/format returned data
function sortObjData(objData) {
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
		displayData(obj);
	}
}
// test to display/output to the user
function displayData(obj) {
	const body = $("body");
	let pEl = $("<p>");
	pEl.text(obj.name);
	body.append(pEl);
}

// INUPT id = nutrition & button id = submitNutrition
