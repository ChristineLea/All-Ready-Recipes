// // // CALORIE NINJAS API
const API_KEY = "J4fyAOnwuXGtNt+PjYXPZg==g2QzfMyhXiwtkSjP";
const SUBMIT_NUTRITION_BTN = $("#submitNutrition");
let strQuery = "";

// 2. on page load, hide the loading spinner / hide the nutrition info
function init() {
	$("#spinner").hide();
	$("#toggle-display").hide();
}

// ON SUBMIT clear alertUser()
function alertUser() {
	let $form = $("form");
	let $alert = $("<p>").text(
		"No ingredient/s or food item/s were entered. Please try again."
	);

	$form.append($alert);
}

// 3. GET request from Calorie Ninjas API
function ajaxGetApi() {

	let $spinner = $("#spinner");

	$.ajax({
		method: "GET",
		url: "https://api.calorieninjas.com/v1/nutrition?query=" + strQuery,
		headers: { "X-Api-Key": API_KEY },
		contentType: "application/json",
		beforeSend: function () {
			// show loading spinner while getting data from server
			$spinner.show();
		},
		success: function (result) {
			setTimeout(function () {
				// hide loading spinner after 2 secs then display data
				$spinner.hide();
				// if returned data obj is empty - users input did not contain food &/or ingredients
				const objData = result.items;
				if (result.items.length === 0) {
					alertUser();
				} else {
					// if returned obj contains data, sort & display data
					sortObjData(objData);
				}
			}, 2000);
		},
		// if error - log to console
		error: function ajaxError(jqXHR) {
			console.error("Error: ", jqXHR.responseText);
		},
	});
}

// 4. sort/format returned data to an object for each ingredient/food item requested by user input
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

// 5. Dynamically display the nutrition information in an HTML table
function displayData(obj) {
	let $tBody = $("<tbody>");
	let $table = $("<table>");
	let $tableCol = $(".table-col");

	$tBody.append(
		`
		<tr><th>
		Ingredient</th><th>${obj.name}</th></tr>
		<tr><th>
		Serving Size</th><td>${obj.servingSize}</td></tr>
		<tr><th>
		Calories</th><td>${obj.calories}</td></tr>
		<tr><th>
		Protein</th><td>${obj.protein}</td></tr>
		<tr><th>
		Total Fat</th><td>${obj.fat}</td></tr>
		<tr><th>
		Saturated Fat</th><td>${obj.saturatedFat}</td></tr>
		<tr><th>
		Carbohydrates</th><td>${obj.carbohydrates}</td></tr>
		<tr><th>
		Sugar</th><td>${obj.sugar}</td></tr>
		<tr><th>
		Dietary Fibre</th><td>${obj.fiber}</td></tr>
		<tr><th>
		Sodium</th><td>${obj.sodium}</td></tr>
		<tr><th>
		Potassium</th><td>${obj.potassium}</td></tr>
		<tr><th>
		Cholesterol</th><td>${obj.cholesterol}</td></tr>
		`
	);

	$table.append($tBody);
	$tableCol.append($table);

	// Display the fine print under the table
	$("#toggle-display").show();
}

// 2. On click Event to get user input
SUBMIT_NUTRITION_BTN.on("click", function (e) {
	e.preventDefault();

	$("#toggle-display").hide();
	// Remove any <table> node elements from previous searches
	if ($(".table-col").children()) {
		$(".table-col").children().remove();
	}
	// DOM traversal to get input field value
	strQuery = SUBMIT_NUTRITION_BTN.parent()
		.closest(".field")
		.children()
		.eq(0)
		.children()
		.val();

	ajaxGetApi();
	// Clear input field value
	$("#nutrition").val("");
});

// 1. On page load, run init() function
init();