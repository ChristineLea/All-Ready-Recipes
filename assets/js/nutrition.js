// calorie ninjas
// API KEY J4fyAOnwuXGtNt+PjYXPZg==g2QzfMyhXiwtkSjP
const API_KEY = "J4fyAOnwuXGtNt+PjYXPZg==g2QzfMyhXiwtkSjP";
let query = "mashed potatos and sausages";

$.ajax({
	method: "GET",
	url: "https://api.calorieninjas.com/v1/nutrition?query=" + query,
	headers: { "X-Api-Key": API_KEY },
	contentType: "application/json",
	success: function (result) {
        // console.log(result.items[0].name);
        const objData = result.items[0];
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
	},
	error: function ajaxError(jqXHR) {
		console.error("Error: ", jqXHR.responseText);
	},
});
/* 
SAMPLE RETURN DATA
calories
: 
323.2
carbohydrates_total_g
: 
1.4
cholesterol_mg
: 
86
fat_saturated_g
: 
8.7
fat_total_g
: 
26.9
fiber_g
: 
0
name
: 
"sausages"
potassium_mg
: 
150
protein_g
: 
18.6
serving_size_g
: 
100
sodium_mg
: 
808
sugar_g
: 
1.1
*/
