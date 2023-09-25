/* for signup form operation */
const signUpForm = document.querySelector("#signup-form");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#pass");
const confirmPassInput = document.querySelector("#confirm-pass");
const signupBtn = document.querySelector(".signup");
// TODO change variable names, username -> userameValue, userameValue -> username(similarly for all)
// all Existing Users
let existingUsers = [];
// UserData in JSON
let storedUserDataJSON = localStorage.getItem("allUserInfo");

if (storedUserDataJSON) {
	existingUsers = JSON.parse(storedUserDataJSON);
}

if (signUpForm) {
	signUpForm.addEventListener("submit", (event) => {
		// console.log(event);

		event.preventDefault();

		console.log(event.target, "event.target");

		const form = new FormData(event.target).entries();

		// for (const [key, value] of form) {
		// 	console.log("key :", key, "value :", value);
		// }
		// console.log({ ...Object.fromEntries(form) });

		const userDetails = { ...Object.fromEntries(form) };

		console.log(userDetails, "userdetails");

		let isUserSignedup = false;

		// if true add user
		if (validateUser(userDetails)) {
			// combining current + previous users
			existingUsers.push({ ...userDetails });

			console.log(existingUsers, "existing users");

			// storing user credentials in local storage
			localStorage.setItem("allUserInfo", JSON.stringify(existingUsers));

			signUpForm.reset();

			isUserSignedup = true;
			// if (isUserSignedup) {
			// 	window.location.href = "./login.html";
			// }
		} else {
			console.log("false user credentials..");
		}
	});
}

// function to validate user
function validateUser(user) {
	let { username, email, password, confirmPassword } = user;
	let isValid = true;

	// checking input fields
	if (!username) {
		isValid = false;
		setInputError(usernameInput, "username cannot be blank");
	} else {
		setInputSuccess(usernameInput);
	}

	if (!email) {
		isValid = false;
		setInputError(emailInput, "email cannot be blank");
	} else {
		// check if email is already registered
		const isEmailRegistered = existingUsers.some((existingUser) => {
			return existingUser.email === email;
		});
		console.log(isEmailRegistered);
		if (isEmailRegistered) {
			isValid = false;
			setInputError(emailInput, "email already registered");
		} else {
			setInputSuccess(emailInput);
		}
	}

	if (!password) {
		isValid = false;
		setInputError(passwordInput, "password cannot be blank");
	} else {
		setInputSuccess(passwordInput);
	}

	if (!confirmPassword) {
		isValid = false;
		setInputError(confirmPassInput, "confirm password cannot be blank");
	} else if (password !== confirmPassword) {
		isValid = false;
		setInputError(
			confirmPassInput,
			"password and confirm password should be same"
		);
	} else {
		setInputSuccess(confirmPassInput);
	}
	console.log(isValid);
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
	if (emailValue) {
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
