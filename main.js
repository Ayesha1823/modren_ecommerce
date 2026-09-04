import './style.css'

const imageUrls = {
  handbag: 'https://images.pexels.com/photos/17938771/pexels-photo-17938771.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  lipstick: 'https://images.pexels.com/photos/30408335/pexels-photo-30408335.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  glasses: 'https://images.pexels.com/photos/8084237/pexels-photo-8084237.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  clearGlasses: 'https://images.pexels.com/photos/25651729/pexels-photo-25651729.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  sunglasses: 'https://images.pexels.com/photos/29538714/pexels-photo-29538714.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  wallet: 'https://images.pexels.com/photos/37326711/pexels-photo-37326711.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  bags: 'https://images.pexels.com/photos/5706271/pexels-photo-5706271.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  skirt: 'https://images.pexels.com/photos/12956068/pexels-photo-12956068.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  belt: 'https://images.pexels.com/photos/38053202/pexels-photo-38053202.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  blueGlasses: 'https://images.pexels.com/photos/25322973/pexels-photo-25322973.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
}

const products = [
  { id: 1, name: 'Arc Leather Tote', category: 'Accessories', price: 148, oldPrice: 185, discount: 20, image: imageUrls.handbag, rating: 4.9, description: 'A generous everyday tote cut from supple full-grain leather. Designed to soften beautifully with use and carry everything without losing its shape.', stock: 8, badge: 'Bestseller' },
  { id: 2, name: 'Form Sunglasses', category: 'Accessories', price: 84, oldPrice: 105, discount: 20, image: imageUrls.sunglasses, rating: 4.8, description: 'Sculptural acetate frames with a warm, smoke-tinted lens. A considered silhouette for bright days and slow afternoons.', stock: 14, badge: 'New' },
  { id: 3, name: 'Field Card Holder', category: 'Accessories', price: 48, oldPrice: 60, discount: 20, image: imageUrls.wallet, rating: 4.7, description: 'A slim, tactile card holder in vegetable-tanned leather. Six slots, one simple purpose: keep the essentials close.', stock: 21, badge: 'Staff pick' },
  { id: 4, name: 'Contour Eye Frame', category: 'Accessories', price: 72, oldPrice: 90, discount: 20, image: imageUrls.clearGlasses, rating: 4.8, description: 'Lightweight optical frames with a clean, quietly confident line. Includes a recycled hard case and polishing cloth.', stock: 11, badge: 'New' },
  { id: 5, name: 'Serein Silk Scarf', category: 'Fashion', price: 62, oldPrice: 78, discount: 20, image: imageUrls.skirt, rating: 4.6, description: 'A soft, luminous silk scarf in a versatile neutral print. Wear it loose, wrapped, or tied to your favorite bag.', stock: 6, badge: '' },
  { id: 6, name: 'Daily Leather Belt', category: 'Fashion', price: 56, oldPrice: 70, discount: 20, image: imageUrls.belt, rating: 4.9, description: 'Minimal hardware, considered proportions, and leather that gets better every day. Made to quietly finish a look.', stock: 19, badge: 'Bestseller' },
  { id: 7, name: 'Sunday Shoulder Bag', category: 'Accessories', price: 118, oldPrice: 150, discount: 21, image: imageUrls.bags, rating: 4.5, description: 'An easy shoulder bag with room for the things you reach for most. Soft structure, thoughtful pockets, no excess.', stock: 9, badge: '' },
  { id: 8, name: 'Atelier Lip Set', category: 'Beauty', price: 38, oldPrice: 48, discount: 21, image: imageUrls.lipstick, rating: 4.8, description: 'Two buildable, satin-finish shades inspired by late afternoon light. Comfortable color, made for everyday rituals.', stock: 24, badge: 'New' },
  { id: 9, name: 'Rose Gold Sun Frame', category: 'Accessories', price: 90, oldPrice: 112, discount: 20, image: imageUrls.glasses, rating: 4.7, description: 'A soft geometric frame with warm metal detail and a flattering rose tint. Thoughtful design that goes anywhere.', stock: 7, badge: '' },
  { id: 10, name: 'Studio Carryall', category: 'Accessories', price: 165, oldPrice: 210, discount: 21, image: imageUrls.handbag, rating: 4.9, description: 'A roomy carryall for studio days and weekends away. Finished by hand with clean seams and sturdy cotton lining.', stock: 5, badge: 'Limited' },
  { id: 11, name: 'Clearline Optical', category: 'Accessories', price: 78, oldPrice: 98, discount: 20, image: imageUrls.blueGlasses, rating: 4.6, description: 'A clear, modern frame that lets your face do the talking. Supplied with a protective case.', stock: 12, badge: '' },
  { id: 12, name: 'Classic Leather Wrap', category: 'Fashion', price: 44, oldPrice: 55, discount: 20, image: imageUrls.belt, rating: 4.5, description: 'A slim leather wrap with a polished clasp. An everyday finishing touch with a little personality.', stock: 16, badge: '' },
]

