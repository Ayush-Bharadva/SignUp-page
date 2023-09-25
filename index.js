/* for signup form operation */
const signUpForm = document.querySelector("#signup-form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#pass");
const confirmPass = document.querySelector("#confirm-pass");
const signupBtn = document.querySelector(".signup");
// TODO change variable names, username -> userameValue, userameValue -> username(similarly for all)
let userCredentials = {};
// all Existing Users
let existingUsers = [];
// UserData in JSON
let storedUserDataJSON = localStorage.getItem("allUserInfo");

if (storedUserDataJSON) {
	existingUsers = JSON.parse(storedUserDataJSON);
}

let successfulSignup = false; // Flag to indicate successful signup

if (signUpForm) {
	signUpForm.addEventListener("submit", (event) => {
		event.preventDefault();
		userCredentials = {
			usernameValue: username.value,
			emailValue: email.value,
			passwordValue: password.value,
			confirmPassValue: confirmPass.value,
		};
		let isUserSignedup = false;

		// if true add user
		if (validateUser(userCredentials)) {
			let prevUsers =
				JSON.parse(localStorage.getItem("allUserInfo")) || [];

			// combining current + previous users
			prevUsers.push(userCredentials);

			// storing user credentials in local storage
			localStorage.setItem("allUserInfo", JSON.stringify(prevUsers));
			signUpForm.reset();
			isUserSignedup = true;
			if (isUserSignedup) {
				window.location.href = "./login.html";
			}
		} else {
			console.log("false user credentials..");
		}
	});
}

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
		// check if email is already registered
		const isEmailRegistered = existingUsers.some((existingUser) => {
			return existingUser.emailValue === emailValue;
		});

		if (isEmailRegistered) {
			isValid = false;
			setInputError(email, "email already registered");
		} else {
			setInputSuccess(email);
		}
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
	// console.log(small, message);
}
function setInputSuccess(input) {
	const field = input;
	input.style.border = "1.5px solid green";
	input.nextElementSibling.classList.remove("error");
}

// for login form operations
const loginEmail = document.querySelector(".login-email");
const loginPass = document.querySelector(".login-password");
const loginForm = document.querySelector("#login-form");

let loginCredentials = {};

if (loginForm) {
	loginForm.addEventListener("submit", (event) => {
		event.preventDefault();
		loginCredentials = {
			emailValue: loginEmail.value,
			passwordValue: loginPass.value,
		};
		let isLoggedin = false;
		if (validateLogin(loginCredentials)) {
			loginForm.reset();
			isLoggedin = true;
			if (isLoggedin) {
				window.location.href = "./home.html";
			}
			console.log("logged in successfully");
		} else {
			console.log("didnot logged in");
		}
	});
}

function validateLogin(user) {
	let { emailValue, passwordValue } = user;

	let isValidCredential = true;

	// for email
	if (emailValue === "") {
		isValidCredential = false;
		console.log("email cannot be blank");
		setInputError(loginEmail, "email cannot be blank");
	} else if (
		existingUsers.every((existingUser) => {
			return existingUser.emailValue !== emailValue;
		})
	) {
		isValidCredential = false;
		console.log("email does not exist");
		setInputError(loginEmail, "email does not exist");
	} else {
		isValidCredential = true;
		console.log("login email exists");
		setInputSuccess(loginEmail);
	}

	// for password
	isValiduser = existingUsers.some((existingUser) => {
		return (
			existingUser.emailValue === emailValue &&
			existingUser.passwordValue === passwordValue
		);
	});

	if (passwordValue === "") {
		isValidCredential = false;
		console.log("password cannot be blank");
		setInputError(loginPass, "password cannot be blank");
	} else if (!isValiduser) {
		isValidCredential = false;
		console.log("username and password didnt match");
		setInputError(loginPass, "username and password didnt match");
	} else {
		isValidCredential = true;
		setInputSuccess(loginPass);
		console.log("login user credentials matched");
	}
	return isValidCredential;
}
