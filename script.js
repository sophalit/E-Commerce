/**
 * Technology Shop Product Catalogue - Vanilla JavaScript Logic
 * Features:
 * - Product Database (12 Sample Tech Products)
 * - Synchronized Multi-Criteria Filtering (Search + Category + Max Price)
 * - Sorting Options (Price Low->High, Price High->Low, Name A->Z, Default)
 * - Cart Management (Add, Quantity increment/decrement, Remove item, Clear cart)
 * - Total Units & Total Price Computation
 * - Dynamic Empty States (Empty Products & Empty Cart)
 * - Instructor Lesson & Exercises Modal
 */

// 1. Data Store: 12 Sample Tech Products
const PRODUCTS_DATA = [
  {
    id: 1,
    name: "UltraBook Pro X14",
    nameKh: "កុំព្យូទ័រយួរដៃ UltraBook Pro X14",
    category: "laptops",
    categoryKh: "កុំព្យូទ័រយួរដៃ",
    price: 1299,
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80",
    specs: "បន្ទះឈីប M3 Pro, RAM 16GB, អង្គផ្ទុក SSD 512GB"
  },
  {
    id: 2,
    name: "Galaxy Prime 5G Flagship",
    nameKh: "ស្មាតហ្វូន Galaxy Prime 5G",
    category: "smartphones",
    categoryKh: "ស្មាតហ្វូន",
    price: 899,
    rating: 4.8,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
    specs: "អេក្រង់ AMOLED 120Hz, 256GB, កាមេរ៉ា 50MP OIS"
  },
  {
    id: 3,
    name: "Studio ANC Wireless Headphone",
    nameKh: "កាសស្ដាប់ត្រចៀក Studio ANC",
    category: "audio",
    categoryKh: "ឧបករណ៍សំឡេង",
    price: 249,
    rating: 4.7,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    specs: "កាត់បន្ថយសំឡេងរំខានសកម្ម (ANC), ថ្មកាន់បាន 40 ម៉ោង"
  },
  {
    id: 4,
    name: "Titanium Smart Watch Series 8",
    nameKh: "នាឡិកាឆ្លាតវៃ Titanium Series 8",
    category: "wearables",
    categoryKh: "ឧបករណ៍ពាក់ឆ្លាតវៃ",
    price: 349,
    rating: 4.6,
    reviews: 84,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    specs: "វាស់ចង្វាក់បេះដូង និងអុកស៊ីសែន, GPS, ធន់នឹងទឹក 50m"
  },
  {
    id: 5,
    name: "RGB Wireless Mechanical Keyboard",
    nameKh: "ក្ដារចុចមេកានិកឥតខ្សែ RGB",
    category: "accessories",
    categoryKh: "គ្រឿងសម្ភារៈ",
    price: 119,
    rating: 4.9,
    reviews: 340,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
    specs: "ស្វីត Red Switch សម្លេងស្រាល, Bluetooth 5.2, ភ្លើង RGB"
  },
  {
    id: 6,
    name: "Gaming Laptop Aero RTX 4070",
    nameKh: "កុំព្យូទ័រហ្គេមមីង Aero 16",
    category: "laptops",
    categoryKh: "កុំព្យូទ័រយួរដៃ",
    price: 1650,
    rating: 4.9,
    reviews: 72,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80",
    specs: "VGA RTX 4070 8GB, Intel i9 14th Gen, RAM 32GB"
  },
  {
    id: 7,
    name: "Horizon Neo Smartphone",
    nameKh: "ស្មាតហ្វូន Horizon Neo 128GB",
    category: "smartphones",
    categoryKh: "ស្មាតហ្វូន",
    price: 549,
    rating: 4.5,
    reviews: 115,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&auto=format&fit=crop&q=80",
    specs: "អេក្រង់ 6.7 អ៊ីញ OLED, សាកថ្មលឿន 67W Turbo Charge"
  },
  {
    id: 8,
    name: "True Wireless Earbuds Pro",
    nameKh: "កាសប៊្លូធូសឥតខ្សែ Earbuds Pro",
    category: "audio",
    categoryKh: "ឧបករណ៍សំឡេង",
    price: 129,
    rating: 4.7,
    reviews: 160,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80",
    specs: "សម្លេង Spatial Audio 3D, ប្រអប់សាកថ្មឥតខ្សែ Qi"
  },
  {
    id: 9,
    name: "Ergonomic Silent Wireless Mouse",
    nameKh: "កណ្ដុរឥតខ្សែ Ergonomic Silent",
    category: "accessories",
    categoryKh: "គ្រឿងសម្ភារៈ",
    price: 45,
    rating: 4.8,
    reviews: 290,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
    specs: "សេនស័រ 4000 DPI, ចុចស្ងាត់គ្មានសំឡេង, ថ្មកាន់ 12 ខែ"
  },
  {
    id: 10,
    name: "Fitness Tracker Band Active",
    nameKh: "ខ្សែដៃសុខភាព Smart Band",
    category: "wearables",
    categoryKh: "ឧបករណ៍ពាក់ឆ្លាតវៃ",
    price: 59,
    rating: 4.4,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&auto=format&fit=crop&q=80",
    specs: "តាមដានដំណេក និងការហាត់ប្រាណ, ថ្មកាន់ 14 ថ្ងៃ, SpO2"
  },
  {
    id: 11,
    name: "Portable Bluetooth Speaker 360",
    nameKh: "បាសប៊្លូធូសចល័ត 360 ដឺក្រេ",
    category: "audio",
    categoryKh: "ឧបករណ៍សំឡេង",
    price: 89,
    rating: 4.6,
    reviews: 140,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80",
    specs: "បាសបុកធ្ងន់ Deep Bass, ការពារទឹកកម្រិត IPX7"
  },
  {
    id: 12,
    name: "7-in-1 Aluminum USB-C Hub Dock",
    nameKh: "ឧបករណ៍ភ្ជាប់ 7-in-1 USB-C Hub",
    category: "accessories",
    categoryKh: "គ្រឿងសម្ភារៈ",
    price: 39,
    rating: 4.8,
    reviews: 175,
    image: "https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=600&auto=format&fit=crop&q=80",
    specs: "ផត 4K HDMI, បញ្ចូលភ្លើង 100W PD, USB 3.0 x3, SD Card"
  }
];

