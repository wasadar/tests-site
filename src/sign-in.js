import setCookie from './set-cookie.js';

export default function signIn(){
    let name = document.querySelector("#name").value;
    let password = document.querySelector("#password").value;
    axios.post("http://localhost:3000/api/sign-in",{name: name, password: password}).then(function (response) {
        if (response.status === 200) {
            setCookie("name",name);
            setCookie("password",password);
            location.href = "http://localhost:3000/";
        } 
        else {
            alert("Wrong data! Please, try again with another input!");
        }
    });
}