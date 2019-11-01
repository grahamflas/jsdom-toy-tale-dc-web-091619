let addToy = false
const toyUrl = 'http://localhost:3000/toys'

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    //This is a toggle that switches the value of `addToy,` which is a global variable set at the top, to whatever it currently isn't
    addToy = !addToy
    if (addToy === true) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  fetchToys();
  form = getToyForm()
  form.addEventListener('submit', addNewToy)
})

function fetchToys(){
  fetch(toyUrl)
    .then(response => response.json())
    .then(toyArray => toyArray.forEach(
      toy => displayToy(toy))
    )
}

function displayToy(toy){
  const toyDiv = document.createElement('div')
  toyDiv.classList.add('card')

  const toyHeader =  document.createElement('h2')
  toyHeader.innerText = toy.name

  const toyImg = document.createElement('img')
  toyImg.classList.add('toy-avatar')
  toyImg.src = toy.image

  const toyPara = document.createElement('p')
  toyPara.innerText = `${toy.likes} likes`

  const toyLikeBtn = document.createElement('button')
  toyLikeBtn.classList.add('like-btn')
  toyLikeBtn.innerText = "♥"
  toyLikeBtn.id = `toy-${toy.id}`
  toyLikeBtn.addEventListener('click', addLikes)


  toyDiv.append(toyHeader, toyImg, toyPara, toyLikeBtn)
  getToyCollection().append(toyDiv)
}

function addNewToy(event){
  event.preventDefault();
  let newToyName = event.target.name.value
  let newToyImgUrl = event.target.image.value
  
  fetch(toyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: newToyName,
      image: newToyImgUrl,
      likes: 0
    })
  })
  .then(response => response.json())
  .then(result => displayToy(result))

  event.target.reset();
}

function addLikes(){
  const toyId = event.target.id.split('-')[1]
  let likes = parseInt(event.target.previousElementSibling.innerText.split(" ")[0])
  likes++

  fetch(`${toyUrl}/${toyId}`), {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: likes
    })
  }
  .then(response => response.json())
  .then(result => updateToyLikes(result))
}

function updateToyLikes(toy){
  const toyButton = 

}

//functions that return DOM nodes
function getToyCollection(){
  return document.getElementById('toy-collection')
}

function getToyForm(){
  return document.querySelector('.add-toy-form')
}

