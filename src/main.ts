import "./style.css";

console.log("App initialized");

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded - initializing smooth scroll and menu");

  // Enhanced mobile menu toggle with animation
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");

  if (menuBtn && navMenu) {
    console.log("Menu elements found");
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("hidden");

      // Add animation class for smooth transition
      if (!navMenu.classList.contains("hidden")) {
        navMenu.style.maxHeight = navMenu.scrollHeight + "px";
      } else {
        navMenu.style.maxHeight = "0px";
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !menuBtn.contains(e.target as Node) &&
        !navMenu.contains(e.target as Node)
      ) {
        navMenu.classList.add("hidden");
        navMenu.style.maxHeight = "0px";
      }
    });
  } else {
    console.log("Menu elements not found:", { menuBtn, navMenu });
  }

  // Enhanced smooth scrolling for internal links
  function smoothScrollTo(element: Element, offset: number = 80) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }

  // Find and attach smooth scroll to all internal links
  const internalLinks =
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
  console.log(`Found ${internalLinks.length} internal links`);

  internalLinks.forEach((anchor) => {
    console.log("Adding listener to:", anchor.getAttribute("href"));
    anchor.addEventListener("click", (e: Event) => {
      e.preventDefault();
      const targetId = anchor.getAttribute("href");
      console.log("Clicking link to:", targetId);

      if (targetId) {
        const target = document.querySelector(targetId);
        console.log("Target element found:", !!target);

        if (target) {
          // Use custom smooth scroll function with offset
          smoothScrollTo(target, 100);

          // Close mobile menu after clicking a link
          if (navMenu && !navMenu.classList.contains("hidden")) {
            navMenu.classList.add("hidden");
            navMenu.style.maxHeight = "0px";
          }
        }
      }
    });
  });
});
