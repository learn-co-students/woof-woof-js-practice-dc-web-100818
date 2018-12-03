document.addEventListener("DOMContentLoaded", function(){
  fetchDoggos()
})

function getInfoDiv(){
  return document.querySelector("#dog-info");
}

function getDogBar(){
    return document.querySelector("#dog-bar")
}

function showDoggos(dog){
  const dogSpan = document.createElement("span");


  dogSpan.id = dog.id;
  dogSpan.innerText = dog.name

  dogSpan.addEventListener("click", function(){
    renderDoggoInfo(dog)
  })
  getDogBar().appendChild(dogSpan);
}

function fetchDoggos(){
  fetch("http://localhost:3000/pups")
  .then(response => response.json())
  .then(data => data.forEach(dog => showDoggos(dog)))
}


function renderDoggoInfo(dog){
    getInfoDiv().innerHTML = ""
    const dogImg = document.createElement("img")
    const dogHead = document.createElement("h2")
    const dogBtn = document.createElement("button")


    dogImg.src = dog.image

    dogHead.innerText = dog.name

    dogBtn.id = `dog-${dog.id}`
    if(dog.isGoodDog === true){
      dogBtn.innerText = "Good Dog!"
    } else {
      dogBtn.innerText = "Bad Dog!"
    }

    dogBtn.addEventListener("click", function(){
      fetchPatch(dog)
})

    getInfoDiv().appendChild(dogImg)
    getInfoDiv().appendChild(dogHead)
    getInfoDiv().appendChild(dogBtn)
  }


function fetchPatch(dog){
  let dogBtn = document.querySelector(`#dog-${dog.id}`)
  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: "PATCH",
    headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
  },
    body: JSON.stringify({isGoodDog: !dog.isGoodDog})
  })

  .then(response => response.json())
  .then(patchData => {
    dog.isGoodDog = patchData.isGoodDog

    if(dog.isGoodDog === true){
      dogBtn.innerText = "Good Dog!"
  } else {
      dogBtn.innerText = "Bad Dog!"
  }
})
}
