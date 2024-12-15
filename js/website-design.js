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

// Run the auto-scroll function at regular intervals
setInterval(autoScroll, 20);

const reviews = document.querySelector(".reviews");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

// Clone the first and last reviews for seamless infinite scrolling
const firstClone = reviews.children[0].cloneNode(true);
const lastClone = reviews.children[reviews.children.length - 1].cloneNode(true);

reviews.appendChild(firstClone);
reviews.insertBefore(lastClone, reviews.children[0]);

// Update the index to start at the first actual review
currentIndex = 1;
updateReviewPosition(false);

function updateReviewPosition(animate = true) {
  const reviewWidth = reviews.children[0].offsetWidth;
  reviews.style.transition = animate ? "transform 0.5s ease-in-out" : "none";
  reviews.style.transform = `translateX(${-currentIndex * reviewWidth}px)`;
}

prevBtn.addEventListener("click", () => {
  currentIndex--;
  updateReviewPosition();

  // Loop back to the last real review when moving backward from the first clone
  if (currentIndex === 0) {
    setTimeout(() => {
      currentIndex = reviews.children.length - 2;
      updateReviewPosition(false);
    }, 500);
  }
});

nextBtn.addEventListener("click", () => {
  currentIndex++;
  updateReviewPosition();

  // Loop back to the first real review when moving forward from the last clone
  if (currentIndex === reviews.children.length - 1) {
    setTimeout(() => {
      currentIndex = 1;
      updateReviewPosition(false);
    }, 500);
  }
});

// Select all FAQ questions
// Select all FAQ questions
const questions = document.querySelectorAll(".faq-question");

questions.forEach((question, index) => {
  question.addEventListener("click", () => {
    // Close all answers
    questions.forEach((q) => {
      q.classList.remove("active");
      const answer = q.nextElementSibling;
      answer.classList.remove("open");
      answer.style.maxHeight = null; // Reset the max-height
    });

    // Open the clicked answer
    const answer = question.nextElementSibling;
    if (!answer.classList.contains("open")) {
      question.classList.add("active");
      answer.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });

  if (index === 0) {
    question.classList.add("active");
    const answer = question.nextElementSibling;
    answer.classList.add("open");
    answer.style.maxHeight = answer.scrollHeight + "px";
  }
});
