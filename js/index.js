//global variables

var signinEmail = document.querySelector("#signinEmail");
var signinPassword = document.querySelector("#signinPassword");
var signinBtn = document.querySelector("#signinBtn");
var signinAlert = document.querySelector("#signinAlert");

var signupName = document.querySelector("#signupName");
var signupEmail = document.querySelector("#signupEmail");
var signupPassword = document.querySelector("#signupPassword");
var signupBtn = document.querySelector("#signupBtn");
var signupAlert = document.querySelector("#signupAlert");

var homeUserName = document.querySelector("#homeUserName");

var usersInfo = [];

if (getinfo() != null) {
    usersInfo = getinfo();
}


//sign up .. calling function

if (signupBtn != null) {  // at sign up page
    signupBtn.addEventListener('click', signup)
}

function signup() {
    var user = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }
    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        signupAlert.innerHTML = `all inputs are required`;
        signupAlert.classList.replace("text-success", "text-danger");
    } else if (emailexist()) {
        signupAlert.innerHTML = `email already exists`;
        signupAlert.classList.replace("text-success", "text-danger");
    } else if (invalidEmail()) {
        signupAlert.innerHTML = `invalid email .. email should username@site.com`;
        signupAlert.classList.replace("text-success", "text-danger");
    } else if (invalidpassward()) {
        signupAlert.innerHTML = `invalid password..password should contain uppercase,lowercase,special chars and numbers`;
        signupAlert.classList.replace("text-success", "text-danger");
    } else {
        signupAlert.innerHTML = `success`;
        signupAlert.classList.replace("text-danger", "text-success");
        usersInfo.push(user);
        storeinfo();
    }
}


function storeinfo() {
    localStorage.setItem("usersInfo", JSON.stringify(usersInfo)); // convert array to string
}

function getinfo() {
    return JSON.parse(localStorage.getItem("usersInfo")); //convert string from localstorage to array
}

//signup validation
function emailexist() {
    for (var i = 0; i < usersInfo.length; i++) {
        if (signupEmail.value == usersInfo[i].email) {
            return true;
        }
    }
    return false;
}

function invalidEmail() {
    var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (regex.test(signupEmail.value) == true) {
        return false;
    } else {
        return true; //invalid
    }
}

function invalidpassward() {
    var regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){3,}$/;
    if (regex.test(signupPassword.value) == true) {
        return false;
    } else {
        return true; //invalid
    }
}



//sign in .. calling function

if (signinBtn != null) { // at sign in page
    signinBtn.addEventListener('click', signin)
}

function signin() {
    if (signinEmail.value == "" || signinPassword.value == "") {
        signinAlert.innerHTML = `all inputs are required`;
    } else if (userexist()) {
        signinAlert.innerHTML = `incorrect email or password`;
    } else {
        location.href = "home.html"; // go to home page
    }
}

function userexist() {
    for (var i = 0; i < usersInfo.length; i++) {
        if (signinEmail.value == usersInfo[i].email && signinPassword.value == usersInfo[i].password) {
            localStorage.setItem("username", JSON.stringify(usersInfo[i].name));
            return false; // exist
        }
    }
    return true; // not exist
}

// home page
if (homeUserName != null) {
    homeUserName.innerHTML = `welcome  ${JSON.parse(localStorage.getItem("username"))} `;
}





