/* Navigation between pages */
const signupBtn = document.querySelector(".signup");
const loginBtn = document.querySelector(".login");

// go to signUp page
signupBtn.addEventListener("click", () => {
	window.location.assign("../index.html");
});
//go to login page
loginBtn.addEventListener("click", () => {
	window.location.assign("./Login/login.html");
});
