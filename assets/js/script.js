    
    
    
    // Step1: References to HTML Elements 
    const inputEl = document.getElementById('ingredients');
    const btnEl = document.getElementById('searchBtn');

     //step 3 add API Key
     const apiKey = "8734635d4cfc4d00bb8e0e29263ce8f2"

       //step 4 function to fetch data from API
    function fetchApi(ingredients) {
      const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${apiKey}&number=1`;
     
        //Get Request using Fetch
      fetch(url)
      //we have two methos here. the first methond, it retrieve the respone and convert all the data in json format.
        .then(response => response.json())
        .then(function(data) {
          console.log(data);
        });
    
    };

     //step 2 add and eventlistener 
     btnEl.addEventListener('click', function() {
      const userInput = inputEl.value;
      
      fetchApi(userInput);
    });
