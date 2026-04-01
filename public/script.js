let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Lưu dữ liệu
function save() {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ================== HIỂN THỊ SẢN PHẨM ==================
function renderProducts() {
  let list = document.getElementById("product-list");
  if (!list) return;

  list.innerHTML = "";

  products.forEach((p, index) => {
    list.innerHTML += `
      <div class="product">
        <img src="${p.image}" width="150">
        <h3>${p.name}</h3>
        <p>${p.price} đ</p>
        <button onclick="addToCart(${index})">Thêm vào giỏ</button>
      </div>
    `;
  });
}

// ================== GIỎ HÀNG ==================
function addToCart(index) {
  cart.push(products[index]);
  save();
  renderCart();
}

function renderCart() {
  let cartItems = document.getElementById("cart-items");
  let count = document.getElementById("cart-count");
  let total = document.getElementById("cart-total");

  if (!cartItems) return;

  cartItems.innerHTML = "";

  cart.forEach((item, i) => {
    cartItems.innerHTML += `
      <div>
        ${item.name} - ${item.price} đ
        <button onclick="removeFromCart(${i})">Xóa</button>
      </div>
    `;
  });

  if (count) count.innerText = cart.length;
  if (total) total.innerText = cart.length;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  save();
  renderCart();
}

function checkout() {
  alert("Thanh toán thành công!");
  cart = [];
  save();
  renderCart();
}

// ================== ADMIN ==================
function renderAdmin() {
  let list = document.getElementById("admin-list");
  if (!list) return;

  list.innerHTML = "";

  products.forEach((p, index) => {
    list.innerHTML += `
      <li>
        ${p.name} - ${p.price}
        <button onclick="editProduct(${index})">Sửa</button>
        <button onclick="deleteProduct(${index})">Xóa</button>
      </li>
    `;
  });
}

function addProduct() {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let image = document.getElementById("image").value;

  products.push({ name, price, image });
  save();
  renderAdmin();
  renderProducts();
}

function deleteProduct(index) {
  products.splice(index, 1);
  save();
  renderAdmin();
  renderProducts();
}

function editProduct(index) {
  let newName = prompt("Tên mới:", products[index].name);
  let newPrice = prompt("Giá mới:", products[index].price);
  let newImage = prompt("Ảnh mới:", products[index].image);

  products[index] = {
    name: newName,
    price: newPrice,
    image: newImage
  };

  save();
  renderAdmin();
  renderProducts();
}

// ================== INIT ==================
renderProducts();
renderCart();
renderAdmin();