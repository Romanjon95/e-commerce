//Get products for shop page
const MAX_PRICE = 600;
const DEFAULT_FILTER = {
  company: null,
  price: MAX_PRICE,
};
let filter = { ...DEFAULT_FILTER };

const productsContainer = document.querySelector('#products-container');

// Add buttons
const allBtn = document.querySelector('.all');
const ikeaBtn = document.querySelector('.ikea');
const marcosBtn = document.querySelector('.marcos');
const caressaBtn = document.querySelector('.caressa');
const liddyBtn = document.querySelector('.liddy');
const priceInput = document.querySelector('#price-input');
const priceOutput = document.querySelector('#price-output');


// Add button listeners
allBtn.addEventListener('click', () => handleFilter({ company: null }));
ikeaBtn.addEventListener('click', () => handleFilter({ company: 'IKEA' }));
marcosBtn.addEventListener('click', () => handleFilter({ company: 'Marcos' }));
caressaBtn.addEventListener('click', () => handleFilter({ company: 'Caressa' }));
liddyBtn.addEventListener('click', () => handleFilter({ company: 'Liddy' }));
priceInput.addEventListener('input', (e) => {
  priceOutput.textContent = e.target.value;
  handleFilter({ price: e.target.value })
});

priceOutput.textContent = MAX_PRICE;
handleFilter(filter);

async function handleFilter(updatedFilter = {}) {
  filter = updateFilter(updatedFilter);
  const products = await getProducts(filter);
  renderProducts(products);
}

async function getProducts(filter) {
  const response = await fetch('./products.json');
  const products = await response.json();
  return filterProducts(products, filter);
}

//Render products
function renderProducts(productsArray) {
  const html = productsArray.map((item) => {
    return `
    <div class="product" data-id="${item.id}">
      <img class="product__img" src="./img/${item.imgSrc}" alt="${item.title}">
      <div class="product__description">
        <p class="product__text">${item.title}</p>
        <p class="product__price">${item.price}</p>
        <p class="product__company">${item.company}</p>
      </div>
      <!-- counter -->
      <div class="product__counter-wrapper counter">
        <div class="product__control counter__minus" data-action="minus">-</div>
        <div class="product__current counter__number" data-counter="">1</div>
        <div class="product__control counter__minus" data-action="plus">+</div>
      </div>
      <img data-cart class="icon" src="icons/cart-plus-solid.svg" alt="cart">
    </div>`;
  }).join('');
  productsContainer.innerHTML = html;
}

// TODO: Implement search into the filter

const searchInput = document.querySelector('.input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
  getArray();
});



async function getArray() {
  const response = await fetch('./products.json');
  const productsArray = await response.json();
  const filteredData = productsArray.filter(el => el.title.includes(searchInput.value));

  renderProducts(filteredData);
}

//Press Enter = Press Button
searchInput.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    searchBtn.click();
  }
})

/**
 * Filters out products by company and price
 * @param {Array of all products} products List of products
 * @param {comany, price} filter Filter object with company and price
 * @returns Filtered products
 */
function filterProducts(products, filter = {}) {
  return products.filter((product) => {
    let sutisfy = true;
    if (filter.company && product.company !== filter.company) sutisfy = false;
    if (filter.price && product.price > filter.price) sutisfy = false;
    return sutisfy;
  });
}

function updateFilter(values = {}) {
  return { ...filter, ...values };
}
