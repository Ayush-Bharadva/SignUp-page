/* for signup form operation */
const signUpForm = document.querySelector("#signup-form");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#pass");
const confirmPassInput = document.querySelector("#confirm-pass");
const signupBtn = document.querySelector(".signup");
const loginBtn = document.querySelector(".login");

let existingUsers = [];
// UserData in JSON
let storedUserDataJSON = localStorage.getItem("allUserInfo");

if (storedUserDataJSON) {
	existingUsers = JSON.parse(storedUserDataJSON);
}

if (signUpForm) {
	signUpForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const form = new FormData(event.target).entries();
		const userSubmitDetails = Object.fromEntries(form);
		const userDetails = { ...userSubmitDetails };

		let isUserSignedup = false;

		// if true add user
		if (validateUser(userDetails)) {
			// combining current + previous users
			existingUsers.push({ ...userDetails });

			// storing user credentials in local storage
			localStorage.setItem("allUserInfo", JSON.stringify(existingUsers));
			signUpForm.reset();
			isUserSignedup = true;

			if (isUserSignedup) {
				window.location.href = "./login.html";
			}
			console.log("signed up successfully");
		} else {
			console.log("false user credentials..");
		}
	});
}

// for login form operations
const loginEmailInput = document.querySelector("#login-email");
const loginPasswordInput = document.querySelector("#login-password");
const loginForm = document.querySelector("#login-form");

if (loginForm) {
	loginForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const form = new FormData(event.target);
		const formLoginEntries = Object.fromEntries(form);
		const userloginDetails = { ...formLoginEntries };

		console.log(formLoginEntries);
		let isLoggedin = false;
		if (validateLogin(userloginDetails)) {
			loginForm.reset();
			isLoggedin = true;
			if (isLoggedin) {
				window.location.href = "./homepage.html";
			}
			console.log("logged in successfully");
		} else {
			console.log("didnot logged in");
		}
	});
}

// validate signup credentials
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
	} else if (!isValidPassword(password)) {
		isValid = false;
		// setInputError(passwordInput, "password condition not fullfilled");
	} else {
		setInputSuccess(passwordInput);
		setInputError(passwordInput, "password condition fullfilled");
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
		console.log("both passwords matched");
	}
	return isValid;
}

// function to validate password
function isValidPassword(password) {
	const specialCharacters = [
		"!",
		"@",
		"#",
		"$",
		"%",
		"^",
		"&",
		"*",
		"(",
		")",
		"-",
		"_",
		"+",
		"=",
		"{",
		"}",
		"[",
		"]",
		"|",
		"\\",
		":",
		";",
		"'",
		'"',
		"<",
		">",
		",",
		".",
		"/",
		"?",
	];
	let isPassword = true;
	let hasSpecialChar = specialCharacters.some((spChar) => {
		return password.includes(spChar);
	});
	let hasUpperandLowerCase = true;

	if (password.length < 8 || password.length > 20) {
		isPassword = false;
		// console.log("password length must be between 8 and 20");
		setInputError(
			passwordInput,
			"password length must be between 8 and 20"
		);
	} else if (!hasSpecialChar) {
		isPassword = false;
		// console.log("password must contain special characters");
		setInputError(
			passwordInput,
			"password must contain special characters"
		);
	} else if (true) {
	}
	return isPassword;
}

// validate login credentials
function validateLogin(user) {
	let { email, password } = user;
	let isValidCredential = true;

	// for email
	if (!email) {
		isValidCredential = false;
		console.log("email cannot be blank");
		setInputError(loginEmailInput, "email cannot be blank");
	} else if (
		existingUsers.every((existingUser) => {
			return existingUser.email !== email;
		})
	) {
		isValidCredential = false;
		console.log("email does not exist");
		setInputError(loginEmailInput, "email does not exist");
	} else {
		isValidCredential = true;
		console.log("login email exists");
		setInputSuccess(loginEmailInput);
	}

	// for password
	isValiduser = existingUsers.some((existingUser) => {
		return (
			existingUser.email === email && existingUser.password === password
		);
	});

	if (!password) {
		isValidCredential = false;
		console.log("password cannot be blank");
		setInputError(loginPasswordInput, "password cannot be blank");
	} else if (!isValiduser) {
		isValidCredential = false;
		console.log("username and password didnt match");
		setInputError(loginPasswordInput, "username and password didnt match");
	} else {
		isValidCredential = true;
		setInputSuccess(loginPasswordInput);
		console.log("login user credentials matched");
	}
	return isValidCredential;
}

// function to generate error
function setInputError(input, message) {
	const small = input.nextElementSibling;
	small.classList.add("error");
	small.innerText = message;
}
// function to generate success fields
function setInputSuccess(input) {
	input.style.border = "1.5px solid green";
	input.nextElementSibling.classList.remove("error");
}

// toggle between pages
const currentPageUrl = window.location.href;

if (signupBtn) {
	signupBtn.addEventListener("click", () => {
		if (currentPageUrl.includes("login.html")) {
			window.location.href = "index.html";
		}
	});
}

if (loginBtn) {
	loginBtn.addEventListener("click", () => {
		if (currentPageUrl.includes("index.html")) {
			window.location.href = "login.html";
		}
	});
}
