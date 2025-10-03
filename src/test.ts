/**
 * test.ts
 * ---------------
 * Este archivo controla toda la interactividad de la landing: menús, scroll
 * suave, animaciones y validación del formulario de contacto.
 */

// Importa los estilos globales (incluye Tailwind) para que las clases utilitarias funcionen.
import "./style.css";

// Importa los íconos de Lucide como web components.
import {
  createIcons,
  ArrowLeft,
  Home,
  LayoutDashboard,
  Mail,
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Zap,
  User,
  Send,
  ChevronUp,
  MoonStar,
} from "lucide";

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

// Demo 1: Dark Mode Toggle
// Referencia al botón que alterna el modo oscuro/claro.
// Nota: En Tailwind v4 configuramos el modo oscuro para que dependa de la clase
// `.dark` en el elemento <html>. Aquí simplemente agregamos o quitamos esa clase.
const darkToggle = document.getElementById("darkToggle");
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");
    // Si ya está en modo oscuro, quitamos la clase; de lo contrario, la agregamos.
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  });
}

// Scroll to Top Button
// Referencia al botón flotante que permite volver al inicio de la página.
const scrollToTopBtn = document.getElementById("scrollToTop");

if (scrollToTopBtn) {
  // Mostramos/ocultamos el botón según la posición del scroll.
  // Si el usuario baja más de 300px, aparece; de lo contrario, se oculta.
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.remove("opacity-0", "invisible");
      scrollToTopBtn.classList.add("opacity-100", "visible");
    } else {
      scrollToTopBtn.classList.add("opacity-0", "invisible");
      scrollToTopBtn.classList.remove("opacity-100", "visible");
    }
  });

  // Al hacer click, desplazamos suavemente hasta la parte superior.
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Demo 2: Modal Simple
// Referencias al contenedor del modal y a los botones para abrir/cerrar.
const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");

if (modal && openModal && closeModal) {
  // Abrir el modal: quitamos `hidden` y aplicamos `flex` para centrar el contenido.
  openModal.onclick = () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  };
  // Cerrar el modal con el botón de cierre.
  closeModal.onclick = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  };
  // Close modal when clicking outside
  // Cerrar el modal si se hace click en el fondo (fuera del cuadro de diálogo).
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  };
}

// Demo 3: Carrusel Básico
// Datos del carrusel: cada elemento puede ser una tarjeta con texto/gradiente
// o una imagen. Para imagen, agrega `imageSrc` (ruta pública o import) y `alt`.
// Opcionales por slide:
//  - fit: cómo se ajusta la imagen ("cover" | "contain" | "fill" | "none" | "scale-down").
//  - aspect: clase de relación de aspecto (p.ej. "aspect-video", "aspect-square", "aspect-[4/3]").
// Ejemplo con imagen usando un recurso de la carpeta `public`:
// { imageSrc: "/vite.svg", alt: "Logo de Vite", fit: "contain", aspect: "aspect-video" }
const carouselData = [
  { content: "Imagen 1", gradient: "from-blue-400 to-purple-500" },
  // Ejemplo: descomenta y reemplaza por tu imagen
  // { imageSrc: "/images/slide1.jpg", alt: "Descripción de la imagen 1" },
  { content: "Imagen 2", gradient: "from-green-400 to-blue-500" },
  { content: "Imagen 3", gradient: "from-pink-400 to-red-500" },
];
// Índice actual del carrusel.
let carouselIndex = 0;

// Referencias a los elementos del DOM del carrusel.
const carouselImage = document.getElementById("carouselImage");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const dotsContainer = document.getElementById("dots");

// Crea los puntos dinámicamente según la cantidad de elementos en `carouselData`.
function renderDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = "";
  carouselData.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir al slide ${i + 1}`);
    dot.className =
      "w-2 h-2 rounded-full transition-opacity duration-200 " +
      (i === 0 ? "opacity-100 bg-white" : "opacity-50 bg-white");
    dot.addEventListener("click", () => {
      carouselIndex = i;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  });
}

// Función que actualiza el contenido y estilo de la "imagen" según el índice.
function updateCarousel() {
  if (carouselImage) {
    const current = carouselData[carouselIndex];
    // Si hay `imageSrc`, renderizamos una imagen en vez del bloque con gradiente
    if ((current as any).imageSrc) {
      const { imageSrc, alt } = current as any;
      const fit: string = (current as any).fit ?? "cover";
      const aspect: string | undefined = (current as any).aspect;

      // Mapear `fit` a clases de Tailwind para object-fit
      const fitClass =
        fit === "contain"
          ? "object-contain"
          : fit === "fill"
          ? "object-fill"
          : fit === "none"
          ? "object-none"
          : fit === "scale-down"
          ? "object-scale-down"
          : "object-cover"; // cover por defecto

      // Contenedor para imagen: si hay `aspect` no usamos altura fija
      const containerBase =
        "relative w-full overflow-hidden bg-gray-200 dark:bg-gray-700";
      carouselImage.className = aspect
        ? `${containerBase} ${aspect}`
        : `${containerBase} h-48`;

      // Pintamos la imagen con la estrategia de ajuste seleccionada
      carouselImage.innerHTML = `<img src="${imageSrc}" alt="${
        alt ?? ""
      }" class="w-full h-full ${fitClass} object-center" />`;
    } else {
      // Fallback con contenido de texto y gradiente
      carouselImage.textContent = current.content ?? "";
      carouselImage.className = `w-full h-48 flex items-center justify-center text-4xl font-bold bg-gradient-to-br ${
        current.gradient ?? "from-blue-400 to-purple-500"
      } text-white`;
    }

    // Actualizamos los indicadores dinámicos (puntos) para reflejar el activo.
    if (dotsContainer) {
      Array.from(dotsContainer.children).forEach((child, i) => {
        const el = child as HTMLElement;
        el.style.opacity = i === carouselIndex ? "1" : "0.5";
      });
    }
  }
}

if (prevBtn && nextBtn && carouselImage) {
  // Navegar hacia atrás: decrementa el índice de forma circular.
  prevBtn.onclick = () => {
    carouselIndex =
      (carouselIndex - 1 + carouselData.length) % carouselData.length;
    updateCarousel();
  };
  // Navegar hacia adelante: incrementa el índice de forma circular.
  nextBtn.onclick = () => {
    carouselIndex = (carouselIndex + 1) % carouselData.length;
    updateCarousel();
  };
  // Inicializamos los puntos y el carrusel para mostrar el primer elemento.
  renderDots();
  updateCarousel();
}

// 6. ICONOS LUCIDE
// Inicializa los web components de Lucide con los íconos que usaremos.
// Esto siempre debe ir al final, después de que el DOM está listo.
createIcons({
  icons: {
    ArrowLeft,
    Home,
    LayoutDashboard,
    Mail,
    ArrowRight,
    BarChart3,
    ShieldCheck,
    Zap,
    User,
    Send,
    ChevronUp,
    MoonStar,
  },
});
