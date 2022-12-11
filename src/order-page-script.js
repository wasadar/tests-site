import initTopPanel from "./init-top-panel.js";
import order from "./order.js";

function initIndexPage() {
    initTopPanel();
    let id = location.pathname.slice(8);
    axios.get("http://localhost:3000/api/product/" + id).then(function (response){
        document.querySelector("#product").value = response.data.name;
        document.querySelector("#product-description").innerHTML = response.data.description;
        document.querySelector("#price").value = response.data.price;
    });
    document.querySelector("#send").addEventListener("click", () => {
        order();
    });
}

initIndexPage();