/* Navigation between pages */
const signupBtn = document.querySelector(".signup");
const loginBtn = document.querySelector(".login");

// go to signUp page
signupBtn.addEventListener("click", () => {
    window.location.assign("./index.html");
});
//go to login page
loginBtn.addEventListener("click", () => {
    window.location.assign("./login.html");
});

/* form submit operation */
const signUpForm = document.querySelector("#signup-form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#pass");
const confirmPass = document.querySelector("#confirm-pass");

// all Existing Users
// let existingUsers = [];
// // UserData in JSON
// let storedUserDataJSON = localStorage.getItem("allUserInfo");

// if (storedUserDataJSON) {
//     existingUsers = JSON.parse(storedUserDataJSON);
// }

// console.log("allusers :", existingUsers);

signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (validateUser()) {
        console.log("true user credentials..");
    } else {
        console.log("false user credentials..");
    }
});

// function to validate user
function validateUser() {
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const confirmPassValue = confirmPass.value;

    // checking input fields
    if (usernameValue === "") {
        setInputError(username, "username cannot be blank");
    } else {
        setInputSuccess(username);
    }

    if (emailValue === "") {
        setInputError(email, "email cannot be blank");
    } else {
        setInputSuccess(email);
    }

    if (passwordValue === "") {
        setInputError(password, "password cannot be blank");
    } else {
        setInputSuccess(password);
    }

    if (confirmPassValue === "") {
        setInputError(confirmPass, "confirm password cannot be blank");
    } else if (passwordValue !== confirmPassValue) {
        setInputError(
            confirmPass,
            "password and confirm password should be same"
        );
    } else {
        setInputSuccess(confirmPass);
    }
}

function setInputError(input, message) {
    console.log(input, message);
}
function setInputSuccess(input) {
    console.log(input, "correct");
}
