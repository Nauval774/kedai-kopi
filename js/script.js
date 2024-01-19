// toggle class active
const navbarNav = document.querySelector('.navbar-nav');

//ketika hamburger menu di klik
document.querySelector('#hamburger-menu').onclick = (e) => {
  navbarNav.classList.toggle('active');
  e.preventDefault();
};

//ketika shopping cart di klik {
const shoppingCart = document.querySelector('.shopping-cart');

  document.querySelector('#shopping-cart').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    e.preventDefault();
};

//klik diluar sidebar untuk menghilangkan nav

const hamburger = document.querySelector('#hamburger-menu');
const searchB = document.querySelector('#search-button');
const shoppingB = document.querySelector('#shopping-cart');

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }
  
  if (!shoppingB.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove('active');
  }
  
  if (!searchB.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove('active');
  }
});

//toggle class active search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
};

//memunculkan modal box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButton = document.querySelectorAll('.item-detail-button');

itemDetailButton.forEach((btn) => {
  btn.onclick = (e) => {
  itemDetailModal.style.display = 'flex';
  e.preventDefault();
};
});


// klik tombol close shopping cart
document.querySelector('.modal .close-icon').onclick = (e) => {
  itemDetailModal.style.display = 'none'
  e.preventDefault();
}

// klik diluar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = 'none';
  }
}