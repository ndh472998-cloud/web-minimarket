
const products = [
    { id: 1, name: 'Chitato', price:2000, img: 'img/Chitato.jpeg'},
    { id: 2, name: 'Choki stick', price:2000, img: 'img/choki stick.jpeg'},
    { id: 3, name: 'popcorn', price:5000, img: 'img/popcorn.jpeg'},
    { id: 4, name: 'sari gandum', price:2000, img: 'img/sari gandum.jpeg'},
    { id: 5, name: 'Choki', price:2000, img: 'img/choki.jpeg'},
];

 // Keranjang belanja
 let cart = [];

 // Fungsi untuk menampilkan daftar produk
 function displayproducts() {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Rp ${product.price}</p>
        <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
     `;
     productsContainer.appendChild(productDiv);
  });
}

// Fungsi untuk menambahkan produk ke keranjang belanja
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Fungsi untuk menampilkan isi keranjang belanja
function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  let totalPrice = 0;
  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} x ${item.quantity} - Rp ${item.price * item.quantity}`;
    cartItemsContainer.appendChild(listItem);
    totalPrice += item.price * item.quantity;
  });

  document.getElementById('total-price').textContent =`Rp${totalPrice}`;
}

// fungsi untuk melakukan checkout
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang anda kosong.');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const payment = prompt(`Total belanja anda Rp ${total}. Masukkan jumlah pembayaran:`);

    if (payment >= total) {
        alert(`Pembayaran berhasil! Kembalian anda: Rp ${payment - total}`);
        cart = [];
        updateCart();
    } else {
        alert('Uang tidak mencukupi.');
    }
}
// event listener untuk tombol checkout
document.getElementById('checkout-btn').addEventListener('click', checkout);

//Tampilkan produk saat halaman di muat
 displayproducts();
  