// 2. State Management
let appState = {
  searchQuery: "",
  selectedCategory: "all",
  maxPrice: 2000,
  sortOption: "default",
  cart: [] // Array of { product: {...}, quantity: number }
};

// 3. DOM Elements
const searchInput = document.getElementById("searchInput");
const searchClearBtn = document.getElementById("searchClearBtn");
const categoryInputs = document.querySelectorAll('input[name="categoryFilter"]');
const priceRangeInput = document.getElementById("priceRangeInput");
const priceDisplay = document.getElementById("priceDisplay");
const sortSelect = document.getElementById("sortSelect");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");
const productGrid = document.getElementById("productGrid");
const resultsCountEl = document.getElementById("resultsCount");
const totalCatalogueCountEl = document.getElementById("totalCatalogueCount");

// Cart Elements
const cartToggleBtn = document.getElementById("cartToggleBtn");
const cartCounterEl = document.getElementById("cartCounter");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsBody = document.getElementById("cartItemsBody");
const cartSubtotalUnits = document.getElementById("cartSubtotalUnits");
const cartTotalPriceEl = document.getElementById("cartTotalPrice");
const clearCartBtn = document.getElementById("clearCartBtn");
const demoCheckoutBtn = document.getElementById("demoCheckoutBtn");

// Instructor Guide Elements
const openGuideBtn = document.getElementById("openGuideBtn");
const instructorModalOverlay = document.getElementById("instructorModalOverlay");
const closeGuideBtn = document.getElementById("closeGuideBtn");

// 4. Utility Formatting
function formatPrice(amount) {
  return "$" + Number(amount).toLocaleString();
}

