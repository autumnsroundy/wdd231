// params.js
const products = [
    { id: 1, name: "Product 1", price: 3, image: "https://placehold.co/300" },
    { id: 2, name: "Product 2", price: 5, image: "https://placehold.co/300" },
    { id: 3, name: "Product 3", price: 1, image: "https://placehold.co/300" }
  ];

console.log(window.location);

function getParams(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function productTemplate(product) {
  return `
    <div class="product">
      <h2>${product.name}</h2>
      <img src="${product.image}" alt="${product.name}">
      <p>Price: $${product.price}</p>
    </div>
  `;
}

function getProductDetails() {
  const productId = getParams("productId");
  if (productId) {
    const product = products.find(p => p.id === parseInt(productId));
    if (product) {
      document.querySelector("main").innerHTML += productTemplate(product);
    }
  }
}

document.addEventListener("DOMContentLoaded", getProductDetails);
