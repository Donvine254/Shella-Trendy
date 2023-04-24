const dropdownContainer = document.querySelector('.dropdown-container');
const categoryDropdown = document.querySelector('.category-dropdown');

categoryDropdown.addEventListener('click', () => {
  const dropdownMenu = document.createElement('ul');
  dropdownMenu.classList.add('dropdown-menu');
  dropdownMenu.innerHTML = `
    <li><a href="#">Bags</a></li>
    <li><a href="#">Clothes</a></li>
    <li><a href="#">Shoes</a></li>
  `;
  dropdownContainer.appendChild(dropdownMenu);
});