const state = {
  page: 'home',
  category: 'All',
  search: '',
  sort: 'featured',
  price: 'all',
  productId: null,
  cart: JSON.parse(localStorage.getItem('north-cart') || '[]'),
  toast: '',
}

const app = document.querySelector('#app')
const categories = ['All', 'Accessories', 'Fashion', 'Beauty']
const icon = (name) => ({
  arrow: '<span aria-hidden="true">↗</span>',
  search: '<span aria-hidden="true">⌕</span>',
  bag: '<span aria-hidden="true">▱</span>',
  heart: '<span aria-hidden="true">♡</span>',
  close: '<span aria-hidden="true">×</span>',
  check: '<span aria-hidden="true">✓</span>',
}[name] || '')

function money(value) { return `$${value.toFixed(2)}` }
function getProduct(id) { return products.find((product) => product.id === Number(id)) }
function cartCount() { return state.cart.reduce((sum, item) => sum + item.quantity, 0) }
function cartTotal() { return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0) }
function saveCart() { localStorage.setItem('north-cart', JSON.stringify(state.cart)) }
function showToast(message) { state.toast = message; render(); window.clearTimeout(showToast.timer); showToast.timer = window.setTimeout(() => { state.toast = ''; render() }, 2600) }
function go(page, id = null) { state.page = page; state.productId = id; window.scrollTo({ top: 0, behavior: 'smooth' }); render() }

function header() {
  return `<header class="site-header">
    <a class="wordmark" href="#" data-action="home">NORTH<span>.</span></a>
    <nav class="main-nav" aria-label="Main navigation">
      <a class="${state.page === 'home' ? 'active' : ''}" href="#" data-action="home">Home</a>
      <a class="${state.page === 'products' ? 'active' : ''}" href="#" data-action="products">Shop</a>
      <a href="#journal" data-action="journal">Journal</a>
      <a href="#about" data-action="about">About</a>
    </nav>
    <div class="header-actions">
      <button class="icon-button search-toggle" type="button" aria-label="Search" data-action="toggle-search">${icon('search')}</button>
      <button class="icon-button bag-button" type="button" aria-label="Open bag" data-action="cart">${icon('bag')}<span class="cart-count">${cartCount()}</span></button>
      <button class="menu-toggle" type="button" aria-label="Open menu" data-action="menu">Menu</button>
    </div>
  </header>
  <div class="search-bar ${state.searchOpen ? 'is-open' : ''}"><div class="search-inner"><span>${icon('search')}</span><input id="searchInput" value="${state.search}" placeholder="Search the collection" aria-label="Search products" /><button type="button" data-action="close-search">${icon('close')}</button></div></div>`
}

function hero() {
  return `<section class="hero">
    <div class="hero-copy"><p class="eyebrow">The new essentials / 02</p><h1>Good things<br /><em>take shape.</em></h1><p class="hero-text">Considered objects for everyday living. Designed with restraint, made to last, and selected for the way you actually move through the world.</p><div class="hero-buttons"><button class="button button-dark" type="button" data-action="products">Shop the collection ${icon('arrow')}</button><button class="text-button" type="button" data-action="journal">Read our journal ${icon('arrow')}</button></div></div>
    <div class="hero-art"><img src="${imageUrls.bags}" alt="Minimal leather bags and dried leaves" /><div class="hero-stamp">NORTH<br /><small>STUDIO / 2024</small></div><div class="hero-caption">Everyday objects<br />with intention.</div></div>
  </section>`
}

