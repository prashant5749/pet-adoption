const template = document.querySelector("#pet-card-template")
const wrapper = document.createDocumentFragment()

async function petArea(){
    const petPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json")
    const petData = await petPromise.json()
    petData.forEach(pet => {
       const clone = template.content.cloneNode(true)


       clone.querySelector(".pet-card").dataset.species = pet.species
       clone.querySelector("h3").textContent = pet.name
       clone.querySelector(".pet-description").textContent = pet.description
       clone.querySelector(".pet-age").textContent = createAge(pet.birthYear)

       if(!pet.photo)pet.photo = "images/fallback.jpg"
       clone.querySelector(".pet-card-photo img").src = pet.photo
       clone.querySelector(".pet-card-photo img").alt = `A ${pet.species} named ${pet.name}`
       wrapper.appendChild(clone)
    });
    document.querySelector(".list-of-pets").appendChild(wrapper)
}
petArea()
function createAge(birthYear){
    const currentAge = new Date().getFullYear()
     const newA = currentAge - birthYear

     if (newA == 1) return "1 year old"
     if (newA == 0) return "Less than a year old"

     return `${newA} years old`
}

// Pet Filter Button code
const allBtns = document.querySelectorAll(".pet-filter button")
    allBtns.forEach(el => {
    el.addEventListener("click", handleButtonClick)
})

function handleButtonClick(e){
    //remove active class from any and all buttons
allBtns.forEach(el => el.classList.remove("active"))

    //add active class to the specific button that just got clicked

    e.target.classList.add("active")

    //actually filter the pets down below
    const currentFilter = e.target.dataset.filter
    document.querySelectorAll(".pet-card").forEach(element => {
        if(currentFilter == element.dataset.species || currentFilter == "all"){
            element.style.display = "grid"
        } else{
            element.style.display  = "none"
        }

    })
}
