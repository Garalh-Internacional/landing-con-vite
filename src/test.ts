import "./style.css";

// 1. TOGGLE MENÚ MÓVIL
const btn = document.getElementById("menuBtn");
const nav = document.getElementById("navMenu");

if (btn && nav) {
  btn.addEventListener("click", () => {
    nav.classList.toggle("hidden");
  });
}

// 2. SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e: Event) {
    e.preventDefault();
    const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
    if (href && href.length > 1 && href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target && nav) {
        target.scrollIntoView({ behavior: "smooth" });

        // Cerrar menú móvil después de click
        nav.classList.add("hidden");
      }
    }
  });
});

// 3. CERRAR MENÚ MÓVIL AL HACER CLICK EN ENLACES EXTERNOS
document.querySelectorAll('nav a:not([href^="#"])').forEach((anchor) => {
  anchor.addEventListener("click", function () {
    if (nav) {
      nav.classList.add("hidden");
    }
  });
});

// 4. FADE-IN ANIMATION
const cards = document.querySelectorAll(".fade-in");
cards.forEach((card, i) => {
  setTimeout(() => {
    card.classList.remove("opacity-0");
  }, i * 750);
});
