const baseUrl = "https://api.jsonbin.io/v3/b/644896228e4aa6225e910b8f";
const featuredUrl =
  "https://my-json-server.typicode.com/Donvine254/Shella-Trendy/db";
const menu = document.querySelector(".menu");
const dropdown = document.querySelector(".dropdown");
const body = document.body;
let item;
//append a menu and remove a menu after clicking on the categories
function addDropDown() {
  let dropdownMenu = null;
  document.addEventListener("DOMContentLoaded", function (event) {
    // Hide the dropdown menu by default
    dropdownMenu = document.createElement("ul");
    dropdownMenu.classList.add("dropdown-menu", "menuHidden");
    dropdownMenu.innerHTML = `
      <li><a href="#Bags">Bags</a></li>
      <li><a href="#">Clothes</a></li>
      <li><a href="#">Shoes</a></li>
    `;
    dropdownMenu.style.zIndex = 9999;
    menu.appendChild(dropdownMenu);
    dropdown.addEventListener("click", () => {
      if (dropdownMenu.classList.contains("menuHidden")) {
        dropdownMenu.classList.remove("menuHidden");
      } else {
        dropdownMenu.classList.add("menuHidden");
      }
    });
  });
}
addDropDown();

//change webpage theme from light to dark. I set the attributes to inherit but with time i can create custom themes
function toggleThemes() {
  const themeIcon = document.getElementById("theme");

  themeIcon.addEventListener("click", function () {
    if (themeIcon.innerHTML === '<i class="fa-solid fa-moon"></i>') {
      body.style.backgroundColor = "white";
      body.style.color = "black";
      body.classList.add("dark-theme");
      themeIcon.style.backgroundColor = "white";
      themeIcon.innerHTML =
        "<box-icon name='sun' animation='flashing' rotate='90'color='#D37506' ></box-icon>";
    } else {
      body.style.backgroundColor = "";
      body.style.color = "";
      themeIcon.style.backgroundColor = "#8f9779";
      body.classList.remove("dark-theme");
      themeIcon.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  });
}
toggleThemes();
//add search functionality
function search() {
  const searchForm = document.querySelector(".search-form");
  const searchInput = searchForm.querySelector("input");
  const searchResults = document.querySelector(".search-results");
  function handleSearch(event) {
    event.preventDefault();
    const searchQuery = searchInput.value.trim();

    if (searchQuery === "") {
      return;
    }

    searchResults.innerHTML = "";

    const searchResultElement = document.createElement("div");
    searchResultElement.classList.add("search-result");
    searchResultElement.innerHTML =
      "Oops, looks like there are no great results to match your search. Please try again later.";

    const removeButton = document.createElement("button");
    removeButton.classList.add("search-result-remove");
    removeButton.innerHTML = "Remove";

    removeButton.addEventListener("click", () => {
      searchResults.removeChild(searchResultElement);
      body.removeChild(searchResults);
    });
    body.appendChild(searchResults);
    searchResultElement.appendChild(removeButton);
    searchResults.appendChild(searchResultElement);

    searchInput.value = "";
  }

  searchForm.addEventListener("submit", handleSearch);
  searchForm.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  });
}
search();
//since the page can get larger, lets add an event listener for scroll that appends a button to return the user to the top
function handleScroll() {
  const footer = document.querySelector("#copyright");
  const button = document.createElement("button");
  button.innerHTML = "<box-icon type='solid' name='arrow-to-top'></box-icon>";
  button.href = "#";
  button.id = "scroll-to-top";
  button.title = "go to top";
  footer.appendChild(button);

  button.addEventListener("click", (event) => {
    event.preventDefault();
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    button.remove();
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight / 1) {
      button.classList.add("show");
    } else {
      button.classList.remove("show");
    }
    const isButtonAppended = Array.from(footer.children).includes(button);
    if (!isButtonAppended && window.scrollY > 0) {
      footer.appendChild(button);
    }
  });
}

handleScroll();
//handle email subscription
function handleSubscription() {
  const input = document.getElementById("input");
  const subscriptionButton = document.getElementById("subscription");
  subscriptionButton.disabled = true; // disable the button by default
  input.addEventListener("input", function () {
    const email = input.value.trim();
    if (email !== "" && validateEmail(email)) {
      subscriptionButton.disabled = false; // enable the button if there's a valid email value
    } else {
      subscriptionButton.disabled = true; // disable the button if the value is empty or invalid
    }
  });
  subscriptionButton.addEventListener("click", function () {
    const email = input.value.trim();
    alert(`${email} has been successfully added to our mailing list`);
    input.value = "";
  });
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regular expression pattern for email validation
    return regex.test(email);
  }
}

handleSubscription();

//fetch data from my API
// let shopping = {};
// let shoppingItems;
// let clothes;
// let shoes;
// let bags;
let featuredItems = [];

async function fetchShoppingItems() {
  try {
    const response = await fetch(featuredUrl);
    if (response.ok) {
      const products = await response.json();
      featuredItems = await structuredClone(products.featuredproduct);
      renderItems(featuredItems);
    } else {
      throw new Error("404, permission denied");
    }
  } catch (error) {
    console.error(error);
  }
  addToWishList();
  updateCart();
}
fetchShoppingItems();
//structured clone reduces time and space complexity associated with looping but is not fully supported by all browsers, especially on ios and android devices
const productsSection = document.getElementById("products");

function renderItems(items) {
  for (const item of items) {
    const product = document.createElement("div");
    product.classList.add("product");
    product.innerHTML = `<box-icon class="favorite"color="gold" name='heart'></box-icon>
    <img src="${item.image}" alt="product"loading="lazy" srcset="">
    <p id="title">${item.name}</p>
    <p id="price"><strong>Ksh:</strong>${item.price}</p>
    <p id="ratings"><box-icon type="solid" color="gold" name='star'></box-icon>
      <box-icon type='solid'color="gold" name='star'></box-icon>
      <box-icon type='solid'color="gold" name='star'></box-icon>
      <box-icon type='solid'color="gold" name='star'></box-icon>
      <box-icon type='solid'color="gold" name='star'></box-icon>
      (${item.ratings})</p>
    <button type="button" class="purchase"><box-icon id="cart" name='cart-add'color='white' ></box-icon><span>Add to Cart</span></button>`;
    productsSection.appendChild(product);
  }
}

// handle buying of items
let cartCount = 0;

function updateCart() {
  const badge = document.getElementsByClassName("badge")[0];
  cartCount = parseInt(badge.textContent);
  const purchaseBtns = document.querySelectorAll(".purchase");
  purchaseBtns.forEach((purchaseBtn) => {
    purchaseBtn.addEventListener("click", () => {
      cartCount++;
      badge.textContent = cartCount;
      if (cartCount > 0) {
        badge.classList.remove("badge");
        badge.classList.add("active");
      }
    });
  });
}

// lets handle the love button to enable users add products to the wishlist
function addToWishList() {
  const like = document.querySelectorAll(".favorite");
  let isLiked = false;
  like.forEach(function (item) {
    item.addEventListener("click", function () {
      if (!isLiked) {
        item.setAttribute("type", "solid");
        item.setAttribute("color", "red");
        isLiked = true;
        alert(`This item has been added to your wishlist`);
      } else {
        item.removeAttribute("type");
        item.setAttribute("color", "gold");
        item.setAttribute("name", "heart");
        isLiked = false;
        alert(`This item has been removed from your wishlist`);
      }
    });
  });
}
