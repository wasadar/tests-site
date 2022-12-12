import initTopPanel from "./init-top-panel.js";
import getCookie from './get-cookie.js';

function initIndexPage() {
    let authorized = getCookie("name") != undefined & getCookie("password") != undefined;
    if (!authorized){
        location.href = "http://localhost:3000/sign-in";
    }
    else {
        initTopPanel();
        let name = getCookie("name");
    let password = getCookie("password");
        axios.post("http://localhost:3000/api/orders",{name: name, password: password}).then(function (response){
            let order;
            let index;
            for (index in response.data){
                order = "<div class=\"categories-line\">";
                order += "<input type=\"text\" value=\"" + response.data[index].email + "\" disabled>";
                order += "<input type=\"text\" value=\"" + response.data[index].product + "\" disabled>";
                order += "<textarea disabled>" + response.data[index].description + "</textarea>";
                order += "<input type=\"text\" value=\"" + response.data[index].price + "\" disabled>";
                order += "</div>";
                document.querySelector(".content-box").innerHTML += order;
            }
        });
    }
}

initIndexPage();