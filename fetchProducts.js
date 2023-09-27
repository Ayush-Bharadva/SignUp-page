// API URL = "https://dummyjson.com/products";

const allPageLinks = document.querySelectorAll(".link"); // NodeList
let currentPage = 1;

// function for fetch products
async function getProducts(page) {
	const productsPerPage = 10;
	let skip = (page - 1) * productsPerPage;

	const URL = `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`;
	const response = await fetch(URL);

	const data = response.json();
	return data; //promise
}

// to list first ten products
getProducts(currentPage)
	.then((data) => {
		for (const product of data.products) {
			let discountedPrice = Math.floor(
				product.price -
					(product.price * product.discountPercentage) / 100
			);

			createNewElement(
				product.thumbnail,
				product.title,
				discountedPrice,
				product.rating,
				product.brand
			);
		}
	})
	.catch((error) => console.log(error));

// pagination on li items
allPageLinks.forEach((link) => {
	link.addEventListener("click", activeLink);
});

// function to keep track of current page
function activeLink(event) {
	container.innerHTML = "";

	for (const link of allPageLinks) {
		link.classList.remove("active");
	}
	event.target.classList.add("active");

	currentPage = event.target.value;

	console.log("currentPage :", currentPage);

	// function to fetch products for specific page
	getProducts(currentPage)
		.then((data) => {
			for (const product of data.products) {
				createNewElement(
					product.thumbnail,
					product.title,
					product.price,
					product.rating,
					product.brand
				);
			}
		})
		.catch((error) => console.log(error));
}

// create a new product card and append to container
const container = document.querySelector(".container");
function createNewElement(thumbnail, title, price, rating, brand) {
	const card = document.createElement("div");
	const cardContent = `
            <div class="img">
                <img src="${thumbnail}" alt="">
            </div>
            <div class="title">${title}</div>
            <div class="price">Discounted Price : $${price}</div>
            <div class="rating">
				<label for="rating">Ratings : ${rating}</label>
				<progress id="rating" value="${rating}" max="5"></progress>
			</div>
            <div class="brand">Brand : ${brand}</div>`;
	card.classList.add("card");
	card.innerHTML = cardContent;
	container.append(card);
}
