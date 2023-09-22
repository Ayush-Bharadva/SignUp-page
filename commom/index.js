/* Navigation between pages */
const signupBtn = document.querySelector(".signup");
// const signUpLink = document.querySelector(".text .signup-link");
const loginBtn = document.querySelector(".login");
// const loginLink = document.querySelector(".text .login-link");

// go to signUp page
signupBtn.addEventListener("click", () => {
	window.location.assign("../SignUp/signup.html");
});
//go to login page
loginBtn.addEventListener("click", () => {
	window.location.assign("../Login/login.html");
});
