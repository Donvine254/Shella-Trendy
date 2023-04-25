const baseUrl="https://my-json-server.typicode.com/Donvine254/Shella-Trendy"



//append a menu and remove a menu after clicking on the categories
const menu = document.querySelector(".menu");
const dropdown = document.querySelector(".dropdown");
let dropdownMenu = null;

dropdown.addEventListener("click", () => {
  if (!dropdownMenu) {
    dropdownMenu = document.createElement("ul");
    dropdownMenu.classList.add("dropdown-menu");
    dropdownMenu.innerHTML = `
      <li><a href="#">Bags</a></li>
      <li><a href="#">Clothes</a></li>
      <li><a href="#">Shoes</a></li>
    `;
    dropdownMenu.style.zIndex = 9999;
    menu.appendChild(dropdownMenu);
  } else {
    menu.removeChild(dropdownMenu);
    dropdownMenu = null;
  }
});
//change webpage theme from light to dark. I set the atributes to inherit but with time i can create custom themes
function toggleThemes() {
  const themeIcon = document.getElementById("theme");
  const body = document.body;
  const footer = document.querySelector("#footer-wrapper");

  themeIcon.addEventListener("click", function () {
    if (themeIcon.innerHTML === '<i class="fa-solid fa-moon"></i>') {
      body.style.backgroundColor = "#E3e6f3";
      body.style.color = "black";
      body.classList.add("dark-theme");
      footer.style.backgroundColor = "#E3E6F3";
      themeIcon.style.backgroundColor="white";
      themeIcon.innerHTML = "<box-icon name='sun' animation='flashing' rotate='90'color='#D37506' ></box-icon>";
    } else {
      body.style.backgroundColor = "";
      body.style.color = "";
      footer.style.backgroundColor = "#423B31";
      themeIcon.style.backgroundColor="#8f9779"
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
    });

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
search()
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
//handle buying of items
// let cartCount = 0;
// function updateCart() {
//   const badge = document.getElementsByClassName('badge')[0];
//   cartCount = parseInt(badge.textContent);
//   console.log(cartCount);
//   const purchaseBtn = document.getElementById('purchase');
//   purchaseBtn.addEventListener('click', () => {
//     badge.textContent = cartCount + 1;
//     cartCount++;
//   });
// }
// updateCart();


