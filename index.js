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

// object to store user credentials
// let credentials = {};
let allUsers = [];
const storedUsers = JSON.parse(localStorage.getItem("allUsersData"));
if (storedUsers) {
	allUsers = storedUsers;
}

console.log("All users : ", allUsers);
// console.log(typeof allUsers);

const signUpForm = document.querySelector("#signup-form");

signUpForm.addEventListener("submit", (event) => {
	event.preventDefault();

	//new user details
	const username = document.getElementById("username").value;
	const email = document.getElementById("email").value;
	const pass = document.getElementById("pass").value;
	const confirmPass = document.getElementById("confirm-pass").value;

	// previous users
	let prevUsers = JSON.parse(localStorage.getItem("allUsersData")) || [];

	// previous + current user
	prevUsers.push({ username, email, pass, confirmPass });

	// storing all users locally
	localStorage.setItem("allUsersData", JSON.stringify(prevUsers));

	// clear input fields
	signUpForm.reset();
});
