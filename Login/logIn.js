const signupBtn = document.querySelector(".signup");
const signUpLink = document.querySelector(".text span");

// go to signUp page(on button click)
signupBtn.addEventListener("click", () => {
	window.location.assign("../SignUp/signup.html");
});
// go to signUp page(on link click)
signUpLink.addEventListener("click", () => {
	window.location.assign("../SignUp/signup.html");
});
