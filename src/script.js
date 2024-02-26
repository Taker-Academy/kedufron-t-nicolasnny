const openMenuBtn = document.getElementById('open-basket-button');
const closeMenuBtn = document.getElementById('close-basket-button');
const sideMenu = document.getElementById('sideMenu');

openMenuBtn.addEventListener('click', () => {
  sideMenu.style.width = '100%';
});

closeMenuBtn.addEventListener('click', () => {
  sideMenu.style.width = '0';
});