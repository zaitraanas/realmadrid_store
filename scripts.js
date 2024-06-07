document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, type: 'Jerseys', name: 'Maillot Domicile 2023', price: 90, img: 'jersey1.jpg' },
        { id: 2, type: 'Jerseys', name: 'Maillot Extérieur 2023', price: 90, img: 'jersey2.jpg' },
        { id: 3, type: 'Jerseys', name: 'Maillot Third 2023', price: 90, img: 'jersey3.jpg' },
        { id: 4, type: 'Accessories', name: 'Écharpe Real Madrid', price: 20, img: 'scarf.jpg' },
        { id: 5, type: 'Accessories', name: 'Casquette Real Madrid', price: 25, img: 'cap.jpg' },
        { id: 6, type: 'Accessories', name: 'Sac à dos Real Madrid', price: 40, img: 'backpack.jpg' },
        { id: 7, type: 'Footwear', name: 'Chaussures de Football', price: 120, img: 'shoes1.jpg' },
        { id: 8, type: 'Footwear', name: 'Chaussures de Training', price: 110, img: 'shoes2.jpg' },
        { id: 9, type: 'Footwear', name: 'Chaussons', price: 30, img: 'slippers.jpg' },
        { id: 10, type: 'Footwear', name: 'Baskets', price: 100, img: 'sneakers.jpg' }
    ];

    const productList = document.getElementById('productList');
    const cart = document.getElementById('cart');
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    const toggleCartBtn = document.getElementById('toggleCartBtn');
    const emptyCartBtn = document.getElementById('emptyCartBtn');
    const filters = document.querySelectorAll('.filter');

    let cartData = [];

    function renderProducts() {
        const activeFilters = Array.from(filters).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
        productList.innerHTML = '';
        products.filter(product => activeFilters.includes(product.type)).forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price} €</p>
                <button onclick="addToCart(${product.id})">Ajouter au panier</button>
            `;
            productList.appendChild(productDiv);
        });
    }

    window.addToCart = function (productId) {
        const product = products.find(p => p.id === productId);
        cartData.push(product);
        renderCart();
    };

    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cartData.forEach((product, index) => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `${product.name} - ${product.price} € <button onclick="removeFromCart(${index})">Supprimer</button>`;
            cartItems.appendChild(cartItem);
            total += product.price;
        });
        totalPrice.innerText = total;
    }

    window.removeFromCart = function (index) {
        cartData.splice(index, 1);
        renderCart();
    };

    toggleCartBtn.addEventListener('click', () => {
        cart.classList.toggle('hidden');
    });

    emptyCartBtn.addEventListener('click', () => {
        cartData = [];
        renderCart();
    });

    filters.forEach(checkbox => checkbox.addEventListener('change', renderProducts));

    renderProducts();
});
