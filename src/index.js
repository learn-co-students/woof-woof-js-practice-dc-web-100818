document.addEventListener('DOMContentLoaded', function () {

  dogBar()
  getFetch()
  dogFilterSelector().addEventListener('click',function () {
    filterDog()
  })
})


function dogBar(){
  return document.getElementById('dog-bar')
}

function getFetch() {
  fetch('http://localhost:3000/pups')
  .then( res => res.json())
  .then( data => data.forEach(render))
}

function render(dog) {
  span = document.createElement('span')
  dogBar().appendChild(span)
  span.innerText = dog.name
  span.dataset.id = dog.id

  span.addEventListener('click', function () {
    showDog()
  })
}

function showDog() {
  let dogInfo = document.getElementById('dog-info')

  dogInfo.innerHTML = ''

  let img = document.createElement('img')
  let h2 = document.createElement('h2')
  let button = document.createElement('button')



  // debugger;

  let currentId = event.currentTarget.dataset.id

  button.dataset.id = currentId

  fetch(`http://localhost:3000/pups/${currentId}`)
  .then( res => res.json())
  .then( data => {img.src = data.image
  h2.innerText = data.name
    if (data.isGoodDog === true){
    button.innerText = 'Good dog!'
    }
    else{
      button.innerText = 'Bad dog'
    }
  })

  dogInfo.append(img,h2,button)

  button.addEventListener('click',function(){
    toggle()
  })


}
  function toggle() {

    let dogId = event.currentTarget.dataset.id

    let button = document.querySelector(`button[data-id = "${dogId}"]`)

    let dogGoodness = (event.currentTarget.innerText === "Good dog!") ? {"isGoodDog":false} : {"isGoodDog":true}

    fetch(`http://localhost:3000/pups/${dogId}`, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
      },
      body: JSON.stringify(dogGoodness)

    }).then( res => res.json())
    .then(data => {if (data.isGoodDog) {
       button.innerText = 'Good dog!'
     } else {
       button.innerText = 'Bad dog'
     }
    })

    // this is if you want to render it optimistically, the above is pessemistically


    // if( event.currentTarget.innerText=== "Good dog!"){
    //   event.currentTarget.innerText = 'Bad dog'
    // } else {
    //   event.currentTarget.innerText = 'Good dog!'
    // }
  }


  function dogFilterSelector() {
    return document.querySelector('#good-dog-filter')
  }

  function filterDog() {

    dogBar().innerHTML = ''

    if (event.currentTarget.innerText === "Filter good dogs: OFF"){
        event.currentTarget.innerText = "Filter good dogs: ON"
      fetch('http://localhost:3000/pups')
      .then( res => res.json())
      .then( data => data.filter(d => d.isGoodDog).forEach(render))
    }else {
      event.currentTarget.innerText = "Filter good dogs: OFF"
      getFetch()
    }

  }
