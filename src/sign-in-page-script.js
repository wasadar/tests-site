import initTopPanel from './init-top-panel.js';
import signIn from './sign-in.js';
import getCookie from './get-cookie.js';

function initSignInPage() {
    let authorized = getCookie("name") != undefined & getCookie("password") != undefined;
    if (authorized){
        location.href = "http://localhost:3000/";
    }
    else {
        initTopPanel();
        document.querySelector('#send').addEventListener("click", () => {signIn();});
    }
}

initSignInPage();