// 5. Filter & Sort Execution Pipeline
function getFilteredAndSortedProducts() {
  const query = appState.searchQuery.trim().toLowerCase();

  // 1. Filter
  let filtered = PRODUCTS_DATA.filter((product) => {
    // Search filter (English name, Khmer name, specs)
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.nameKh.toLowerCase().includes(query) ||
      product.specs.toLowerCase().includes(query);

    // Category filter
    const matchesCategory =
      appState.selectedCategory === "all" ||
      product.category === appState.selectedCategory;

    // Price filter
    const matchesPrice = product.price <= appState.maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // 2. Sort
  switch (appState.sortOption) {
    case "price-low-high":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high-low":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "name-az":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "default":
    default:
      filtered.sort((a, b) => a.id - b.id);
      break;
  }

  return filtered;
}

// 6. Render Product Grid
function renderProducts() {
  const products = getFilteredAndSortedProducts();

  // Update Toolbar Result Count
  resultsCountEl.textContent = products.length;
  if (totalCatalogueCountEl) {
    totalCatalogueCountEl.textContent = PRODUCTS_DATA.length;
  }

  // Clear Existing Items
  productGrid.innerHTML = "";

  // Handle Empty State
  if (products.length === 0) {
    const emptyHtml = `
      <div class="empty-results-box" id="emptyResultsBox">
        <div class="empty-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="8.01"></line>
            <line x1="11" y1="12" x2="11" y2="14"></line>
          </svg>
        </div>
        <h3 class="empty-title">រកមិនឃើញផលិតផលដែលត្រូវគ្នាទេ</h3>
        <p class="empty-desc">សូមសាកល្បងផ្លាស់ប្ដូរពាក្យស្វែងរក ជ្រើសរើសប្រភេទផ្សេង ឬបង្កើនកម្រិតតម្លៃអតិបរមា។</p>
        <button type="button" class="btn-demo-checkout" id="emptyResetBtn" style="max-width: 200px;">
          កំណត់តម្រងឡើងវិញ
        </button>
      </div>
    `;
    productGrid.innerHTML = emptyHtml;

    document.getElementById("emptyResetBtn")?.addEventListener("click", resetFilters);
    return;
  }

  // Render Product Cards (Nested Grid)
  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.id = `product-card-${product.id}`;
    card.setAttribute("data-product-id", product.id);

    card.innerHTML = `
      <!-- Nested Grid Row 1: Image & Demo Flag -->
      <div class="card-media-grid">
        <img 
          src="${product.image}" 
          alt="${product.nameKh}" 
          class="card-img" 
          loading="lazy"
          referrerpolicy="no-referrer"
        />
        <span class="sample-flag">គំរូ Tech</span>
      </div>

      <!-- Nested Grid Row 2: Category & Rating -->
      <div class="card-meta-row">
        <span class="card-category-badge">${product.categoryKh}</span>
        <div class="card-rating" title="ពិន្ទុ ${product.rating} / 5">
          <span>★</span>
          <span>${product.rating}</span>
          <span style="color: #94a3b8; font-weight: normal;">(${product.reviews})</span>
        </div>
      </div>

      <!-- Nested Grid Row 3: Product Name & Specs -->
      <div class="card-info-wrap">
        <h3 class="card-title">${product.nameKh}</h3>
        <p class="card-specs">${product.specs}</p>
      </div>

      <!-- Nested Grid Row 4: Sample Price -->
      <div class="card-price-row">
        <span class="price-label-small">តម្លៃគំរូ</span>
        <span class="card-price-value">${formatPrice(product.price)}</span>
      </div>

      <!-- Nested Grid Row 5: Add to Cart Button -->
      <button 
        type="button" 
        class="btn-add-cart" 
        id="btn-add-${product.id}"
        data-id="${product.id}"
        aria-label="បន្ថែម ${product.nameKh} ទៅក្នុងកន្ត្រក"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span>បន្ថែមទៅកន្ត្រក</span>
      </button>
    `;

    // Attach click listener for Add to Cart
    const addBtn = card.querySelector(".btn-add-cart");
    addBtn.addEventListener("click", () => {
      addToCart(product.id, addBtn);
    });

    productGrid.appendChild(card);
  });
}

