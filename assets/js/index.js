const btn = document.getElementById('get-btn');

// btn.addEventListener('click', fetchFood);


const container =document.getElementById('food-api-conatiner');
const searchBox = document.getElementById('search-box');;
const navFavBtn = document.getElementById('nav-fav-btn');
let detailsContainer = document.getElementById('details-container');




let myFavs = [];
// myFavs =  localStorage.myFavs;

if(localStorage.myFavs){
    localStorage.getItem("myFavs", JSON.stringify(myFavs));
    let parsedJson = JSON.parse(localStorage.myFavs);
    // console.log((parsedJson));
    for(let i = 0; i <parsedJson.length;i++){
        myFavs.push(parsedJson[i]);
    }
    console.log(myFavs);

    
}




// function initializeLocalstorage(){
//     let localArray = [];
//     if(localStorage.getItem('favMeals') == null){
//         //create a new localStorage
//         localStorage.setItem('favMeals',JSON.stringify(localArray));
//     }
// }
   
navFavBtn.addEventListener('click'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           , (e)=>{
    e.preventDefault();
    window.open(`fav.html`);
});
   
   

   

   
   function fetchFood() {
   
    container.innerHTML = ``;
    console.log("loaded");
    const textBox = document.getElementById('text-box').value
    console.log(textBox)
    // await
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
        // addToFav.setAttribute('type','submit');
        // addToFav.innerText= `addToFav`
        card.setAttribute('id', mealId)
        addToFav.setAttribute('class','fav-check');
        addToFav.innerHTML = `<span class="material-symbols-outlined">
        favorite
        </span>`;
        if(myFavs.includes(mealIdCheck)){
            addToFav.innerHTML = `<span class="material-symbols-outlined fill">
        favorite
        </span>`;
        console.log('fav foundede');

        }
        
        // addToFav.setAttribute('onchange','addToFav()');


        addToFav.classList.add('add-to-fav-button')
        detailBtn.setAttribute('type', 'submit');
        detailBtn.classList.add('detail-btn');
        detailBtn.innerText = ` View details`;
     



        areaTag.innerText =mealArea;
        nameTag.innerText= mealName;
        card.setAttribute('class', 'food-card');
        

        // imgTag.setAttribute('id', mealId);
        card.appendChild(imgTag);
        card.appendChild(nameTag);
        card.appendChild(areaTag);
        card.appendChild(detailBtn);
        card.appendChild(addToFav);
        

        container.appendChild(card);
        imgTag.setAttribute('src', mealImg);
        imgTag.setAttribute('class',"food-image");

//  end of display meals

        // detailBtn.addEventListener('click',function nextPage(foodId){
        //     console.log(detailBtn.foodId)
        //     // let detailsContainer =document.getElementById('details-container');
        //     // detailsContainer.innerText= value
            // window.open(`details.html`)


            
        // });

        // let detailsOfMeal = () =>{
        //     // detailsContainer.appendChild(detailsOfMeal)

        //     let aTag = document.createElement('a');
        //     aTag.setAttribute('href', youtubeLink)
        //     let homeButton = document.createElement('button');
        //     let divYoutbeButton = document.createElement('div');
        //     divYoutbeButton.setAttribute('class', 'youtube-watch-button-container')

        //     homeButton.setAttribute('type', 'submit')
        //     homeButton.classList.add('youtube-watch-button')
        //     homeButton.innerText= 'watch how to prepare';
        //     aTag.appendChild(homeButton)
        //     divYoutbeButton.appendChild(aTag);
        //     // homeButton.setAttribute('href', youtubeLink)
        //     let h2 =document.createElement('h2');
        //     h2.innerText= `${mealName}`;
        //     searchBox.appendChild(h2);

        //     let index = responseJSON.meals.map(object => object.idMeal).indexOf(mealId);
        //     // console.log(index);
        //     let detailsContainer = document.createElement('div');
        //     detailsContainer.classList.add("meal-details");

        //     let imgTag = document.createElement('img');

        //     let InstructionsContainer = document.createElement('div');
        //     InstructionsContainer.classList.add('Instructions-container')

            

        //     let Instructions = document.createElement('p');
        //     Instructions.innerText = strInstructions; 

        //     InstructionsContainer.appendChild(Instructions);

        //     let mealImg = responseJSON.meals[index].strMealThumb;

        //     imgTag.setAttribute('src', mealImg);
        //     imgTag.setAttribute('id', mealId);
        //     imgTag.setAttribute('class',"details-food-image");
        //     detailsContainer.appendChild(imgTag);
        //     detailsContainer.appendChild(InstructionsContainer);
        //     detailsContainer.appendChild(divYoutbeButton)

        //     detailsContainer.appendChild(detailsContainer);

        //     }

        }



    
}


function showEmpty(){
    let h1 = document.createElement('h1');
    let text = "No Result Found"
    h1.innerText = text;
    container.appendChild(h1);



}

// function showDetailsPage(mealId){
//     // console.log(mealId)
   
   
// }


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
            // myFavs.push(localStorage.myFavs);
            

            e.target.classList.add('fill');
        }
        
    } else if( e.target.classList.contains('fill') ) {
        e.target.classList.remove('fill')
        let mealId = parseInt(e.target.parentNode.parentNode.id);
            console.log(mealId);
            // myFavs.splice(mealId);
            myFavs = myFavs.filter(e => e !== mealId)
            console.log(myFavs);
            localStorage.setItem("myFavs", JSON.stringify(myFavs));

            // propertyExists(localStorage, mealId);
            // parsedJson = JSON.parse(localStorage.myFavs);
            // if(typeof parsedJson[i] == 'undefined') {
                // set the property
                // parsedJson.humidity = 1;
            //   }
            // console.log(parsedJson);
            // myFavs.splice(mealId);
        console.log("removed from fav");
        
    }
});

// console.log(localStorage.myFavs);

// let loadLocalStorage= ()=>{
//     localStorage
//     console.log(localStorage);
// }



// var currentlist = localStorage.getItem("contestId");
// currentlist = currentlist +" "+ id;
// localStorage.setItem("contestId", currentlist);
//calling initializelocalStorage when DOM is Loaded
// document.addEventListener('DOMContentLoaded',loadLocalStorage);