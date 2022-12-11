import setCookie from './set-cookie.js';

export default function signUp(){
    let product = document.querySelector("#product").value;
    let password = document.querySelector("#password").value;
    let email = document.querySelector("#email").value;
    axios.post("http://localhost:3000/api/sign-up",{name: name, email: email, password: password}).then(function (response) {
        if (response.status === 201) {
            setCookie("name",name);
            setCookie("password",password);
            location.href = "http://localhost:3000/";
        } 
        else {
            alert("Wrong data! Please, try again with another input!");
        }
    });
}