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

const submitLogin = document.querySelector(".submit-login");
const submitSignup = document.querySelector(".submit-signup");
console.log("submitLogin :", submitLogin);
console.log("submitSignup :", submitSignup);
submitSignup.addEventListener("click", function (e) {
	console.log("submit-signup target:", e.target);
});
submitLogin.addEventListener("click", (e) => {
	console.log("submit-login target:", e.target);
});