function productCard(product) {
  return `<article class="product-card"><div class="product-image" data-action="details" data-id="${product.id}"><img src="${product.image}" alt="${product.name}" loading="lazy" />${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}<button class="wish-button" type="button" aria-label="Save ${product.name}" data-action="wishlist">${icon('heart')}</button><span class="quick-view">View details ${icon('arrow')}</span></div><div class="product-info"><div><p class="product-category">${product.category}</p><h3>${product.name}</h3></div><div class="product-price"><strong>${money(product.price)}</strong><del>${money(product.oldPrice)}</del></div></div><div class="product-footer"><span class="rating">★ ${product.rating}</span><button type="button" class="add-link" data-action="add" data-id="${product.id}">Add to bag ${icon('arrow')}</button></div></article>`
}

function featured() {
  return `<section class="section featured-section"><div class="section-heading"><div><p class="eyebrow">01 / Curated for you</p><h2>Objects with a point of view.</h2></div><button class="text-button" type="button" data-action="products">View all products ${icon('arrow')}</button></div><div class="product-grid featured-grid">${products.slice(0, 4).map(productCard).join('')}</div></section>`
}

function categoriesSection() {
  return `<section class="category-section"><div class="category-intro"><p class="eyebrow">Shop by feeling</p><h2>Find your<br /><em>everyday.</em></h2><p>Less, but better. Explore pieces that make the ordinary feel a little more considered.</p></div><div class="category-list">${['Accessories', 'Fashion', 'Beauty'].map((category, index) => `<button class="category-tile tile-${index + 1}" type="button" data-action="category" data-category="${category}"><span>0${index + 1}</span><strong>${category}</strong><span class="tile-arrow">${icon('arrow')}</span></button>`).join('')}</div></section>`
}

function promoSection() {
  return `<section class="promo-section"><div class="promo-content"><p class="eyebrow">A quieter kind of luxury</p><h2>Made for the<br /><em>long way around.</em></h2><p>We believe the best objects don't shout. They become part of your rhythm — dependable, tactile, and quietly beautiful.</p><button class="button button-light" type="button" data-action="about">Our approach ${icon('arrow')}</button></div><div class="promo-mark">N</div></section>`
}

function testimonials() {
  return `<section class="testimonial-section"><p class="eyebrow">Notes from the field</p><blockquote>“NORTH gets the small things right. Everything feels intentional without ever feeling precious.”</blockquote><div class="quote-byline"><span class="avatar">AM</span><span>Alex Morgan<br /><small>Verified customer</small></span></div></section>`
}

function newsletter() {
  return `<section class="newsletter-section"><div><p class="eyebrow">The north star</p><h2>A little less noise.<br />A little more <em>signal.</em></h2></div><form class="newsletter-form"><label for="email">Join for studio notes, new arrivals, and 10% off your first order.</label><div class="input-row"><input id="email" type="email" required placeholder="Your email address" /><button class="button button-dark" type="submit">Sign me up ${icon('arrow')}</button></div></form></section>`
}

function footer() { return `<footer class="site-footer"><div class="footer-top"><a class="wordmark" href="#" data-action="home">NORTH<span>.</span></a><p>Considered objects<br />for everyday living.</p><div class="footer-links"><a href="#" data-action="products">Shop</a><a href="#about" data-action="about">Our story</a><a href="#journal" data-action="journal">Journal</a><a href="#" data-action="contact">Contact</a></div><div class="footer-links"><a href="#" data-action="shipping">Shipping & returns</a><a href="#" data-action="care">Care guide</a><a href="#" data-action="privacy">Privacy</a><a href="#" data-action="instagram">Instagram ↗</a></div></div><div class="footer-bottom"><span>© 2024 NORTH Studio</span><span>Made with intention, everywhere.</span></div></footer>` }

function homePage() { return `${hero()}${featured()}${categoriesSection()}${promoSection()}${testimonials()}${newsletter()}` }

