const BASE_URL = "http://localhost:8080";
let tbody = document.querySelector("tbody");
let form = document.querySelector("form");
let allInputs = document.querySelectorAll("input");
let search = document.querySelector(".search");
let arr = [];

async function getData(endpoint) {
  let response = await axios(`${BASE_URL}/${endpoint}`);
  arr = response.data;
  drawTable(response.data);
}

getData("items");

function drawTable(data) {
  tbody.innerHTML = "";
  data.forEach((element) => {
    tbody.innerHTML += `
        <tr>
        <td><img src="${element.photo}" alt=""></td>
        <td>${element.name}</td>
        <td>${element.price}</td>
        <td><button class="delete" onclick=deleteItem("${element.id}",this)>Delete</button></td>
      </tr>
        `;
  });
}

async function deleteItem(id, btn) {
  try {
    if (window.confirm("Are u sure to delete?")) {
      await axios.delete(`${BASE_URL}/items/${id}`);
      btn.closest("tr").remove();
    }
  } catch (error) {
    console.log(error);
  }
}

search.addEventListener("input", function (event) {
  event.preventDefault();
  let filtered = arr.filter((item) => {
    return item.name
      .toLocaleLowerCase()
      .includes(event.target.value.toLocaleLowerCase());
  });
  drawTable(filtered)
});

form.addEventListener("submit",async function(event){
    event.preventDefault()
    try{
        if(allInputs[0].value.trim() && allInputs[1].value.trim()){
            let item={
                name:allInputs[0].value,
                price:allInputs[1].value
            }
            await axios.post(`${BASE_URL}/items`,item)
        }else(window.alert("???"))
    } catch(error){
        console.log(error);
    }
})
