document.addEventListener('DOMContentLoaded', function() {
  fetchAllDogs()
  createDogElements()
})

// FETCH
function fetchAllDogs() {
  fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => data.forEach(renderDogBar))
}

function fetchDog(e) {
  e.preventDefault()
  let id = e.target.dataset.id
  fetch(`http://localhost:3000/pups/${id}`)
    .then(res => res.json())
    .then(data => renderDog(data))
}

function patchDog(e) {
  let id = e.target.dataset.id
  let obj = {}
  if (e.target.dataset.good === 'false') {
    obj = {isGoodDog: true}
  } else {
    obj = {isGoodDog: false}
  }
  fetch(`http://localhost:3000/pups/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(obj)
  })
    .then(res => res.json())
    .then(data => renderDog(data))
}

// RENDER
function renderDogBar(dog) {
  let bar = document.querySelector('#dog-bar')
  let doggy = document.createElement('span')
  doggy.innerText = dog.name
  doggy.dataset.id = dog.id
  doggy.addEventListener('click', fetchDog)
  bar.appendChild(doggy)
}

function createDogElements() {
  let div = document.querySelector('#dog-info')
  let img = document.createElement('img')
  img.id = 'dog-img'
  let name = document.createElement('h2')
  name.id = 'dog-name'
  let btn = document.createElement('button')
  btn.id = 'dog-btn'
  btn.hidden = true
  btn.addEventListener('click', patchDog)
  div.append(img, name, btn)

}

function renderDog(dog) {
  let img = document.querySelector('#dog-img')
  let name = document.querySelector('#dog-name')
  let btn = document.querySelector('#dog-btn')
  img.src = dog.image
  name.innerText = dog.name
  btn.hidden = false
  btn.dataset.id = dog.id
  btn.dataset.good = dog.isGoodDog
  if (dog.isGoodDog === false) {
    btn.innerText = 'Bad dog'
  } else {
    btn.innerText = 'Good dog'
  }
}
