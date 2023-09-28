// API URL = "https://dummyjson.com/products";

const allPageLinks = document.querySelectorAll(".link"); // NodeList
let currentPage = 1;
let totalProducts;

// function for fetch all products(10)
async function getProducts(page) {
	const productsPerPage = 10;
	let skip = (page - 1) * productsPerPage;

	const URL = `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`;
	const response = await fetch(URL);

	const data = response.json();
	return data; //promise
}

// to list first ten products(first api call)*****************************
getProducts(currentPage)
	.then((data) => {
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
	.catch((error) => console.log(error));

// function to create pages for pagination*********************************
function createPages(totalProducts, limit) {
	let numberOfPages = Math.ceil(totalProducts / limit);
	console.log("NumberOfPages :", numberOfPages);
}

// api call according to page numbers*************************************
allPageLinks.forEach((link) => {
	link.addEventListener("click", activeLink);
});

// function to keep track of current page*********************************
function activeLink(event) {
	container.innerHTML = "";

	for (const link of allPageLinks) {
		link.classList.remove("active");
	}
	event.target.classList.add("active");

	currentPage = event.target.value;

	// function to fetch products for specific page number*****************
	getProducts(currentPage)
		.then((data) => {
			for (const product of data.products) {
				let discountedPrice = Math.floor(
					product.price -
						(product.price * product.discountPercentage) / 100
				);
				createNewElement({ ...product }, discountedPrice);
			}
		})
		.catch((error) => console.log(error));
}

// create a new product card and append to container***********************
const container = document.querySelector(".container");

function createNewElement(product, discountedPrice) {
	const card = document.createElement("div");
	card.dataset.id = product.id;
	const cardContent = `
            <div class="img">
                <img src="${product.thumbnail}" alt="">
            </div>
            <div class="title">${product.title}</div>
            <div class="price">Discounted Price : $${discountedPrice}</div>
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
