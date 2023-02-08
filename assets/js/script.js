
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const subtn = document.querySelector(".subtn");
const feedback = document.querySelector(".feedback-container");

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

subtn.addEventListener("click", ()=>{
    feedback.innerHTML = "<h1>We appreciate your feedback</h1>"
});

localStorage.setItem("name","feedback");

// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "OOPS !!! Meal unavailable";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

 // TODO: pass instructions variable into fetch call to translation API
function translateButton(e){
    e.preventDefault();
    if(e.target.classLists.contains("translate")){
        let mealItem = e.e.target.parentElement.parentElement;
        fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/languages?target=fr')
        .then(response => response.json())
        .then(response => mealRecipeModal(dataset.meals));
        
    }
}
// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <button type = "button" class = "recipe-btn translate">
          Read in French
        </button
    `;
    mealDetailsContent.innerHTML = html
    mealDetailsContent.parentElement.classList.add('showRecipe');

    const translateButton = document.querySelector('.translate')

    translateButton.addEventListener('click', function (e) {
     console.log('translate');

      const instructions = meal.strInstructions;

      // TODO: pass instructions variable into fetch call to translation API

      // TODO: update <p> tag in .recipe-instruct <div>hg</div> in the modal with translated text from API
    })
}
