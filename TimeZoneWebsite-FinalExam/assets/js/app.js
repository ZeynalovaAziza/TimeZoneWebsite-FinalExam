const BASE_URL="http://localhost:8080"
let cards=document.querySelector(".items")

async function getData(endpoint){
    let response=await axios(`${BASE_URL}/${endpoint}`)
    drawCard(response.data)

}

getData("items")

function drawCard(data){
    cards.innerHTML=""
    data.forEach(element => {
        cards.innerHTML+=`
        <div class="item">
            <img src="${element.photo}" alt="">
            <h4>${element.name}</h4>
            <p>${element.price}</p>
            <a href="./details.html?id=${element.id}">VIEW</a>
          </div>
        `
    });
}