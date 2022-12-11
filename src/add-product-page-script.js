import initTopPanel from './init-top-panel.js';
import addProduct from './add-product.js';
import getCookie from './get-cookie.js';

function initAddProductPage(){
    let authorized = getCookie("name") != undefined & getCookie("password") != undefined;
    if (!authorized){
        location.href = "http://localhost:3000/sign-in";
    }
    else {
        initTopPanel();
        document.querySelector('#send').addEventListener("click", () => {addProduct();});
    }
}

initAddProductPage();