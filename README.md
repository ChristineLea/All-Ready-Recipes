# All Ready Recipes Group Project

## Description - user form input feature

The user-form input feature is a form which is presented on the first HTML page that the user can use to enter in the text of the ingredients they have available to use in recipes.
This user data entered into the input form is saved locaclly as a variable for the API Spoonacular to access and render data results for the user on HTML page 2.
The user input form features an additional API (https://api.humorapi.com/jokes/search) which is used to render a food joke to the user before being transferred to second HTML page.

## Features

Once the user inputs their list of ingredients into the user input form, this data is then saved in localstoarge when the 'next'button is click. Once the next button is clicked this presents the user with a random food joke. Once the food joke has been read, the user then clicks the delete button and is taken to the second page HTML where teh Spoonacular API will be used to render the data from the userinput form and display results.

## HomePage Usage

Visit the [deployed webpage](https://christinelea.github.io/All-Ready-Recipes/) to see the live version.

![Screenshot of the webpage](./assets/images/nutrition-info.png)
*Description: Nutrition Ino loading *

![Screenshot of the webpage](./assets/images/result.png)
*Description: Nutrition Result *

# Recipe-Page Usage/Features

Visit the [deployed webpage](https://christinelea.github.io/All-Ready-Recipes/assets/html/recipe.html) to see the live version.

![Screenshot of the webpage](./assets/images/secondPage1.png)
*Description: when the page Load, the title "Dinner Delights" will be shown. followed by Subtitle, Navigation, Ingredient selection, checkbox and find-Recipe button *

![Screenshot of the webpage](./assets/images/secondPage2.png)
*Description: The App utilizes autocompletion to suggest ingredient names to the user as they type in the input field. This feature makes it easier for users to select ingredients without typing the full name manually. Autocompletion is powered by the Spoonacular API, which provides real-time ingredient suggestions based on the user's input. *

![Screenshot of the webpage](./assets/images/secondPage3.png)
*Description:
1. the application collect selected ingredients.
2. It checks the state of the "Recipes based on my available ingredients in my fridge" checkbox.
3. If the checkbox is checked, it indicates that the user wants to search for recipes using only the selected ingredients and ignore other pantry items.
4. the APP determines the ranking and pantry inclusion settings.
5. The App sends a request to the Spoonacular API, passing the selected ingredients, ranking, and pantry inclusion settings.
6. The API responds with based on user preferences.
7. The recipe results are rendered as recipe cards, including the recipe image, title, and a "View Recipe" button.
8. If no recipes are found, a message is displayed indicating that no recipes were found.*

![Screenshot of the webpage](./assets/images/secondPage4.png)
*Description:
1. user can then interact with the recipe cards, click the "View Recipe" button, and view detailed information about each recipe, including its ID, likes, missed ingredient count, unused ingredients, used ingredient count, and instructions.
2. The user can also save their favorite recipes by clicking the "Save" button, which adds the recipe to the local storage.
3. The user can access their favorite recipes by clicking on the "Favorite Recipes" button in the navigation menu.

## Technologies Used
 HTML: Used for structuring the web pages and their elements.
- CSS: Used for styling the application and providing visual enhancements.
- JavaScript: Used for implementing the interactive functionality and making API requests.
- Bulma CSS Framework: Used as a CSS framework to provide a responsive and modern design.
- Spoonacular API: Used for fetching recipe data based on the user's selected ingredients.
- GitHub: Used for hosting the application's repository and managing project files.

## Relevant Files
2. `./assets/html/recipe.html`: The second HTML page that utilizes autocompletion and fetches recipe data from the Spoonacular API based on the user's input on the first page.
3. `./assets/css/recipe.css`: The CSS file containing styles for both HTML pages.
4. `./assets/js/script.js`: The JavaScript file containing the logic and functionality for both HTML pages.
5. `README.md`: The readme file providing an overview and instructions for the application.


## Credits to Contributors
- [Christine Lea](https://github.com/ChristineLea).
- [Baz Rahimi](https://github.com/bazrahimi).
- [Alyssa Pidgeon](https://github.com/AlyssaPidgeon).

## License

The code is released under the MIT License. Feel free to use, modify, and distribute it.
