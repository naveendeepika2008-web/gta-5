
const loader = document.getElementById("loader");
const progress = document.getElementById("progress");
const loadingText = document.getElementById("loadingText");
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".navbar nav");

const messages = [
  "INITIALIZING CITY...",
  "LOADING LOS SANTOS...",
  "PREPARING THE CREW...",
  "SETTING UP THE WORLD...",
  "WELCOME TO THE CITY."
];

let value = 0;

function loadingAnimation() {
  const timer = setInterval(() => {
    value += Math.floor(Math.random() * 5) + 1;

    if (value >= 100) {
      value = 100;
      clearInterval(timer);

      progress.style.width = "100%";
      loadingText.textContent = messages[4];

      setTimeout(() => {
        loader.classList.add("hide");
      }, 700);

      return;
    }

    progress.style.width = value + "%";

    const index = Math.min(
      Math.floor(value / 25),
      messages.length - 2
    );

    loadingText.textContent = messages[index];
  }, 80);
}

loadingAnimation();

// Mobile menu
menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuBtn.textContent = nav.classList.contains("open")
    ? "✕"
    : "☰";
});

// Close mobile menu after clicking a link
document.querySelectorAll(".navbar nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

// Mouse parallax effect
const heroBg = document.querySelector(".hero-bg");
const sun = document.querySelector(".sun");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelector(".hero").addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;

    heroBg.style.transform = `scale(1.08) translate(${x * -10}px, ${y * -10}px)`;
    sun.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
  });
}

// Reveal sections while scrolling
const revealElements = document.querySelectorAll(
  ".story-grid, .character-card, .world-content"
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(element => {
  element.style.opacity = "0";
  element.style.transform = "translateY(40px)";
  element.style.transition = "opacity .8s ease, transform .8s ease";
  observer.observe(element);
});