// 7. Cart Operations
function addToCart(productId, buttonEl = null) {
  const product = PRODUCTS_DATA.find((p) => p.id === productId);
  if (!product) return;

  const existingIndex = appState.cart.findIndex((item) => item.product.id === productId);
  if (existingIndex > -1) {
    appState.cart[existingIndex].quantity += 1;
  } else {
    appState.cart.push({
      product: product,
      quantity: 1
    });
  }

  // Visual feedback on button
  if (buttonEl) {
    buttonEl.classList.add("added");
    const originalHtml = buttonEl.innerHTML;
    buttonEl.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>បានបន្ថែម!</span>
    `;
    setTimeout(() => {
      buttonEl.classList.remove("added");
      buttonEl.innerHTML = originalHtml;
    }, 1000);
  }

  updateCartView();
}

function updateCartItemQty(productId, delta) {
  const index = appState.cart.findIndex((item) => item.product.id === productId);
  if (index > -1) {
    appState.cart[index].quantity += delta;
    if (appState.cart[index].quantity <= 0) {
      appState.cart.splice(index, 1);
    }
    updateCartView();
  }
}

function removeCartItem(productId) {
  appState.cart = appState.cart.filter((item) => item.product.id !== productId);
  updateCartView();
}

function clearCart() {
  appState.cart = [];
  updateCartView();
}

function updateCartView() {
  // Calculate total quantity & total price
  let totalUnits = 0;
  let totalPrice = 0;

  appState.cart.forEach((item) => {
    totalUnits += item.quantity;
    totalPrice += item.product.price * item.quantity;
  });

  // Update Cart Counter Badge in Header
  cartCounterEl.textContent = totalUnits;
  cartSubtotalUnits.textContent = `${totalUnits} ឯកតា`;
  cartTotalPriceEl.textContent = formatPrice(totalPrice);

  // Render items in body
  if (appState.cart.length === 0) {
    cartItemsBody.innerHTML = `
      <div class="cart-empty-msg">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <p style="font-weight: 600; color: #1e293b;">កន្ត្រកទំនិញរបស់អ្នកនៅទទេ</p>
        <p style="font-size: 0.85rem;">សូមជ្រើសរើសទំនិញបច្ចេកវិទ្យាដែលអ្នកពេញចិត្តរួចចុច “បន្ថែមទៅកន្ត្រក”</p>
      </div>
    `;
    clearCartBtn.disabled = true;
    demoCheckoutBtn.disabled = true;
    demoCheckoutBtn.style.opacity = "0.5";
    demoCheckoutBtn.style.cursor = "not-allowed";
  } else {
    clearCartBtn.disabled = false;
    demoCheckoutBtn.disabled = false;
    demoCheckoutBtn.style.opacity = "1";
    demoCheckoutBtn.style.cursor = "pointer";

    cartItemsBody.innerHTML = "";
    appState.cart.forEach((item) => {
      const itemEl = document.createElement("div");
      itemEl.className = "cart-item-card";
      itemEl.id = `cart-item-${item.product.id}`;

      itemEl.innerHTML = `
        <img src="${item.product.image}" alt="${item.product.nameKh}" class="cart-item-thumb" referrerpolicy="no-referrer" />
        <div class="cart-item-details">
          <span class="cart-item-name">${item.product.nameKh}</span>
          <span class="cart-item-price">${formatPrice(item.product.price)}</span>
          <div class="qty-control-group">
            <button type="button" class="qty-btn btn-minus" data-id="${item.product.id}" aria-label="បន្ថយចំនួន">-</button>
            <span class="qty-count">${item.quantity}</span>
            <button type="button" class="qty-btn btn-plus" data-id="${item.product.id}" aria-label="បន្ថែមចំនួន">+</button>
          </div>
        </div>
        <div class="cart-item-actions">
          <span class="cart-item-total">${formatPrice(item.product.price * item.quantity)}</span>
          <button type="button" class="btn-remove-item" data-id="${item.product.id}" title="លុបចេញពីកន្ត្រក" aria-label="លុប ${item.product.nameKh}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      `;

      // Event handlers for quantity & delete
      itemEl.querySelector(".btn-minus").addEventListener("click", () => {
        updateCartItemQty(item.product.id, -1);
      });
      itemEl.querySelector(".btn-plus").addEventListener("click", () => {
        updateCartItemQty(item.product.id, 1);
      });
      itemEl.querySelector(".btn-remove-item").addEventListener("click", () => {
        removeCartItem(item.product.id);
      });

      cartItemsBody.appendChild(itemEl);
    });
  }
}

