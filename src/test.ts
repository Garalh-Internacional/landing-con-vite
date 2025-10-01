/**
 * test.ts
 * ---------------
 * Este archivo controla toda la interactividad de la landing: menús, scroll
 * suave, animaciones y validación del formulario de contacto.
 */

// Importa los estilos globales (incluye Tailwind) para que las clases utilitarias funcionen.
import "./style.css";

// 1. TOGGLE MENÚ MÓVIL
// Referencias al botón del menú y al contenedor de enlaces móviles.
const btn = document.getElementById("menuBtn");
const nav = document.getElementById("navMenu");

// Cuando existe la pareja botón/nav, alternamos la clase Tailwind `hidden`
// para mostrar u ocultar el menú en pantallas pequeñas.
if (btn && nav) {
  btn.addEventListener("click", () => {
    nav.classList.toggle("hidden");
  });
}

// 2. SCROLL SUAVE
// A cada enlace interno (href que empieza con "#") le agregamos un listener
// que hace scroll suave a la sección correspondiente y cierra el menú móvil.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e: Event) {
    e.preventDefault();
    const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
    if (href && href.length > 1 && href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target && nav) {
        target.scrollIntoView({ behavior: "smooth" });

        // Cierra el menú móvil para que el usuario vuelva a ver el contenido.
        nav.classList.add("hidden");
      }
    }
  });
});

// 3. CERRAR MENÚ MÓVIL AL HACER CLICK EN ENLACES EXTERNOS
// Para enlaces que llevan a otra página, ocultamos el menú después del click
// para evitar que se quede abierto cuando el usuario vuelva atrás.
document.querySelectorAll('nav a:not([href^="#"])').forEach((anchor) => {
  anchor.addEventListener("click", function () {
    if (nav) {
      nav.classList.add("hidden");
    }
  });
});

// 4. FADE-IN ANIMATION
// Selecciona las tarjetas con la clase `.fade-in` para animarlas en cascada.
const cards = document.querySelectorAll(".fade-in");
cards.forEach((card, i) => {
  // Usamos un retardo incremental (750 ms * índice) para que aparezcan
  // una tras otra, creando un efecto escalonado.
  setTimeout(() => {
    card.classList.remove("opacity-0");
  }, i * 750);
});

// 5. VALIDACIÓN FORMULARIO DE CONTACTO
// Referencias al formulario y al párrafo que mostrará mensajes de estado.
const contactForm = document.getElementById("contactForm") as HTMLFormElement;
const statusMessage = document.getElementById("status");

// Guardamos el identificador del timeout para poder reiniciarlo si el usuario
// envía el formulario varias veces en poco tiempo.
let statusHideTimeout: number | null = null;

if (contactForm) {
  // Interceptamos el envío del formulario para validar y mostrar mensajes
  // sin recargar la página.
  contactForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    // Extraemos y limpiamos los valores ingresados por el usuario.
    const nombre = (
      document.getElementById("nombre") as HTMLInputElement
    ).value.trim();
    const email = (
      document.getElementById("email") as HTMLInputElement
    ).value.trim();
    const mensaje = (
      document.getElementById("mensaje") as HTMLTextAreaElement
    ).value.trim();

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
    if (statusMessage) {
      // Si todavía hay un temporizador activo, lo cancelamos para reiniciar
      // la animación (útil cuando se envía más de una vez).
      if (statusHideTimeout) {
        window.clearTimeout(statusHideTimeout);
      }

      // Agregamos/quitamos las clases Tailwind responsables del fade.
      statusMessage.classList.remove("opacity-0");
      statusMessage.classList.add("opacity-100");

      // Después de 3 segundos, ocultamos el mensaje con la transición.
      statusHideTimeout = window.setTimeout(() => {
        statusMessage.classList.remove("opacity-100");
        statusMessage.classList.add("opacity-0");
        statusHideTimeout = null;
      }, 3000);

      // Limpiar formulario
      contactForm.reset();
    }
  });
}
