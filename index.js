const btn = document.getElementById('get-btn');
btn.addEventListener('click', fetchFood);
const container =document.getElementById('food-api-conatiner');
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   function fetchFood() {
    container.innerHTML = ``;
    console.log("loaded");
    const textBox = document.getElementById('text-box').value
    console.log(textBox)
    // await
    let xhrRequest = new XMLHttpRequest();
    

    xhrRequest.onload =  function(){
        // console.log(xhrRequest.response.length);
        
        let responseJSON =  JSON.parse(xhrRequest.response);
        console.log(responseJSON.meals.length);
    
        

        for(let i = 0;i<responseJSON.meals.length; i++){
        let mealImg = responseJSON.meals[i].strMealThumb;
        let mealName = responseJSON.meals[i].strMeal;

        let imgTag = document.createElement("img");
        let card =document.createElement("div");
        let nameTag = document.createElement("h4");
        nameTag.innerText= mealName;
        card.setAttribute('class', 'food-card');
        card.appendChild(imgTag);
        card.appendChild(nameTag);
        
        container.appendChild(card);
        imgTag.setAttribute('src', mealImg);
        imgTag.setAttribute('class',"food-image");



        card.addEventListener('click', nextPage );


        // imgTag.setAttribute('height',"250px");
        }
        
    };
    xhrRequest.open('get',`https://www.themealdb.com/api/json/v1/1/search.php?s=${textBox}`, true);
    xhrRequest.send();
 

    
}




function nextPage(){
    console.log('next page loaded');
    
}


