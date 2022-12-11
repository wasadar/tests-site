import initTopPanel from "./init-top-panel.js";

function initIndexPage() {
    initTopPanel();
    axios.get("http://localhost:3000/api/products").then(function (response){
        let product;
        let index;
        for (index in response.data){
            product = "<div class=\"categories-line\" id=\"product" + String(index) + "\">";
            product += "<input type=\"text\" value=\"" + response.data[index].name + "\" disabled>";
            product += "<textarea disabled>" + response.data[index].description + "</textarea>";
            product += "<input type=\"text\" value=\"" + response.data[index].price + "\" disabled>";
            product += "</div>";
            document.querySelector(".content-box").innerHTML += product;
            document.querySelector("#product" + String(index)).addEventListener("click", () => {
                location.href = "http://localhost:3000/product" + String(index);
            });
        }
    });
}

initIndexPage();