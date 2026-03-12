let addToy = false;
let toydiv = document.getElementById("toy-collection")
let div = document.createElement("div")

document.addEventListener("DOMContentLoaded", () => {

  let form = document.querySelector("form").addEventListener('submit', (e) =>{
    e.preventDefault()
    let name = e.target[0].value
    let picture = e.target[1].value
    addAToy(name, picture)
  })
 
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

      fetch('http://localhost:3000/toys')
      .then(function(response){
        return response.json()
      })
      .then(function(json){
        console.log(json)
        let toys = json
        cardMaker(toys)
      })

      function cardMaker(toys) {
  const toydiv = document.querySelector("#toy-collection")

  for (const toy of toys) {

    let div = document.createElement("div")
    div.className = "card"

    let h2 = document.createElement("h2")
    h2.textContent = toy.name

    let img = document.createElement("img")
    img.className = "toy-avatar"
    img.src = toy.image

    let p = document.createElement("p")
    p.textContent = toy.likes

    let button = document.createElement("button")
    button.className = "like-btn"
    button.style.color = "orange"
    button.style.width = "50px"
    button.innerText = "<3"
    button.id = toy.id
    button.addEventListener("click", updateLikes)

    div.append(h2, img, p, button)

    toydiv.appendChild(div)
  }
}

      function addAToy(name, picture) {
         fetch('http://localhost:3000/toys',{
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             'Accept': 'application/json'
           },
           body: JSON.stringify({
                name: name,
                picture: picture
           })
           })
         .then(function(response){
          return response.json()
         })
         .then(function(json){
          console.log(json)
         })
         }

   
     function updateLikes(e) {
      let p = e.target.parentElement.querySelector('p')
      let likes = p.innerHTML
      likes++
      p.innerHTML = likes
      console.log(likes)
      let button = parseInt(e.target.id) 
      console.log(likes, button)
      patchLikes(likes, button)
      }

      function patchLikes(likes, button) {
        console.log("fetching")
        fetch(`http://localhost:3000/toys/${button}`,{
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              likes: likes
         })
         })
        .then(res => res.json())
        .then(data => console.log(data))
        }

        
      
    
    
});




