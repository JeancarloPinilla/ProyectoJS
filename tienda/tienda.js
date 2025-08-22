
// Variables globales
let products = [];
let filteredProducts = [];
let categories = [];
let cart = [];
let currentFilters = {
    search: '',
    category: '',
    minPrice: null,
    maxPrice: null
};


// Funciones para manejar localStorage del carrito

// Función para guardar el carrito en localStorage
function saveCartToStorage() {
    try {
        localStorage.setItem('fakeStoreCart', JSON.stringify(cart));
        console.log('Carrito guardado en localStorage');
    } catch (error) {
        console.error('Error al guardar carrito en localStorage:', error);
    }
}

// Función para cargar el carrito desde localStorage
function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('fakeStoreCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            console.log('Carrito cargado desde localStorage');
        } else {
            cart = [];
            console.log('No hay carrito guardado, iniciando carrito vacío');
        }
    } catch (error) {
        console.error('Error al cargar carrito desde localStorage:', error);
        cart = []; // En caso de error, inicializar carrito vacío
    }
}

// Función para limpiar el carrito del localStorage
function clearCartFromStorage() {
    try {
        localStorage.removeItem('fakeStoreCart');
        cart = [];
        console.log('Carrito eliminado del localStorage');
    } catch (error) {
        console.error('Error al eliminar carrito del localStorage:', error);
    }
}

// Función para obtener productos de la API
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        products = await response.json();
        filteredProducts = [...products];
        
        // Extraer categorías únicas
        categories = [...new Set(products.map(product => product.category))];
        populateCategories();
        
        renderProducts();
        updateCartCount();
        updateResultsInfo();
        document.getElementById('loading').style.display = 'none';
    } catch (error) {
        console.error('Error al obtener productos:', error);
        document.getElementById('loading').innerHTML = '❌ Error al cargar productos';
    }
}

// Función para poblar las opciones de categoría
function populateCategories() {
    const categorySelects = [
        document.getElementById('categoryFilter'),
        document.getElementById('modalCategoryFilter')
    ];
    
    categorySelects.forEach(select => {
        select.innerHTML = '<option value="">Todas las categorías</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            select.appendChild(option);
        });
    });
}

// Función para renderizar productos
function renderProducts() {
    const container = document.getElementById('productsContainer');
    
    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <div class="no-products-icon">🔍</div>
                <h3>No se encontraron productos</h3>
                <p>Intenta con otros términos de búsqueda o filtros diferentes</p>
            </div>
        `;
        return;
    }
    
    const productsHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.title}" class="product-image" 
                    onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><rect width=%22200%22 height=%22200%22 fill=%22%23f0f0f0%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22>Sin imagen</text></svg>'">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="buy-button" onclick="addToCart(${product.id})">
                🛒 Agregar al Carrito
            </button>
        </div>
    `).join('');
    
    container.innerHTML = productsHTML;
}

// Función para agregar al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartCount();
    showSuccessMessage();
    saveCartToStorage();
}




// Función para actualizar contador del carrito
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// Función para mostrar mensaje de éxito
function showSuccessMessage() {
    const message = document.getElementById('successMessage');
    message.classList.add('show');
    setTimeout(() => {
        message.classList.remove('show');
    }, 2000);
}

// Función para abrir el carrito
function openCart() {
    renderCart();
    document.getElementById('cartModal').style.display = 'block';
}

// Función para cerrar el carrito
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Función para renderizar el carrito
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalContainer = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🛒</div>
                <h3>Tu carrito está vacío</h3>
                <p>¡Agrega algunos productos para comenzar!</p>
            </div>
        `;
        cartTotalContainer.style.display = 'none';
        return;
    }

    const cartHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" 
                    onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2280%22><rect width=%2280%22 height=%2280%22 fill=%22%23f0f0f0%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2212%22>Sin imagen</text></svg>'">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} c/u</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <div style="margin-top: 0.5rem;">
                    <strong>Subtotal: ${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">
                🗑️ Eliminar
            </button>
        </div>
    `).join('');

    cartItemsContainer.innerHTML = cartHTML;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('totalAmount').textContent = total.toFixed(2);
    cartTotalContainer.style.display = 'block';
}

// Función para cambiar cantidad
function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    updateCartCount();
    renderCart();
    saveCartToStorage();
}



// Función para eliminar del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCart();
    saveCartToStorage();
}
// Mostrar modal de Ajustes
function showSettings() {
    const modal = document.getElementById("settingsModal");
    const username = localStorage.getItem("username") || "Invitado";
    document.getElementById("userNameDisplay").textContent = username;
  
    // Cargar datos guardados
    document.getElementById("email").value = localStorage.getItem("email") || "";
    document.getElementById("address").value = localStorage.getItem("address") || "";
  
    modal.style.display = "block";
}
  
  
// Cerrar modal
function closeSettings() {
    document.getElementById("settingsModal").style.display = "none";
}
  
  // Guardar correo y dirección
