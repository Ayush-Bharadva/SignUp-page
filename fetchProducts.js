// API URL = "https://dummyjson.com/products";

const URL = "https://dummyjson.com/products?limit=10";

async function getProducts() {
	const response = await fetch(URL);

	const data = response.json();
	return data; //promise
}

getProducts()
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

// create a new elemet
const container = document.querySelector(".container");
function createNewElement(thumbnail, title, price, rating, brand) {
	const card = document.createElement("div");
	const cardContent = `
            <div class="img">
                <img src="${thumbnail}" alt="">
            </div>
            <div class="title">${title}</div>
            <div class="price">${price}</div>
            <div class="rating">${rating}</div>
            <div class="brand">${brand}</div>`;
	card.classList.add("card");
	card.innerHTML = cardContent;
	container.append(card);
}
