document.addEventListener('DOMContentLoaded', () => {
 fetchAllPups()
});

function dogBarDiv() {
  return document.getElementById('dog-bar');
}

function dogInfoDiv() {
  return document.getElementById('dog-info');
}

class Pup {
  constructor(id, name, isGoodDog, image) {
    this.id = id;
    this.name = name;
    this.isGoodDog = isGoodDog;
    this.image = image;
  }

  renderPup() {
    let span = document.createElement('span');
    span.innerText = this.name;
    span.addEventListener('click', () => {
      this.showMore()
    })
    dogBarDiv().appendChild(span);
  }
  
  showMore() {

    dogInfoDiv().innerHTML = "";
    // create img
    let img = document.createElement('img');
    img.src = `${this.image}`
    img.classList.add(`img-${this.id}`)
    // create h2
    let h2 = document.createElement('h2');
    h2.innerText = `${this.name}`;
    h2.classList.add(`h2-${this.id}`)
    // create button
    let button = document.createElement('button')
    if (this.isGoodDog === true) {
      button.innerText = "Good Dog!";
    } else if (this.isGoodDog === false ) {
      button.innerText = "Bad Dog!";
    }
    console.log(button);
    button.addEventListener('click', () => {
      this.updateDog(button)
    })
    
    dogInfoDiv().appendChild(img)
    dogInfoDiv().appendChild(h2)
    dogInfoDiv().appendChild(button)
    
  }

  updateDog(button) {
    if (button.innerText === "Good Dog!") {
      button.innerText = "Bad Dog!"
      this.isGoodDog = false
    } else if(button.innerText === "Bad Dog!") {
      button.innerText = "Good Dog!"
      this.isGoodDog = true
    }

    console.log(button);
    fetch(`http://localhost:3000/pups/${this.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        isGoodDog: this.isGoodDog
      })
    }).then(response => response.json())
  }



}

function fetchAllPups() {
  fetch(`http://localhost:3000/pups`)
    .then(response => response.json())
    .then(data => {
      data.forEach((pup) => {
        // console.log(pup)
        let newDog = new Pup(pup.id, pup.name, pup.isGoodDog, pup.image)
        newDog.renderPup()
      })
    })
}




