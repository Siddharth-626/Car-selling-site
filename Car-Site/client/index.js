 async function displayCars(){
    try{
       const response = await fetch('http://localhost:2000/car')
       if(!response){
            throw new Error('Network response was not ok');
       }
       const data = await response.json()

     const carList = document.getElementById('car-list');
     carList.innerHTML = '';
     
    // Display cars
    data.forEach(car => {

        const carDiv = document.createElement('div');
        carDiv.className = 'carDiv';
        carDiv.classList.add('car');
        carDiv.innerHTML = `
            <img id = "car-image" src="${car.image}" alt="${car.make} ${car.model}">
            <div  class="car-info">
                <h2>${car.make} ${car.model}</h2>
                <p>Year: ${car.year}</p>
                <p>Price: $${car.price}</p>
                
                <a href = "https://wa.me/91${car.mobile}?text=Hi! i would like to buy your ${car.make} for ${car.price}" id = "car-buy" class = "button">BUY NOW!</a>
            </div>
        `;
        carList.appendChild(carDiv)
    });
    } catch(error){
        console.error('Error fetching data:', error.message);
    }
    
}

const button = document.getElementById('buy-cars');
button.addEventListener('click', function() {
    const form = document.getElementById('sell');
    if(form.innerHTML =''){
        deleteSellInfo();
    }
   displayCars()
  
   
});




function deleteSellInfo(){
    const form = document.getElementById('userForm');
    form.parentNode.removeChild(form);
}
function deleteBuyInfo(){
   const carDiv = document.getElementById('car-list')
   carDiv.parentNode.removeChild(carDiv)
}





// SELL CAR INFO
const sell_button = document.getElementById('sellButton');
sell_button.addEventListener('click',sellcarWindow)

function sellcarWindow(){
    displayForm()
    const  form = document.getElementById('carForm')
    form.addEventListener('submit',addCar)
     
}
function displayForm(){
   const form = document.getElementById('sell');
   form.innerHTML = `
   <form id="carForm">
  <label for="make">Brand:</label>
  <input type="text" id="make" name="make"><br>

  <label for="model">Name:</label>
  <input type="text" id="model" name="model"><br>

  <label for="year">Year:</label>
  <input type="number" id="year" name="year"><br>

  <label for="price">Price:</label>
  <input type="number" id="price" name="price"><br>

  <label for="image">Image URL:</label>
  <input type="text" id="image" name="image"><br>

  <label for="mobile">Mobile:</label>
  <input type="number" id="mobile" name="mobile"><br>

  <button type = "submit">Add Car</button>
</form>

<div id="carList"></div>
   `
};


// GET CAR INFO



async function addCar(e) {
    e.preventDefault();
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    
    const year = parseInt(document.getElementById('year').value);
    const price = parseInt(document.getElementById('price').value);
    const image = document.getElementById('image').value;
    const mobile = document.getElementById('mobile').value;
    ;

    // Create new car object
    const data = { make, model, year, price, image,mobile };
    
    try{
       const response =  await fetch('http://localhost:2000/car',{
         method:"POST",
         headers:{
            'Content-Type': 'application/json',
         },
         body:JSON.stringify(data)
       })
       if(!response){
        throw new Error('Network response was not ok');
       }

       sell_sucess()
    }catch(error){
        console.error('Error fetching data:', error.message);
    }
}
function sell_sucess(){
    const sucess = document.getElementById('carForm');
    sucess.innerHTML = `
    <h3>Car added sucessfully!</h3>
    <p>Thaks for using our site!</p>
    <button id = "buy-car">Buy Cars!</button>
    `
    const button = document.getElementById('buy-car');
    button.addEventListener('click', function() {
        const form = document.getElementById('sell');
        if(form.innerHTML = ''){
            deleteSellInfo();
        }
        displayCars()
        
       
    });
}
