// to retrive the productId from url

const backButton = document.querySelector("#back-btn");
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");
console.log("productId :", productId);

// get product details section
getProductById(productId)
	.then((productData) => productDetailElemet({ ...productData }))
	.catch((error) => console.log(error));

async function getProductById(id) {
	const idURL = `https://dummyjson.com/products/${id}`;
	const idResponse = await fetch(idURL);
	const idData = idResponse.json();
	return idData;
}

const container = document.querySelector(".container");

function productDetailElemet(product) {
	let discountedPrice = Math.floor(
		product.price - (product.price * product.discountPercentage) / 100
	);

	const productDetailCard = document.createElement("div");

	const datailCardContent = `
					<div class="image">
                		<img src="${product.thumbnail}" alt="">
            		</div>
					<div class="info">
						<div class="title">${product.title}</div>
						<div class="description">Description : ${product.description}</div>
						<div class="price">$${discountedPrice}
						<span class="actual-price">$${product.price}</span> 
						<span class="discount">${product.discountPercentage}%</span></div>
						<div class="rating">
							<label for="rating">Ratings : ${product.rating}</label>
							<progress id="rating" value="${product.rating}" max="5"></progress>
						</div>
						<div class="brand">Brand : ${product.brand}</div>
						<div class="category">${product.category}</div>
					</div>`;

	container.classList.add("detail-card");
	container.innerHTML = datailCardContent;
	container.append(productDetailCard);
}

// backButton click event
backButton.addEventListener("click", () => {
	window.history.back();
});
