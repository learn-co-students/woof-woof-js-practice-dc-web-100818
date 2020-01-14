document.addEventListener('DOMContentLoaded', function() {
  fetchAllDogs()
  createDogElements()
  document.querySelector('#good-dog-filter').addEventListener('click', dogFilter)
})

// FETCH
function fetchAllDogs(url = 'http://localhost:3000/pups') {
  fetch(url)
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

function dogFilter(e) {
  e.preventDefault()
  let btn = document.querySelector('#good-dog-filter')
  document.querySelector('#dog-bar').innerHTML = ""
  if (btn.innerText === 'Filter good dogs: OFF') {
    btn.innerText = 'Filter good dogs: ON'
    fetchAllDogs('http://localhost:3000/pups?isGoodDog=true')
  } else {
    btn.innerText = 'Filter good dogs: OFF'
    fetchAllDogs()
  }
}
