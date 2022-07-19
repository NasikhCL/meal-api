const btn = document.getElementById('get-btn');

// btn.addEventListener('click', fetchFood);


const container =document.getElementById('food-api-conatiner');
const searchBox = document.getElementById('search-box');;

   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   

   
   function fetchFood() {
    container.innerHTML = ``;
    console.log("loaded");
    const textBox = document.getElementById('text-box').value
    console.log(textBox)
    // await
    let xhrRequest = new XMLHttpRequest();
    

    xhrRequest.onload =  function(){
        console.log(xhrRequest.response);
        
        let responseJSON =    JSON.parse(xhrRequest.response);
        if(responseJSON.meals == null){
            showEmpty();
            return;
        }
        // console.log(responseJSON.meals.length);
        displayMeals(responseJSON);
        
        return responseJSON;
        
        
    };
    xhrRequest.open('get',`https://www.themealdb.com/api/json/v1/1/search.php?s=${textBox}`, true);
    xhrRequest.send();
 

    
}



function displayMeals(responseJSON) {

    for(let i = 0;i<responseJSON.meals.length; i++){
        let mealImg = responseJSON.meals[i].strMealThumb;
        let mealName = responseJSON.meals[i].strMeal;
        let mealId =responseJSON.meals[i].idMeal;
        let strInstructions = responseJSON.meals[i].strInstructions;



        let imgTag = document.createElement("img");
        let card =document.createElement("div");
        let nameTag = document.createElement("h4");
        let detailBtn = document.createElement("input");

        detailBtn.setAttribute('type', 'submit');
        detailBtn.setAttribute('value', 'details');


        nameTag.innerText= mealName;
        card.setAttribute('class', 'food-card');
        card.appendChild(imgTag);
        card.appendChild(nameTag);
        card.appendChild(detailBtn);
        
        container.appendChild(card);
        imgTag.setAttribute('src', mealImg);
        imgTag.setAttribute('class',"food-image");



        detailBtn.addEventListener('click',function nextPage(){
            searchBox.innerHTML =``;
            container.innerHTML=``;
            
            let h2 =document.createElement('h2');
            h2.innerText= `${mealName}`;
            searchBox.appendChild(h2);

            let index = responseJSON.meals.map(object => object.idMeal).indexOf(mealId);
            console.log(index);
            let detailsContainer = document.createElement('div');
            detailsContainer.classList.add("meal-details");

            let imgTag = document.createElement('img');

            let InstructionsContainer = document.createElement('div');
            InstructionsContainer.classList.add('Instructions-container')

            

            let Instructions = document.createElement('p');
            Instructions.innerText = strInstructions; 

            InstructionsContainer.appendChild(Instructions);

            let mealImg = responseJSON.meals[index].strMealThumb;
        
            imgTag.setAttribute('src', mealImg);
            imgTag.setAttribute('class',"details-food-image");
            detailsContainer.appendChild(imgTag);
            detailsContainer.appendChild(InstructionsContainer);
            container.appendChild(detailsContainer);

        } );


        // imgTag.setAttribute('height',"250px");
        }

        // function nextPage (){
        //     searchBox.innerHTML =``;
        //     container.innerHTML=``;
        
        //     let index = responseJSON.meals.map(object => object.idMeal).indexOf();
        //     console.log(index);
        //     let detailsContainer = document.createElement('div');
        //     detailsContainer.classList.add("meal-details");
        //     let imgTag = document.createElement('img');
        //     console.log(responseJSON.meals[index].strMealThumb);
        //     let mealImg = responseJSON.meals[index].strMealThumb;
        
        //     imgTag.setAttribute('src', mealImg);
        //     imgTag.setAttribute('class',"details=food-image");
        //     detailsContainer.appendChild(imgTag);
        //     container.appendChild(detailsContainer);
            
            
        
        
            
            
        // }




    
}





function showEmpty(){
    let h1 = document.createElement('h1');
    let text = "No Result Found"
    h1.innerText = text;
    container.appendChild(h1);



}














// myArray.find(x => x.id === '45').foo;



/*

const arr = [{id: 'a'}, {id: 'b'}, {id: 'c'}];

const index = arr.map(object => object.id).indexOf('c');

console.log(index); // 👉️ 2
*/