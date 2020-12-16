// fetch("http://localhost:3000/weather?add=nagpur").then((response)=>{
//     response.json().then((data)=>{
//         console.log(data.location)
//         console.log(data.data.temp)

//     })
// })
console.log("h")
const weatherForm = document.querySelector("form")
const search = document.querySelector("input")

const place = document.getElementById("msg1")
const temp = document.getElementById("msg2")

weatherForm.addEventListener("submit", (e)=>{

    e.preventDefault()

    const location = search.value

    place.innerText = "Loading...."
    temp.innerText = ""

    fetch("/weather?add="+ location).then((response)=>{
    response.json().then((data)=>{

        if(data.error){
            place.innerText = data.error
        }
        else{
            place.innerText = data.location
            temp.innerText = data.data.temp + "C"
        }
        })
    })
   
   
})