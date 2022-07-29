
const container =document.getElementById('food-api-conatiner');
const searchBox = document.getElementById('search-box');;
const navFavBtn = document.getElementById('nav-fav-btn');
let detailsContainer = document.getElementById('details-container');



// adding the local storage elements to myFavs array

let myFavs = [];

if(localStorage.myFavs){
    localStorage.getItem("myFavs", JSON.stringify(myFavs));
    let parsedJson = JSON.parse(localStorage.myFavs);
    // console.log((parsedJson));
    for(let i = 0; i <parsedJson.length;i++){
        myFavs.push(parsedJson[i]);
    }
    console.log(myFavs);

    
}


   
// adding even listner to the favourites button in the nav bar and redirecting  it to the favourites page

navFavBtn.addEventListener('click'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           , (e)=>{
    e.preventDefault();
    window.open(`fav.html`);
});
   
   

   
// fetch food function to fetch food from the api upon search keyup
   
function  fetchFood() {
   
    container.innerHTML = ``;
    console.log("loaded");
    const textBox = document.getElementById('text-box').value
    console.log(textBox)

    let xhrRequest = new XMLHttpRequest();
    

    xhrRequest.onload =  function(){
        // console.log(xhrRequest.response);
        
        let responseJSON =   JSON.parse(xhrRequest.response);
        if(responseJSON.meals == null){
            showEmpty();
            return;
        }
        // console.log(responseJSON.meals.length);
        displayMeals(responseJSON);
        // console.log(responseJSON);
        mealArray= responseJSON.meals;
        // console.log(mealArray);
        
        
    };
    xhrRequest.open('get',`https://www.themealdb.com/api/json/v1/1/search.php?s=${textBox}`, true);
    xhrRequest.send();
 

    
}

// to display the meals from the api to the users

function displayMeals(responseJSON) {

    for(let i = 0;i<responseJSON.meals.length; i++){
        let mealImg = responseJSON.meals[i].strMealThumb;
        let mealName = responseJSON.meals[i].strMeal;
        let mealId = responseJSON.meals[i].idMeal;
        let mealArea = responseJSON.meals[i].strArea;
        let youtubeLink = responseJSON.meals[i].strYoutube; 
        let strInstructions = responseJSON.meals[i].strInstructions;
        let mealIdCheck = parseInt(mealId);


        let imgTag = document.createElement("img");
        let card =document.createElement("div");
        let nameTag = document.createElement("h4");
        let detailBtn = document.createElement("button");
        
        let areaTag =document.createElement("h4")
        let addToFav = document.createElement('h3')
        
        card.setAttribute('id', mealId)
        addToFav.setAttribute('class','fav-check');
        
        if(myFavs.includes(mealIdCheck)){
            addToFav.innerHTML = `<span class="material-symbols-outlined fill">
        favorite
        </span>`;
        console.log('fav foundede');

        }else{
            addToFav.innerHTML = `<span class="material-symbols-outlined">
        favorite
        </span>`;

        }

        addToFav.classList.add('add-to-fav-button')
        detailBtn.setAttribute('type', 'submit');
        detailBtn.classList.add('detail-btn');
        detailBtn.innerText = ` View details`;
     
        areaTag.innerText = `(${mealArea})`;
        nameTag.innerText= mealName;
        card.setAttribute('class', 'food-card');
        
        card.appendChild(imgTag);
        card.appendChild(nameTag);
        card.appendChild(areaTag);
        card.appendChild(detailBtn);
        card.appendChild(addToFav);
        

        container.appendChild(card);
        imgTag.setAttribute('src', mealImg);
        imgTag.setAttribute('class',"food-image");



        }

    
}


// in nothing to show for the search 
// no result will desplay
function showEmpty(){
    let h1 = document.createElement('h1');
    let text = "No Result Found"
    h1.innerText = text;
    container.appendChild(h1);

}



// check for a click event in the search result container


container.addEventListener('click', (e)=>{
    if(e.target.className == 'detail-btn'){
        let mealId= e.target.parentNode.id;
        window.open(`details.html?id=${mealId}`)


    }else if (e.target.className == 'material-symbols-outlined') {
        console.log("fav button clicked");
        if(!e.target.classList.contains('fill')){
            console.log("fill added");
            let mealId = parseInt(e.target.parentNode.parentNode.id);
            // console.log(mealId);
            myFavs.push(mealId);

            localStorage.setItem("myFavs", JSON.stringify(myFavs));

            e.target.classList.add('fill');
        }
        
    } else if( e.target.classList.contains('fill') ) {
        e.target.classList.remove('fill')
        let mealId = parseInt(e.target.parentNode.parentNode.id);
            console.log(mealId);
  
            myFavs = myFavs.filter(e => e !== mealId)
            console.log(myFavs);
            localStorage.setItem("myFavs", JSON.stringify(myFavs));

          
        console.log("removed from fav");
        
    }
});
