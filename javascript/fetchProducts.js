// API URL = "https://dummyjson.com/products";

let currentPage = 1;

// function for fetch all products(10)
async function getProducts(pageNumber) {
	const productsPerPage = 10;
	let skip = (pageNumber - 1) * productsPerPage;
	const URL = `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`;

	const response = await fetch(URL);
	const data = response.json();
	return data; //promise
}

// function to create pages for pagination*********************************
function createPages(totalProducts, limit) {
	let numberOfPages = Math.ceil(totalProducts / limit);
	// console.log("total pages created :", numberOfPages);
	const pagination = document.querySelector(".pagination");

	// pagination.innerHTML = "";
	for (let i = 0; i <= numberOfPages + 1; i++) {
		const newLi = document.createElement("li");
		const newButton = document.createElement("button");
		newButton.classList.add("btn");
		newButton.value = i;

		if (i === 0) {
			newButton.textContent = "prev";
		} else if (i === numberOfPages + 1) {
			newButton.textContent = "next";
		} else {
			newButton.textContent = newButton.value;
		}
		newLi.append(newButton);
		pagination.append(newLi);
	}

	const pageButtons = document.querySelectorAll(".btn"); //Nodelist
	pageButtons.forEach((link) => link.addEventListener("click", activeLink));
	pageButtons.forEach((link) =>
		link.addEventListener("keypress", activeLink)
	);

	if (pageButtons.length != 0) {
		pageButtons[1].classList.add("active");
	}
}

// function to keep track of current page*********************************
async function activeLink(event) {
	console.log(event.key);
	const container = document.querySelector(".container");
	container.innerHTML = "";

	const pageButtons = document.querySelectorAll(".btn");
	const totalPages = pageButtons.length - 2;

	if (event.target.textContent === "prev" && currentPage > 1) {
		// console.log("you clicked prev..and currentpage =", currentPage);
		currentPage--;
	} else if (
		event.target.textContent === "next" &&
		currentPage < totalPages
	) {
		// console.log("you clicked next..and currentpage =", currentPage);
		currentPage++;
	} else {
		currentPage = parseInt(event.target.textContent);
	}

	// remove active class from all
	pageButtons.forEach((link) => link.classList.remove("active"));
	pageButtons[currentPage].classList.add("active");

	console.log(currentPage);

	// function to fetch products for specific page number*****************
	try {
		const data = await getProducts(currentPage);
		for (const product of data.products) {
			const discountedPrice = Math.floor(
				product.price -
					(product.price * product.discountPercentage) / 100
			);
			createNewElement({ ...product }, discountedPrice);
		}
	} catch (error) {
		console.log("Error fetching products:", error);
	}
}

// create a new product card and append to container***********************
const container = document.querySelector(".container");

function createNewElement(product, discountedPrice) {
	const card = document.createElement("div");
	card.tabIndex = product.id;
	card.dataset.id = product.id;
	const cardContent = `
            <div class="img">
                <img src="${product.thumbnail}" alt="">
            </div>
            <div class="title">${product.title}</div>
            <div class="price">Discounted Price : $${discountedPrice}<span class="actual-price">$${product.price}</span> </div>
            <div class="rating">
				<label for="rating">Ratings : ${product.rating}</label>
				<progress id="rating" value="${product.rating}" max="5"></progress>
			</div>
            <div class="brand">Brand : ${product.brand}</div>`;

	card.classList.add("card");
	card.innerHTML = cardContent;
	container.append(card);

	// changing page on click of card
	card.addEventListener("click", (e) => {
		const id = e.currentTarget.getAttribute("data-id");
		const currentPageUrl = window.location.href;
		const updatedUrl = new URL(currentPageUrl);

		updatedUrl.searchParams.set("productId", id);
		window.location.href = "detailspage.html" + updatedUrl.search;
	});
}

// to list first ten products(first api call)*****************************
getProducts(currentPage)
	.then((data) => {
		// let totalProducts = data.total;
		let totalProducts = data.total;
		let productsPerPage = 10;

		createPages(totalProducts, productsPerPage);
		for (const product of data.products) {
			let discountedPrice = Math.floor(
				product.price -
					(product.price * product.discountPercentage) / 100
			);
			createNewElement({ ...product }, discountedPrice);
		}
	})
	.catch((error) => console.log("Error fetching initial products:", error));