function productsPage() {
  const filtered = products.filter((product) => (state.category === 'All' || product.category === state.category) && product.name.toLowerCase().includes(state.search.toLowerCase()) && (state.price === 'all' || (state.price === 'under50' ? product.price < 50 : product.price >= 50 && product.price < 100)))
  const sorted = [...filtered].sort((a, b) => state.sort === 'low' ? a.price - b.price : state.sort === 'high' ? b.price - a.price : state.sort === 'rating' ? b.rating - a.rating : a.id - b.id)
  return `<section class="shop-page"><div class="shop-intro"><p class="eyebrow">The collection / ${String(sorted.length).padStart(2, '0')} pieces</p><h1>Everything<br /><em>in its place.</em></h1><p>Small runs, natural materials, and daily essentials selected for their form, function, and feel.</p></div><div class="filter-row"><div class="filter-pills">${categories.map((category) => `<button type="button" class="filter-pill ${state.category === category ? 'selected' : ''}" data-action="category" data-category="${category}">${category}</button>`).join('')}</div><div class="selects"><select id="priceFilter" aria-label="Filter by price"><option value="all" ${state.price === 'all' ? 'selected' : ''}>All prices</option><option value="under50" ${state.price === 'under50' ? 'selected' : ''}>Under $50</option><option value="over50" ${state.price === 'over50' ? 'selected' : ''}>$50 – $100</option></select><select id="sortProducts" aria-label="Sort products"><option value="featured" ${state.sort === 'featured' ? 'selected' : ''}>Featured</option><option value="low" ${state.sort === 'low' ? 'selected' : ''}>Price: low to high</option><option value="high" ${state.sort === 'high' ? 'selected' : ''}>Price: high to low</option><option value="rating" ${state.sort === 'rating' ? 'selected' : ''}>Top rated</option></select></div></div>${sorted.length ? `<div class="product-grid shop-grid">${sorted.map(productCard).join('')}</div>` : `<div class="empty-results"><span>${icon('search')}</span><h2>No exact matches.</h2><p>Try a different search or browse the full collection.</p><button class="button button-dark" data-action="reset-filters">Clear filters</button></div>`}</section>`
}

function detailsPage() { const product = getProduct(state.productId); const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3); return `<section class="details-page"><button class="back-link" type="button" data-action="products">← Back to collection</button><div class="details-main"><div class="details-image"><img src="${product.image}" alt="${product.name}" /></div><div class="details-copy"><p class="product-category">${product.category} / ${product.badge || 'Edition'}</p><h1>${product.name}</h1><div class="details-rating"><span>★ ${product.rating}</span><span>24 reviews</span></div><div class="details-price"><strong>${money(product.price)}</strong><del>${money(product.oldPrice)}</del><span>${product.discount}% off</span></div><p class="details-description">${product.description}</p><div class="stock-note"><span class="stock-dot"></span> Only ${product.stock} left in stock</div><div class="detail-buy"><div class="quantity"><button type="button" data-action="quantity-down">−</button><span id="detailQuantity">1</span><button type="button" data-action="quantity-up">+</button></div><button class="button button-dark buy-button" type="button" data-action="add-detail" data-id="${product.id}">Add to bag ${icon('arrow')}</button></div><div class="detail-notes"><div><strong>Free delivery</strong><span>On orders over $100</span></div><div><strong>Easy returns</strong><span>30 day return window</span></div><div><strong>Made to last</strong><span>Thoughtful materials</span></div></div></div></div><div class="related"><div class="section-heading"><div><p class="eyebrow">You may also like</p><h2>Complete the picture.</h2></div></div><div class="product-grid">${related.map(productCard).join('')}</div></div></section>` }

