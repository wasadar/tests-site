import getCookie from "./get-cookie.js";
import deleteCookie from "./delete-cookie.js";

export default function initTopPanel(){
    let topPanel = "<div class=\"button\" id=\"main\">Products</div>";
    let authorized = getCookie("name") != undefined & getCookie("password") != undefined;
    if (authorized){
        topPanel += "<div class=\"button\" id=\"add-product\">Add product</div>";
        topPanel += "<div class=\"button\" id=\"orders\">Orders</div>";
        topPanel += "<div class=\"button\" id=\"log-out\">Log out</div>";
    }
    else {
        topPanel += "<div class=\"button\" id=\"sign-in\">Sign in/up</div>";
    }
    document.querySelector('#top-panel').innerHTML = topPanel;
    document.querySelector('#main').addEventListener("click",() => {
        location.href = "http://localhost:3000/";
    });
    if (authorized){
        document.querySelector('#add-product').addEventListener("click",() => {
            location.href = "http://localhost:3000/add-product";
        });
        document.querySelector('#orders').addEventListener("click",() => {
            location.href = "http://localhost:3000/orders";
        });
        document.querySelector('#log-out').addEventListener("click",() => {
            deleteCookie("name");
            deleteCookie("password");
            location.reload();
        });
    }
    else {
        document.querySelector('#sign-in').addEventListener("click",() => {
            location.href = "http://localhost:3000/sign-in";
        });
    }
}