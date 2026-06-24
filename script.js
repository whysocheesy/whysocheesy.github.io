// Preloader
window.onload = () => {
  document.getElementById("preloader").style.display = "none";
};

// Food Menu Data
const menu = [
  {id:1, name:"Cheese Pizza", category:"pizza", price:250, img:"https://source.unsplash.com/400x300/?cheese,pizza"},
  {id:2, name:"Veg Burger", category:"burger", price:150, img:"https://source.unsplash.com/400x300/?burger"},
  {id:3, name:"Cold Coffee", category:"drinks", price:100, img:"https://source.unsplash.com/400x300/?coffee"},
  {id:4, name:"Chocolate Cake", category:"desserts", price:200, img:"https://source.unsplash.com/400x300/?cake"},
];

// Render Menu
const menuContainer = document.getElementById("menu-items");
function