const BASE_URL = "http://localhost:8080";
let card = document.querySelector(".card");

let id = new URLSearchParams(window.location.search).get("id");

async function drawCard() {
  let response = await axios(`${BASE_URL}/items/${id}`);
  card.innerHTML = `
        <img src="${response.data.photo}" alt="" />
        <h4>${response.data.name}</h4>
        <p>${response.data.price}</p>
        `;
}

drawCard("items");
