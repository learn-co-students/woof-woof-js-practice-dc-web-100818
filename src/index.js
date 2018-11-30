document.addEventListener('DOMContentLoaded', function(e){
  fetchAllPups().then(data => renderDogs(data))
  getFilterButton().addEventListener('click', (e) => {
    fetchAllPups().then(data => showFilteredDogs(data))
    setFilterButtonText();
})})

let filtered = false;

//functions to grab HTML Elements
function getDogBar(){
  return document.querySelector('#dog-bar');
}

function getDogInfoDiv(){
  return document.querySelector('#dog-info');
}

function getFilterButton(){
  return document.querySelector('#good-dog-filter');
}

function fetchAllPups(){
  return fetch('http://localhost:3000/pups')
    .then(response => response.json())
}

function renderDogs(data){
  getDogBar().innerHTML = "";
  data.forEach(pup => {
    pupSpan = document.createElement('span');
    pupSpan.id = `dog-${pup.id}`
    pupSpan.innerText = `${pup.name}`;
    getDogBar().appendChild(pupSpan);
    //adding EventListener to span element
    pupSpan.addEventListener('click', fetchPupInfo)
  })
}

function fetchPupInfo(event){
  showDogId = Number(event.currentTarget.id.split('-')[1]);
  fetch(`http://localhost:3000/pups/${showDogId}`)
    .then(response => response.json())
    .then(data => {
      renderPup(data);
      getAllDogs(data);
    })
}

function getAllDogs(data){
  return data;
}

function renderPup(data){
  getDogInfoDiv().innerHTML = "";
  dogImage = document.createElement('img');
  dogImage.src = data.image;
  dogHeader = document.createElement('h2');
  dogHeader.innerText = data.name;
  dogButton = document.createElement('button');
  dogButton.id = `dog-button-${data.id}`;
  dogButton.dataset.isGoodDog = `${data.isGoodDog}`
  dogButton.addEventListener('click', toggleDogStatus);
  getDogInfoDiv().append(dogImage, dogHeader, dogButton);
  setDogButtonText(data);
}

function setDogButtonText(data){
  thisDogButton = document.querySelector(`#dog-button-${data.id}`)
  if (data.isGoodDog === true){
    thisDogButton.innerText = 'Good Dog!'
    // console.log(data.isGoodDog)
  } else {
    thisDogButton.innerText = 'Bad Dog!'
    // console.log(data.isGoodDog)
  }
}

function toggleDogStatus(event){
  editDogId = Number(event.currentTarget.id.split('-')[2])
  dogStatus = document.querySelector(`#dog-button-${editDogId}`);
  let currentDogStatus = dogStatus.dataset.isGoodDog;
  if (currentDogStatus === "false"){
    currentDogStatus = false;
  } else if (currentDogStatus === "true"){
    currentDogStatus = true;
  }
  data = {
    isGoodDog: !currentDogStatus
  }
  fetch(`http://localhost:3000/pups/${editDogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      setDogButtonText(data);
      dogStatus.dataset.isGoodDog = data.isGoodDog;
    })
}

function showFilteredDogs(data){
  if (filtered === true){
    let filteredDogs = data.filter(pup => pup.isGoodDog === true);
    renderDogs(filteredDogs);
    filtered = !filtered;
    console.log(filtered);
  } else if (filtered === false){
    renderDogs(data);
    filtered = !filtered;
    console.log(filtered);
  }
}

function setFilterButtonText(){
  let filterButton = getFilterButton();
  if (filtered === true){
    filterButton.innerText = ("Filter good dogs: ON")
  } else if (filtered === false){
    filterButton.innerText = ("Filter good dogs: OFF")
  }
}
