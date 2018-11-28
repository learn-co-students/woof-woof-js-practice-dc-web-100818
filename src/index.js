document.addEventListener("DOMContentLoaded", function(){
  fetchDogs()
  getFilter().addEventListener('click', filterDogs)
})

function getDogBar(){
  return document.querySelector('#dog-bar')
}

function getInfoDiv(){
  return document.querySelector('#dog-info')
}

function getFilter(){
  return document.querySelector('#good-dog-filter')
}

function makeDog(dog){
  let dogSpan = document.createElement('span')
  dogSpan.id = `dog-${dog.id}`
  dogSpan.innerText = dog.name
  dogSpan.addEventListener('click', function(){
    showInfo(dog)
  })
  getDogBar().appendChild(dogSpan)
}

function fetchDogs(){
  fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(json => {
      json.forEach(makeDog)
    })
}

function showInfo(dog){
  getInfoDiv().innerHTML = ""
  let dogName = document.createElement('h2')
  dogName.innerText = dog.name

  let dogImage = document.createElement('img')
  dogImage.src = dog.image

  let dogBtn = document.createElement('button')
  if (dog.isGoodDog === true) {
    dogBtn.innerText = "Good Dog"
  } else {
    dogBtn.innerText = "Bad Dog"
  }

  dogBtn.addEventListener('click', function(){
    fetch(`http://localhost:3000/pups/${dog.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({isGoodDog: !dog.isGoodDog})
    })
      .then(resp => resp.json())
      .then(json => {
        dog.isGoodDog = json.isGoodDog
        if (dog.isGoodDog === true) {
          dogBtn.innerText = "Good Dog"
        } else {
          dogBtn.innerText = "Bad Dog"
        }
      })
  })

  getInfoDiv().appendChild(dogName)
  getInfoDiv().appendChild(dogImage)
  getInfoDiv().appendChild(dogBtn)
}

function filterDogs(event){
  if (event.target.innerText === "Filter good dogs: OFF") {
    getDogBar().innerHTML = ""
    fetch('http://localhost:3000/pups')
      .then(resp => resp.json())
      .then(json => {
        json.forEach(function(dog){
          if (dog.isGoodDog === true){
            makeDog(dog)
          }
        })
        event.target.innerText = "Filter good dogs: ON"
      })
  }
  else if (event.target.innerText === "Filter good dogs: ON"){
    getDogBar().innerHTML = ""
    fetchDogs()
    event.target.innerText = "Filter good dogs: OFF"
  }
}
