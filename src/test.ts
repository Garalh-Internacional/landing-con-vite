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

// 5. VALIDACIÓN FORMULARIO DE CONTACTO
const contactForm = document.getElementById("contactForm") as HTMLFormElement;
if (contactForm) {
  contactForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    const nombre = (
      document.getElementById("nombre") as HTMLInputElement
    ).value.trim();
    const email = (
      document.getElementById("email") as HTMLInputElement
    ).value.trim();
    const mensaje = (
      document.getElementById("mensaje") as HTMLTextAreaElement
    ).value.trim();
    const status = document.getElementById("status");

    // Validaciones básicas
    if (!nombre || !email || !mensaje) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (!email.includes(".")) {
      alert("Correo inválido");
      return;
    }

    // Mostrar mensaje de éxito
    if (status) {
      status.classList.remove("hidden");
      // Limpiar formulario
      contactForm.reset();

      // Ocultar mensaje después de 3 segundos
      setTimeout(() => {
        status.classList.add("hidden");
      }, 3000);
    }
  });
}
