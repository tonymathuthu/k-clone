const menuIcon = document.querySelector(".menu-icon");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".overlay");

menuIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

sidebar.addEventListener("click", (event) => {
  event.stopPropagation();
});
let lastScrollY = 0;
let currentTransform = 0;
const maxMovement = 200;

const slidingCards = document.querySelector(".sliding-cards");

let scrollAmount = 0;
const scrollSpeed = 2; // Adjust this value for faster/slower scrolling

function autoScroll() {
  slidingCards.scrollLeft += scrollSpeed;
  scrollAmount += scrollSpeed;

  // If we reach the end, reset to start for infinite scroll
  if (scrollAmount >= slidingCards.scrollWidth - slidingCards.clientWidth) {
    slidingCards.scrollLeft = 0;
    scrollAmount = 0;
  }
}
setInterval(autoScroll, 20);
