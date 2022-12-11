import initTopPanel from './init-top-panel.js';
import signUp from './sign-up.js';
import getCookie from './get-cookie.js';

function initSignUpPage() {
    let authorized = getCookie("name") != undefined & getCookie("password") != undefined;
    if (authorized){
        location.href = "http://localhost:3000/";
    }
    else {
        initTopPanel();
        document.querySelector('#send').addEventListener("click", () => {signUp();});
    }
}

initSignUpPage();