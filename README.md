# All Ready Recipes Group Project

## Description - user form input feature

The user-form input feature is a form which is presented on the first HTML page that the user can use to enter in the text of the ingredients they have available to use in recipes.
This user data entered into the input form is saved locaclly as a variable for the API Spoonacular to access and render data results for the user on HTML page 2.
The user input form features an additional API (https://api.humorapi.com/jokes/search) which is used to render a food joke to the user before being transferred to second HTML page.

## Features

Once the user inputs their list of ingredients into the user input form, this data is then saved in localstoarge when the 'next'button is click. Once the next button is clicked this presents the user with a random food joke. Once the food joke has been read, the user then clicks the delete button and is taken to the second page HTML where teh Spoonacular API will be used to render the data from the userinput form and display results.
