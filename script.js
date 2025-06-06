// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === parseInt(productId));
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart.push(product);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== productId);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Event listeners
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    addToCart(e.target.dataset.id);
  }
});

clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