function cartPage() { const subtotal = cartTotal(); const shipping = subtotal >= 100 || subtotal === 0 ? 0 : 8; return `<section class="cart-page"><div class="cart-heading"><p class="eyebrow">Your selection / ${cartCount()} ${cartCount() === 1 ? 'item' : 'items'}</p><h1>The good stuff.</h1></div>${state.cart.length ? `<div class="cart-layout"><div class="cart-items">${state.cart.map((item) => { const product = getProduct(item.id); return `<div class="cart-item"><img src="${product.image}" alt="${product.name}" /><div class="cart-item-info"><p class="product-category">${product.category}</p><h3>${product.name}</h3><span>${money(item.price)}</span><div class="cart-item-actions"><div class="quantity"><button type="button" data-action="cart-decrease" data-id="${item.id}">−</button><span>${item.quantity}</span><button type="button" data-action="cart-increase" data-id="${item.id}">+</button></div><button type="button" class="remove-link" data-action="remove" data-id="${item.id}">Remove</button></div></div><strong class="item-total">${money(item.price * item.quantity)}</strong></div>`}).join('')}</div><aside class="order-summary"><p class="eyebrow">Order summary</p><h2>Ready when you are.</h2><div class="summary-line"><span>Subtotal</span><strong>${money(subtotal)}</strong></div><div class="summary-line"><span>Shipping</span><strong>${shipping ? money(shipping) : 'Free'}</strong></div><div class="summary-line total-line"><span>Total</span><strong>${money(subtotal + shipping)}</strong></div><button class="button button-dark full-button" type="button" data-action="checkout">Continue to checkout ${icon('arrow')}</button><p class="secure-note">Secure checkout · Free returns · Thoughtfully packed</p></aside></div>` : `<div class="empty-cart"><div class="empty-circle">${icon('bag')}</div><h2>Your bag is waiting.</h2><p>Good things are worth bringing home.</p><button class="button button-dark" type="button" data-action="products">Explore the collection ${icon('arrow')}</button></div>`}</section>` }

function checkoutPage() { const subtotal = cartTotal(); const shipping = subtotal >= 100 ? 0 : 8; return `<section class="checkout-page"><button class="back-link" type="button" data-action="cart">← Back to bag</button><div class="checkout-layout"><div class="checkout-form-wrap"><p class="eyebrow">Almost yours</p><h1>Complete your<br /><em>order.</em></h1><form id="checkoutForm" class="checkout-form"><fieldset><legend>Contact</legend><label>Email address<input name="email" type="email" required placeholder="you@example.com" /></label><label>Phone number<input name="phone" type="tel" required placeholder="(555) 000-0000" /></label></fieldset><fieldset><legend>Delivery</legend><label>Full name<input name="name" required placeholder="Your full name" /></label><label>Address<input name="address" required placeholder="Street and number" /></label><div class="form-row"><label>City<input name="city" required placeholder="City" /></label><label>Postal code<input name="postal" required placeholder="00000" /></label></div></fieldset><fieldset><legend>Payment</legend><label>Payment method<select name="payment"><option>Credit or debit card</option><option>PayPal</option><option>Apple Pay</option></select></label><label>Card number<input name="card" required minlength="12" placeholder="0000 0000 0000 0000" /></label><div class="form-row"><label>Expiry<input name="expiry" required placeholder="MM / YY" /></label><label>Security code<input name="cvc" required minlength="3" placeholder="CVC" /></label></div></fieldset><button class="button button-dark full-button" type="submit">Place order · ${money(subtotal + shipping)} ${icon('arrow')}</button></form></div><aside class="checkout-summary"><p class="eyebrow">In your bag</p>${state.cart.map((item) => { const product = getProduct(item.id); return `<div class="checkout-item"><img src="${product.image}" alt="${product.name}" /><span>${product.name} <small>Qty ${item.quantity}</small></span><strong>${money(item.price * item.quantity)}</strong></div>`}).join('')}<div class="summary-line"><span>Subtotal</span><strong>${money(subtotal)}</strong></div><div class="summary-line"><span>Shipping</span><strong>${shipping ? money(shipping) : 'Free'}</strong></div><div class="summary-line total-line"><span>Total</span><strong>${money(subtotal + shipping)}</strong></div></aside></div></section>` }

function confirmationPage() { return `<section class="confirmation-page"><div class="confirmation-mark">${icon('check')}</div><p class="eyebrow">Order received</p><h1>It’s on its<br /><em>way to you.</em></h1><p>Thank you, ${state.order?.name || 'friend'}. We’ve sent the details to ${state.order?.email || 'your inbox'}.</p><div class="order-number">Order number <strong>#NORTH-${Math.floor(10000 + Math.random() * 89999)}</strong></div><div class="confirmation-card"><p class="eyebrow">What happens next</p><div><span>01</span><p>We carefully pack your order in our studio.</p></div><div><span>02</span><p>You’ll receive a dispatch note when it leaves us.</p></div><div><span>03</span><p>Your considered objects arrive at your door.</p></div></div><button class="button button-dark" type="button" data-action="products">Continue shopping ${icon('arrow')}</button></section>` }

