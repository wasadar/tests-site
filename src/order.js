export default function order(){   
    let product = document.querySelector("#product").value;
    let description = document.querySelector("#description").innerHTML;
    let email = documet.querySelector("#email").value;
    axios.post("http://localhost:3000/api/order",{product: product, description: description, email: email}).then(function (response) {
        if (response.status === 201) {
            location.href = "http://localhost:3000/";
        } 
        else {
            alert("Wrong data! Please, try again with another input!");
        }
    });
}