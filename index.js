console.log("start...");
/* Navigation between pages */

setTimeout(() => {
    // Navigate to the new page after a delay of 1 second
    window.location.assign("./index.html");
    console.log("end...");
}, 1000);

// const signupBtn = document.querySelector(".signup");
// const loginBtn = document.querySelector(".login");

// // go to signUp page
// signupBtn.addEventListener("click", () => {
//     window.location.assign("./index.html");
// });
// //go to login page
// loginBtn.addEventListener("click", () => {
//     window.location.assign("./login.html");
// });

// all Existing Users
let existingUsers = [];
// UserData in JSON
let storedUserDataJSON = localStorage.getItem("allUserInfo");

if (storedUserDataJSON) {
    existingUsers = JSON.parse(storedUserDataJSON);
}

console.log("allusers :", existingUsers);

const signUpForm = document.querySelector("#signup-form");

signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // input credentials
    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const pass = document.querySelector("#pass").value;
    const confirmPass = document.querySelector("#confirm-pass").value;

    // getting previous users
    let prevUsers = JSON.parse(localStorage.getItem("allUserInfo")) || [];

    // combining current + previous users
    prevUsers.push({ username, email, pass, confirmPass });

    // storing user credentials in local storage
    localStorage.setItem("allUserInfo", JSON.stringify(prevUsers));

    console.log("user added...");

    // clearing form
    signUpForm.reset();
});

console.log("end...");
