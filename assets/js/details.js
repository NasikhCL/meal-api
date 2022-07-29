

let detailsContainer = document.getElementById('details-container');



// to take onlt the meal id from the url
let myUrl = window.location.search;
console.log(myUrl)
let urlParams = new URLSearchParams(myUrl);
let mealId = urlParams.get('id')
console.log(mealId);



// api call to fetch the details needed
const getDetails = async(mealId)=>{

try{
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  let data = await res.json()
  // console.log(data)
  showDetails(data);


}catch(err){
  console.log(err)
}


}


// showing the details of the meal 

const showDetails = (data)=>{
  let mealDetailed = `
    <div id="meal-img-container">
          
                <img src="${data.meals[0].strMealThumb}" alt="">
    
            </div>
            <div id="meal-name">
                <h2>${data.meals[0].strMeal} (${data.meals[0].strArea})</h2>
                
            </div>
            <div id="instructions">
                <h5>${data.meals[0].strInstructions}</h5>
                <div id="youtube-button">
                    <a href="${data.meals[0].strYoutube}">
                        <button type="submit"> WATCH </button>
                    </a>
                </div>
            </div>
  `;


detailsContainer.innerHTML = mealDetailed;
  

}


getDetails(mealId);