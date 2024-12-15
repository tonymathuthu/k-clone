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

function handleScroll() {
  const text = document.getElementById("scrollText");
  const textContainer = document.getElementById("secPage");
  const containerRect = textContainer.getBoundingClientRect({
    behavior: "smooth",
  });
  const containerHeight = textContainer.offsetHeight;
  const viewportHeight = window.innerHeight;

  const isContainerHalfVisible =
    containerRect.top < viewportHeight * 0.5 &&
    containerRect.bottom > viewportHeight * 0.5;

  if (isContainerHalfVisible) {
    const currentScrollY = window.scrollY;
    const scrollChange = currentScrollY - lastScrollY;
    const newTransform = Math.max(
      -maxMovement,
      Math.min(maxMovement, currentTransform - scrollChange * 0.5)
    );

    text.style.transform = `translateY(${newTransform}px)`;
    currentTransform = newTransform;
    lastScrollY = currentScrollY;
  } else if (containerRect.top >= viewportHeight) {
    text.style.transform = "translateY(0px)";
    currentTransform = 0;
  }
}

window.addEventListener("scroll", handleScroll);

document.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  const textLeft = document.querySelector(".text-left");
  const textRight = document.querySelector(".text-right");

  textLeft.style.transform = `translateX(${-scrollY}px)`;
  textRight.style.transform = `translateX(${scrollY}px)`;
});