function saveUserData() {
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
  
    if (!email || !address) {
      alert("⚠️ Debes completar correo y dirección antes de guardar.");
      return;
    }
  
    // Guardar en localStorage
    localStorage.setItem("email", email);
    localStorage.setItem("address", address);
  
    const msg = document.getElementById("purchase-message");
    msg.textContent = "✅ Datos guardados correctamente";
    msg.classList.remove("hidden");
    setTimeout(() => msg.classList.add("show"), 10);
  
    setTimeout(() => {
      msg.classList.remove("show");
      setTimeout(() => msg.classList.add("hidden"), 500);
    }, 2000);
}
  
  
  
// Cerrar sesión
function logout() {
    localStorage.clear();
    window.location.href = "../index.html";
}
  
// Modificar el checkout para validar datos
function processCheckout() {
    if (cart.length === 0) return;
  
    const email = localStorage.getItem("email");
    const address = localStorage.getItem("address");
  
    if (!email || !address) {
      alert("⚠️ Debes ingresar y guardar correo y dirección en Ajustes antes de comprar.");
      showSettings(); // Abre ajustes para que el usuario complete
      return;
    }
  
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
    cart = [];
    updateCartCount();
    renderCart();
    closeCart();
    clearCartFromStorage();
  
    const messageBox = document.getElementById("purchase-message");
    messageBox.textContent = "✅ ¡Compra realizada con éxito!";
    messageBox.classList.remove("hidden");
    setTimeout(() => messageBox.classList.add("show"), 10);
  
    setTimeout(() => {
      messageBox.classList.remove("show");
      setTimeout(() => messageBox.classList.add("hidden"), 500);
    }, 3000);
}
  
  
  

// Función para mostrar confirmación de compra
function showPurchaseConfirmation() {
    const message = document.getElementById('successMessage');
    message.innerHTML = '🎉 ¡Compra realizada con éxito!';
    message.classList.add('show');
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            message.innerHTML = '✅ Producto agregado al carrito';
        }, 300);
    }, 3000);
}

// Funciones de filtrado
function filterProducts() {
    filteredProducts = products.filter(product => {
        const matchesSearch = !currentFilters.search || 
            product.title.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
            product.description.toLowerCase().includes(currentFilters.search.toLowerCase());
        
        const matchesCategory = !currentFilters.category || 
            product.category === currentFilters.category;
        
        const matchesMinPrice = currentFilters.minPrice === null || 
            product.price >= currentFilters.minPrice;
        
        const matchesMaxPrice = currentFilters.maxPrice === null || 
            product.price <= currentFilters.maxPrice;
        
        return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });
    
    renderProducts();
    updateResultsInfo();
}

function updateResultsInfo() {
    const resultsInfo = document.getElementById('resultsInfo');
    const total = products.length;
    const filtered = filteredProducts.length;
    
    if (filtered === total) {
        resultsInfo.textContent = `Mostrando ${total} productos`;
    } else {
        resultsInfo.textContent = `Mostrando ${filtered} de ${total} productos`;
    }
}

function clearBasicFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    currentFilters = { search: '', category: '', minPrice: null, maxPrice: null };
    filterProducts();
}

function applyAdvancedFilters() {
    const searchTerm = document.getElementById('modalSearchInput').value;
    const category = document.getElementById('modalCategoryFilter').value;
    const minPrice = parseFloat(document.getElementById('minPrice').value) || null;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || null;
    
    currentFilters = { search: searchTerm, category, minPrice, maxPrice };
    
    // Sincronizar con filtros básicos
    document.getElementById('searchInput').value = searchTerm;
    document.getElementById('categoryFilter').value = category;
    
    filterProducts();
    closeSearchModal();
}

function clearAllFilters() {
    // Limpiar todos los campos
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('modalSearchInput').value = '';
    document.getElementById('modalCategoryFilter').value = '';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    
    currentFilters = { search: '', category: '', minPrice: null, maxPrice: null };
    filterProducts();
}

// Funciones de navegación
function setActiveNav(index) {
    document.querySelectorAll('.nav-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

function showStore() {
    setActiveNav(0);
    clearAllFilters();
}


function openSearchModal() {
    setActiveNav(3);
    
    // Sincronizar valores del modal con filtros actuales
    document.getElementById('modalSearchInput').value = currentFilters.search;
    document.getElementById('modalCategoryFilter').value = currentFilters.category;
    document.getElementById('minPrice').value = currentFilters.minPrice || '';
    document.getElementById('maxPrice').value = currentFilters.maxPrice || '';
    
    document.getElementById('searchModal').style.display = 'block';
}

function closeSearchModal() {
    document.getElementById('searchModal').style.display = 'none';
    setActiveNav(0); // Volver a tienda
}

// Cerrar modales al hacer click fuera
window.onclick = function(event) {
    const cartModal = document.getElementById('cartModal');
    const searchModal = document.getElementById('searchModal');
    
    if (event.target === cartModal) {
        closeCart();
    }
    if (event.target === searchModal) {
        closeSearchModal();
    }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    fetchProducts();
    
    // Event listeners para filtros básicos en tiempo real
    document.getElementById('searchInput').addEventListener('input', function() {
        currentFilters.search = this.value;
        filterProducts();
    });
    
    document.getElementById('categoryFilter').addEventListener('change', function() {
        currentFilters.category = this.value;
        filterProducts();
    });
    
    // Event listener para cerrar modal con Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeCart();
            closeSearchModal();
        }
    });
    loadCartFromStorage();
});