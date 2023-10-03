// to search products

// const searchInput = document.querySelector("#search-input");
const searchInput = document.getElementById("search-input");
const searchProductContainer = document.querySelector(".container");
const displayedProducts = new Set();

// function to search products by searchString(search-Input)
async function searchProducts(searchString) {
	const searchUrl = `https://dummyjson.com/products/search?q=${searchString}`;
	// const searchProductsUrl = new URL(searchUrl);
	// searchProductsUrl.searchParams.set("q", searchString);
	// console.log(searchProductsUrl);

	try {
		const response = await fetch(searchUrl);
		const data = await response.json();
		const searchedProducts = data.products;
		console.log("searchedProducts :", searchedProducts);

		console.log("searchproductcontainer : ", searchProductContainer);

		displayedProducts.clear();

		for (const product of searchedProducts) {
			if (!displayedProducts.has(product.id)) {
				createSearchProduct({ ...product });
				displayedProducts.add(product.id);
			}
		}
		// return data;
	} catch (error) {
		console.log("error occured :", error);
	}
}

let searchTimeout;

// calling search api on every search input change
searchInput.addEventListener("keypress", (e) => {
	console.log("search Timeout before clearing:", searchTimeout);
	clearTimeout(searchTimeout);
	// console.log(e);
	const searchInputValue = searchInput.value;

	// debouncing api callsi
	searchTimeout = setTimeout(() => {
		console.log("search Timeout :", searchTimeout);
		searchProductContainer.innerHTML = "";
		searchProducts(searchInputValue);
	}, 500);
});

// creating cards of search products

function createSearchProduct(searchProduct) {
	const newCard = document.createElement("div");
	newCard.dataset.id = searchProduct.id;

	let discountedPrice = Math.ceil(
		searchProduct.price -
			(searchProduct.price * searchProduct.discountPercentage) / 100
	);

	const searchCardContent = `
            <div class="img">
                <img src="${searchProduct.thumbnail}" alt="">
            </div>
            <div class="title">${searchProduct.title}</div>
            <div class="price">Discounted Price : $${discountedPrice}<span class="actual-price">$${searchProduct.price}</span> </div>
            <div class="rating">
				<label for="rating">Ratings : ${searchProduct.rating}</label>
				<progress id="rating" value="${searchProduct.rating}" max="5"></progress>
			</div>
            <div class="brand">Brand : ${searchProduct.brand}</div>`;

	newCard.classList.add("card");
	newCard.innerHTML = searchCardContent;
	searchProductContainer.append(newCard);
}