// 8. Drawer Controls
function openCart() {
  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

// 9. Reset Filters Functionality
function resetFilters() {
  appState.searchQuery = "";
  appState.selectedCategory = "all";
  appState.maxPrice = 2000;
  appState.sortOption = "default";

  // Reset UI inputs
  searchInput.value = "";
  searchClearBtn.classList.remove("visible");

  categoryInputs.forEach((radio) => {
    radio.checked = radio.value === "all";
    const label = radio.closest(".category-radio-label");
    if (label) {
      label.classList.toggle("active", radio.value === "all");
    }
  });

  priceRangeInput.value = 2000;
  priceDisplay.textContent = formatPrice(2000);
  sortSelect.value = "default";

  renderProducts();
}

// 10. Event Listeners Setup
function initEventListeners() {
  // Search input live filtering
  searchInput.addEventListener("input", (e) => {
    appState.searchQuery = e.target.value;
    searchClearBtn.classList.toggle("visible", appState.searchQuery.length > 0);
    renderProducts();
  });

  searchClearBtn.addEventListener("click", () => {
    appState.searchQuery = "";
    searchInput.value = "";
    searchClearBtn.classList.remove("visible");
    searchInput.focus();
    renderProducts();
  });

  // Category filter changes
  categoryInputs.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      if (e.target.checked) {
        appState.selectedCategory = e.target.value;

        // Update active class styles
        categoryInputs.forEach((r) => {
          const lbl = r.closest(".category-radio-label");
          if (lbl) lbl.classList.toggle("active", r.checked);
        });

        renderProducts();
      }
    });
  });

  // Price range slider live updates
  priceRangeInput.addEventListener("input", (e) => {
    const val = Number(e.target.value);
    appState.maxPrice = val;
    priceDisplay.textContent = formatPrice(val);
    renderProducts();
  });

  // Sort dropdown
  sortSelect.addEventListener("change", (e) => {
    appState.sortOption = e.target.value;
    renderProducts();
  });

  // Reset button in sidebar
  resetFiltersBtn.addEventListener("click", resetFilters);

  // Cart Drawer open/close
  cartToggleBtn.addEventListener("click", openCart);
  closeCartBtn.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  // Clear cart button
  clearCartBtn.addEventListener("click", () => {
    if (appState.cart.length > 0) {
      if (confirm("តើអ្នកពិតជាចង់សម្អាតទំនិញទាំងអស់ចេញពីកន្ត្រកមែនទេ?")) {
        clearCart();
      }
    }
  });

  // Demo Checkout button
  demoCheckoutBtn.addEventListener("click", () => {
    if (appState.cart.length > 0) {
      alert("សូមអរគុណ! នេះជាប្រព័ន្ធសាកល្បងសម្រាប់រៀន Front-End (CSS Grid) គ្មានការទូទាត់ប្រាក់ពិតប្រាកដទេ។");
    }
  });

  // Instructor Guide modal open/close
  if (openGuideBtn && instructorModalOverlay && closeGuideBtn) {
    openGuideBtn.addEventListener("click", () => {
      instructorModalOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    closeGuideBtn.addEventListener("click", () => {
      instructorModalOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });

    instructorModalOverlay.addEventListener("click", (e) => {
      if (e.target === instructorModalOverlay) {
        instructorModalOverlay.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Keyboard accessibility (Escape closes drawers & modals)
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCart();
      if (instructorModalOverlay) {
        instructorModalOverlay.classList.remove("active");
        document.body.style.overflow = "";
      }
    }
  });
}

// 11. Initial Application Boot
document.addEventListener("DOMContentLoaded", () => {
  initEventListeners();
  renderProducts();
  updateCartView();
});
