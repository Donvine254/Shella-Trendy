//updateTheMenu
const Url = "https://api.jsonbin.io/v3/b/644896228e4aa6225e910b8f";
function handleMenu() {
    document.addEventListener("DOMContentLoaded", () => {
      const dropdownMenu = document.querySelector(".dropdown-menu");
      dropdownMenu.addEventListener("click",(event)=>{
        item=event.target.textContent
        console.log(item)
      })
    });
  }
  handleMenu()
  console.log(shoppingItems)