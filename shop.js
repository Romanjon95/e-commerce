//Get products for shop page
const productsContainer = document.querySelector('#products-container');

getProducts();

async function getProducts() {
  const response = await fetch('./products.json');
  console.log(response);

  const productsArray = await response.json();
  console.log(productsArray);

  renderProducts(productsArray);
}

//Render products
function renderProducts(productsArray) {
  productsArray.forEach(function (item) {
    const productHTML = `<div class="product" data-id="${item.id}">
    <img class="product__img" src="/img/${item.imgSrc}" alt="${item.title}">
    <div class="product__description">
      <p class="product__text">${item.title}</p>
      <p class="product__price">${item.price}</p>
      <p class="product__company"></p>
    </div>
    <!-- counter -->
    <div class="product__counter-wrapper counter">
      <div class="product__control counter__minus" data-action="minus">-</div>
      <div class="product__current counter__number" data-counter="">1</div>
      <div class="product__control counter__minus" data-action="plus">+</div>
    </div>
    <img data-cart class="icon" src="icons/cart-plus-solid.svg" alt="cart">
  </div>`;
    
    productsContainer.insertAdjacentHTML('beforeend', productHTML);
  });
}

//search

// const companyName = document.getElementsByClassName('product__company');

// searchInput.addEventListener('input', () => {
//   console.log(searchInput.value.toLowerCase());
//   Array.from(companyName).forEach(elem => {
//     if (elem.innerText.toLowerCase().includes(searchInput.value.toLowerCase())) {
//       elem.parentElement.parentElement.style.display = 'grid';
//     } else {
//       elem.parentElement.parentElement.style.display = 'none';
//     }
//   });
// });

const searchInput = document.querySelector('.input');
const searchBtn = document.querySelector('.search-btn');

//Press Enter = Press Button
searchInput.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    searchBtn.click();
  }
})