const favouriteContainer = document.getElementById('favourite-container');
let myFavs = [];


if(localStorage.myFavs){
    localStorage.getItem("myFavs", JSON.stringify(myFavs));
    let parsedJson = JSON.parse(localStorage.myFavs);
    // console.log((parsedJson));
    for(let i = 0; i < parsedJson.length;i++){
        myFavs.push(parsedJson[i]);
    }
    console.log(myFavs);

    
}





const getDetails = async(mealId)=>{

    try{
        console.log(mealId);
      let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      let responseJSON = await res.json()
      // console.log(data)
      showDetails(responseJSON);
    
    
    }catch(err){
      console.log(err)
    }
    
    
    }
    if(!myFavs.length){
        favouriteContainer.innerHTML='<h1>No Favourites To Show :( </h1>'

    }else{
    myFavs.forEach(element => {
        getDetails(element);
        
    });
    }


    const showDetails =  (responseJSON)=>{
        let mealImg = responseJSON.meals[0].strMealThumb;
        let mealName = responseJSON.meals[0].strMeal;
        let mealId = responseJSON.meals[0].idMeal;
        let mealArea = responseJSON.meals[0].strArea;
        let youtubeLink = responseJSON.meals[0].strYoutube; 
        let strInstructions = responseJSON.meals[0].strInstructions;
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
        

        favouriteContainer.appendChild(card);
        imgTag.setAttribute('src', mealImg);
        imgTag.setAttribute('class',"food-image");
    }

  
    favouriteContainer.addEventListener('click', (e)=>{
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
                window.location.reload()
            }
            
        } else if( e.target.classList.contains('fill') ) {
            e.target.classList.remove('fill')
            let mealId = parseInt(e.target.parentNode.parentNode.id);
                console.log(mealId);
                // myFavs.splice(mealId);
                myFavs = myFavs.filter(e => e !== mealId)
                console.log(myFavs);
                localStorage.setItem("myFavs", JSON.stringify(myFavs));
                window.location.reload()

            console.log("removed from fav");
            
        }
    });
    // showFavs();
   