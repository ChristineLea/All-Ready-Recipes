// // CALORIE NINJAS API
const API_KEY = "J4fyAOnwuXGtNt+PjYXPZg==g2QzfMyhXiwtkSjP";
const SUBMIT_NUTRITION_BTN = $("#submitNutrition");
let strQuery = "";

// ON SUBMIT clear alertUser()
function alertUser() {
	let $form = $("form");
	let $alert = $("<p>").text(
		"No ingredient/s or food item/s were entered. Please try again.");
	if (bool === true) {
		$form.append($alert);
	}
	if (bool === false) {
		$form.remove($alert);
	}
	return;
}
// GET request
function ajaxGetApi() {
	$.ajax({
		method: "GET",
		url: "https://api.calorieninjas.com/v1/nutrition?query=" + strQuery,
		headers: { "X-Api-Key": API_KEY },
		contentType: "application/json",
		success: function (result) {
			// if returned data obj is empty - users input did not contain food &/or ingredients
			const objData = result.items;
			if (result.items.length === 0) {
				alertUser();
			} else {
				// if returned obj contains data, sort & display data
				sortObjData(objData);
			}
		},
		// if error - log to console
		error: function ajaxError(jqXHR) {
			console.error("Error: ", jqXHR.responseText);
		},
	});
}

// sort/format returned data to an object for each ingredient/food item requested by user input
function sortObjData(objData) {
	for (const item of objData) {
		console.log(item);
		let obj = {
			name: item.name,
			servingSize: item.serving_size_g + "g",
			calories: item.calories,
			protein: item.protein_g + "g",
			sugar: item.sugar_g + "g",
			fiber: item.fiber_g + "g",
			sodium: item.sodium_mg + "mg",
			potassium: item.potassium_mg + "mg",
			cholesterol: item.cholesterol_mg + "mg",
			carbohydrates: item.carbohydrates_total_g + "g",
			fat: item.fat_total_g + "g",
			saturatedFat: item.fat_saturated_g + "g",
		};
		console.log(obj);

		displayData(obj);
	}
}
// test to display/output to the user
function displayData(obj) {
	const $ingredient = $("#ingredient");
	const $serving = $("#serving");
	const $calories = $("#calories");
	const $protein = $("#protein");
	const $fat = $("#fat");
	const $satFat = $("#sat-fat");
	const $carbs = $("#carbs");
	const $sugar = $("#sugar");
	const $fibre = $("#fibre");
	const $sodium = $("#sodium");
	const $potassium = $("#potassium");
	const $cholesterol = $("#cholesterol");

	$ingredient.append(`<th>${obj.name}</th>`);
	$serving.append(`<td>${obj.servingSize}</td>`);
	$calories.append(`<td>${obj.calories}</td>`);
	$protein.append(`<td>${obj.protein}</td>`);
	$fat.append(`<td>${obj.fat}</td>`);
	$satFat.append(`<td>${obj.saturatedFat}</td>`);
	$carbs.append(`<td>${obj.carbohydrates}</td>`);
	$sugar.append(`<td>${obj.sugar}</td>`);
	$fibre.append(`<td>${obj.fiber}</td>`);
	$sodium.append(`<td>${obj.sodium}</td>`);
	$potassium.append(`<td>${obj.potassium}</td>`);
	$cholesterol.append(`<td>${obj.cholesterol}</td>`);
}

SUBMIT_NUTRITION_BTN.on("click", function (e) {
	e.preventDefault();

	strQuery = SUBMIT_NUTRITION_BTN.prev().val();

	ajaxGetApi();
				$("#nutrition").val("");
});
// INUPT id = nutrition & button id = submitNutrition
