let products = JSON.parse(localStorage.getItem("products")) || [
  {
    name: "iPhone 14",
    price: 22000000,
    img: "https://via.placeholder.com/200"
  },
  {
    name: "Samsung S23",
    price: 18000000,
    img: "https://via.placeholder.com/200"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function save() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("products", JSON.stringify(products));
}

function renderProducts() {
  let html = "";
  products.forEach((p, index) => {
    html += `
      <div class="product">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>${p.price.toLocaleString()} VND</p>
        <button onclick="addToCart(${index})">Mua</button>
      </div>
    `;
  });
  document.getElementById("product-list").innerHTML = html;
}

function addToCart(index) {
  cart.push(products[index]);
  save();
  renderCart();
}

function renderCart() {
  let html = "";
  cart.forEach(p => {
    html += `<p>${p.name} - ${p.price.toLocaleString()} VND</p>`;
  });
  document.getElementById("cart-items").innerHTML = html;
  document.getElementById("cart-count").innerText = cart.length;
}

function checkout() {
  alert("Thanh toán thành công!");
  cart = [];
  save();
  renderCart();
}

renderProducts();
renderCart();