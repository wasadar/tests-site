import getCookie from './get-cookie.js';

export default function addProduct(){
    let product = document.querySelector("#product").value;
    let description = document.querySelector("#description").innerHTML;
    let price = document.querySelector("#price").value;
    let name = getCookie("name");
    let password = getCookie("password");
    axios.post("http://localhost:3000/api/add-product",{name: name, password: password, product: product, description: description, price: price}).then(function (response) {
        if (response.status === 201) {
            location.href = "http://localhost:3000/";
        } 
        else {
            alert("Wrong data! Please, try again with another input!");
        }
    });
}