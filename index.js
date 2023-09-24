/* form submit operation */
const signUpForm = document.querySelector("#signup-form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#pass");
const confirmPass = document.querySelector("#confirm-pass");
const signupBtn = document.querySelector(".signup");

let userCredentials = {};
// all Existing Users
let existingUsers = [];
// UserData in JSON
let storedUserDataJSON = localStorage.getItem("allUserInfo");

if (storedUserDataJSON) {
    existingUsers = JSON.parse(storedUserDataJSON);
}

// console.log("allusers :", existingUsers);

signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    userCredentials = {
        usernameValue: username.value,
        emailValue: email.value,
        passwordValue: password.value,
        confirmPassValue: confirmPass.value,
    };

    if (validateUser(userCredentials)) {
        let prevUsers = JSON.parse(localStorage.getItem("allUserInfo")) || [];

        // combining current + previous users
        prevUsers.push(userCredentials);

        // storing user credentials in local storage
        localStorage.setItem("allUserInfo", JSON.stringify(prevUsers));
        signUpForm.reset();
    } else {
        console.log("false user credentials..");
    }
});

// function to validate user
function validateUser(user) {
    let { usernameValue, emailValue, passwordValue, confirmPassValue } = user;
    console.log(user);
    let isValid = true;

    // checking input fields
    if (usernameValue === "") {
        isValid = false;
        setInputError(username, "username cannot be blank");
    } else {
        setInputSuccess(username);
    }

    if (emailValue === "") {
        isValid = false;
        setInputError(email, "email cannot be blank");
    } else {
        setInputSuccess(email);
    }

    if (passwordValue === "") {
        isValid = false;
        setInputError(password, "password cannot be blank");
    } else {
        setInputSuccess(password);
    }

    if (confirmPassValue === "") {
        isValid = false;
        setInputError(confirmPass, "confirm password cannot be blank");
    } else if (passwordValue !== confirmPassValue) {
        isValid = false;
        setInputError(
            confirmPass,
            "password and confirm password should be same"
        );
    } else {
        setInputSuccess(confirmPass);
    }
    return isValid;
}

function setInputError(input, message) {
    const small = input.nextElementSibling;
    small.classList.add("error");
    small.innerText = message;
    console.log(small, message);
}
function setInputSuccess(input) {
    const field = input;
    input.style.border = "1.5px solid green";
    input.nextElementSibling.classList.remove("error");
    console.log(field);
}