function render() { const page = state.page === 'home' ? homePage() : state.page === 'products' ? productsPage() : state.page === 'details' ? detailsPage() : state.page === 'cart' ? cartPage() : state.page === 'checkout' ? checkoutPage() : confirmationPage(); app.innerHTML = `${header()}<main>${page}</main>${state.page !== 'checkout' && state.page !== 'confirmation' ? footer() : ''}${state.toast ? `<div class="toast">${icon('check')} ${state.toast}</div>` : ''}`; bindEvents() }

function addToCart(id, quantity = 1) { const product = getProduct(id); const item = state.cart.find((entry) => entry.id === product.id); if (item) item.quantity += quantity; else state.cart.push({ id: product.id, quantity, price: product.price }); saveCart(); showToast(`${product.name} added to your bag`) }
function updateQuantity(id, delta) { const item = state.cart.find((entry) => entry.id === Number(id)); if (!item) return; item.quantity += delta; if (item.quantity < 1) state.cart = state.cart.filter((entry) => entry.id !== Number(id)); saveCart(); render() }
function bindEvents() {
  document.querySelectorAll('[data-action]').forEach((element) => element.addEventListener('click', (event) => { const target = event.currentTarget; const action = target.dataset.action; event.preventDefault(); if (action === 'wishlist') { event.stopPropagation(); showToast('Saved to your wishlist'); return } if (action === 'home') go('home'); if (action === 'products') go('products'); if (action === 'details') go('details', target.dataset.id); if (action === 'cart') go('cart'); if (action === 'checkout') go('checkout'); if (action === 'category') { state.category = target.dataset.category; state.page = 'products'; render() } if (action === 'add') addToCart(Number(target.dataset.id)); if (action === 'add-detail') addToCart(Number(target.dataset.id), Number(document.querySelector('#detailQuantity')?.textContent || 1)); if (action === 'quantity-up' || action === 'quantity-down') { const quantity = document.querySelector('#detailQuantity'); if (quantity) quantity.textContent = Math.max(1, Number(quantity.textContent) + (action === 'quantity-up' ? 1 : -1)) } if (action === 'cart-increase') updateQuantity(target.dataset.id, 1); if (action === 'cart-decrease') updateQuantity(target.dataset.id, -1); if (action === 'remove') { state.cart = state.cart.filter((item) => item.id !== Number(target.dataset.id)); saveCart(); render() } if (action === 'toggle-search') { state.searchOpen = true; render(); document.querySelector('#searchInput')?.focus() } if (action === 'close-search') { state.searchOpen = false; state.search = ''; render() } if (action === 'reset-filters') { state.category = 'All'; state.search = ''; state.price = 'all'; render() } if (action === 'menu') document.querySelector('.main-nav')?.classList.toggle('mobile-open'); if (action === 'journal' || action === 'about' || action === 'contact' || action === 'shipping' || action === 'care' || action === 'privacy' || action === 'instagram') showToast('This page is coming soon') }));
  document.querySelector('#searchInput')?.addEventListener('input', (event) => { state.search = event.target.value; if (state.search.length > 1) { state.page = 'products'; render(); document.querySelector('#searchInput')?.focus() } });
  document.querySelector('#priceFilter')?.addEventListener('change', (event) => { state.price = event.target.value; render() }); document.querySelector('#sortProducts')?.addEventListener('change', (event) => { state.sort = event.target.value; render() });
  document.querySelector('.newsletter-form')?.addEventListener('submit', (event) => { event.preventDefault(); showToast('You’re on the list. Welcome to NORTH.') });
  document.querySelector('#checkoutForm')?.addEventListener('submit', (event) => { event.preventDefault(); const form = new FormData(event.currentTarget); state.order = { name: form.get('name'), email: form.get('email') }; state.cart = []; saveCart(); state.page = 'confirmation'; render() });
}

render()
