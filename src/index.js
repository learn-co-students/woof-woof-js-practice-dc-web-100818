const dogBar = () => document.querySelector("#dog-bar")
const dogInfo = () => document.querySelector("#dog-info")
const filterDogBtn = () => document.querySelector("#good-dog-filter")

document.addEventListener("DOMContentLoaded", () => {
  fetchAllDogsAPI()
  filterDogBtn().addEventListener("click", filterDog)
})

function fetchAllDogsAPI() {
  fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(data => {
      data.forEach(renderSpan)
    })
}

function fetchGoodDogsAPI() {
  fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(data => {
      // debugger
      data.filter((dogObject) => {
        if (dogObject.isGoodDog) {
          renderSpan(dogObject)
        }
      })
    })
}

function patchAPI(id, data) {
  fetch(`http://localhost:3000/pups/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data)
  })
}

function renderSpan(data) {
  let span = document.createElement("span")
  span.innerText = data.name
  span.dataset.id = data.id
  span.dataset.imgUrl = data.image
  span.dataset.isGoodDog = data.isGoodDog
  dogBar().appendChild(span)

  span.addEventListener("click", renderDog)
}

function renderDog(event) {
  destroyChildren(dogInfo())

  let image = document.createElement("img")
  let name = document.createElement("h2")
  let button = document.createElement("button")

  image.src = event.target.dataset.imgUrl
  name.innerText = event.target.innerText
  button.dataset.id = event.target.dataset.id
  button.dataset.isGoodDog = event.target.dataset.isGoodDog

  if (event.target.dataset.isGoodDog == "true") {
    button.innerText = "Good Dog!"
  } else {
    button.innerText = "Bad Dog!"
  }

  button.addEventListener("click", toggle)

  dogInfo().append(image, name, button)
}

function toggle(event) {
  const id = event.target.dataset.id
  const booleanVal = event.target.dataset.isGoodDog === "true"
  const data = {isGoodDog: !booleanVal}

  const button = dogInfo().children[2]
  button.dataset.isGoodDog = data.isGoodDog

  if (data.isGoodDog) {
    button.innerText = "Good Dog!"
  } else {
    button.innerText = "Bad Dog!"
  }
  patchAPI(id, data)
}

function filterDog(event) {

  if (event.target.innerText === "Filter good dogs: OFF") {
    event.target.innerText = "Filter good dogs: ON"
    destroyChildren(dogBar())
    fetchGoodDogsAPI()
  } else {
    event.target.innerText = "Filter good dogs: OFF"
    destroyChildren(dogBar())
    fetchAllDogsAPI()
  }
}

function destroyChildren(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}
